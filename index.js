const express = require("express");
const app = express();
const compression = require("compression");
const ca = require("chalk-animation");
const bcrypt = require("bcryptjs");
const db = require("./sql/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const s3 = require("./s3");
const s3multiple = require("./s3multiple");
var moment = require("moment");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 192.168.50.*:*"
});
const cookieSessionMiddleware = cookieSession({
    secret: "its gonna be ok",
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(express.static("./static"));

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(compression());

//-------------------FormData API----------------------

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//--------------------BUNDLE.JS-------------------------

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//---------------BCRYPT functions-----------------
function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}

// ------------------REGISTERING NEW USERS-------------------

app.post("/register", function(req, res) {
    const { username, first, last, email, pass, confpass } = req.body;
    if (pass === confpass) {
        hashPassword(pass)
            .then(hash => {
                return db.addUser(username, first, last, email, hash);
            })
            .then(data => {
                req.session.userId = data.rows[0].id;
                console.log(data.rows[0].id);
                res.json({ success: true });
            })
            .catch(err => {
                console.log("register post err", err);
                res.json({ success: false });
            });
    } else {
        res.json({ passconf: false });
    }
});

//-------------------USER LOGIN-----------------------------
app.post("/login", function(req, res) {
    db.getUserByEmail(req.body.email)
        .then(info => {
            if (info.rows.length > 0) {
                checkPassword(req.body.pass, info.rows[0].password_digest).then(
                    boolean => {
                        if (!boolean) {
                            res.json({ passfalse: true });
                        } else {
                            req.session.userId = info.rows[0].id;
                            res.json({ success: true });
                        }
                    }
                );
            } else {
                res.json({ usernoexist: true });
            }
        })
        .catch(err => {
            console.log("login post err", err);
            res.json({ success: false });
        });
});

// -------------------LOGOUT------------------------------

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#");
    console.log("confirming logout");
});

//---------------------RENDERING APP------------

app.get("/user", async (req, res) => {
    let user = await db.getUserById(req.session.userId);
    user = user.rows[0];
    if (!user.picture) {
        user.picture = "/default.png";
    }
    res.json(user);
});

//------------------Upload newpic modal---------------------
app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    const url = config.s3Url + req.file.filename;
    db.updateImg(url, req.session.userId)
        .then(() => {
            res.json({ url });
        })
        .catch(err => {
            console.log("err in adding to db", err);
        });

    //end of req.file if else
}); //end of app.post

// --------------------------ADD/EDIT podcast episodes--

var cpUpload = uploader.fields([
    { name: "audio", maxCount: 1 },
    { name: "picture", maxCount: 1 }
]);
app.post("/addEpisode.json", cpUpload, s3multiple.upload, async function(
    req,
    res
) {
    const audioUrl = config.s3Url + req.files.audio[0].filename;
    const pictureUrl = config.s3Url + req.files.picture[0].filename;
    const tags = req.body.tags.split(",");
    try {
        let addEpisodeInfo = await db.addEpisode(
            req.body.title,
            req.body.summary,
            req.body.description,
            req.body.duration,
            audioUrl,
            pictureUrl
        );
        tags.forEach(i => {
            (async () => {
                let addTags = await db.addTags(addEpisodeInfo.rows[0].id, i);
                console.log("testing addTags", addTags);
            })();
        });
    } catch (err) {
        console.log("err in add episode", err);
    }
});

app.post("/editEpisode.json", cpUpload, s3multiple.upload, async function(
    req,
    res
) {
    const audioUrl = config.s3Url + req.files.audio[0].filename;
    const pictureUrl = config.s3Url + req.files.picture[0].filename;
    try {
        let editEpisodeInfo = await db.editEpisode(
            req.body.title,
            req.body.summary,
            req.body.description,
            req.body.duration,
            audioUrl,
            pictureUrl
            // PUT THE EPISODE ID HERE
        );
        console.log("testing add episode", editEpisodeInfo);
    } catch (err) {
        console.log("err in add episode", err);
    }
});

//--------------Add/Edit bio-------------------------------------------
app.post("/bio", async (req, res) => {
    try {
        let storebio = await db.updateBio(req.body.bio, req.session.userId);
        res.json({ success: true });
    } catch (err) {
        console.log("err in post bio", err);
    }
});

//----------------------Edit profile---------------------------------
app.post("/editprofile", async function(req, res) {
    console.log("testing edit profile body", req.body);
    const { first, last, displayname, pass, confpass } = req.body;
    try {
        let previousInfo = await db.getUserById(req.session.userId);
        console.log("testing previous info", previousInfo);
        console.log("testing pass", pass);
        let hash;
        if (pass && pass === confpass) {
            hash = await hashPassword(pass);
            console.log("PASS MATCH");
        } else if (pass && pass !== confpass) {
            console.log("pass no match");
            res.json({ passconf: false });
            hash = previousInfo.rows[0].password_digest;
        } else if (!pass) {
            hash = previousInfo.rows[0].password_digest;
            console.log("no pass change");
        }
        await db.updateProfile(
            first,
            last,
            displayname,
            hash,
            req.session.userId
        );
        res.json({ success: true });
    } catch (err) {
        console.log("edit profile post err", err);
        res.json({ success: false });
    }
});

//---------------------RENDERING each episode--------------------

app.get("/episode/:id.json", async (req, res) => {
    try {
        let data = await db.getEpisodeById(req.params.id);
        req.session.episodeId = data.rows[0].id;
        res.json(data.rows[0]);
    } catch (err) {
        console.log("err in get single episode", err);
    }
});

//----------------------FIND episodes--------------------------------

app.get("/episodes.json", async function(req, res) {
    try {
        const episodeList = await db.getLastEpisodesList();
        episodeList.rows.forEach(i => {
            i.created_at = moment(i.created_at, moment.ISO_8601).fromNow();
        });

        res.json(episodeList.rows);
    } catch (err) {
        console.log("err in get render find episode", err);
    }
});

app.get("/episodes/2/:val.json", async function(req, res) {
    try {
        const searchEpisode = await db.getEpisodesInSearch(req.params.val);
        searchEpisode.rows.forEach(i => {
            i.created_at = moment(i.created_at, moment.ISO_8601).fromNow();
        });
        console.log("testing search episodes", searchEpisode);
        res.json(searchEpisode.rows);
    } catch (err) {
        console.log("err in get query find episode by name", err);
    }
});

app.get("/episodes/3/:val.json", async function(req, res) {
    try {
        const findByTag = await db.getEpisodesByTag(req.params.val);
        findByTag.rows.forEach(i => {
            i.created_at = moment(i.created_at, moment.ISO_8601).fromNow();
        });
        res.json(findByTag.rows);
    } catch (err) {
        console.log("err in get query find episode by tag", err);
    }
});

//-------------------------FRIENDSHIP BUTTON------------------------------------

app.get("/getbutton/:epId", async function(req, res) {
    try {
        const getButton = await db.getFavoritesStatus(
            req.session.userId,
            req.params.epId
        );
        res.json(getButton.rows);
    } catch (err) {
        console.log("err in get getbutton", err);
    }
});

app.post("/getbutton/add/:epId", async function(req, res) {
    try {
        console.log("testing params in add", req.params.epId);
        const addFav = await db.addFavorite(
            req.session.userId,
            req.params.epId
        );
        res.json(addFav.rows);
    } catch (err) {
        console.log("err in post add getbutton", err);
    }
});

app.post("/getbutton/delete/:epId", async function(req, res) {
    try {
        const removeFav = await db.removeFavorite(
            req.params.epId,
            req.session.userId
        );
        console.log("delete worked");
        res.json({ success: true });
    } catch (err) {
        console.log("err in post delete getbutton", err);
    }
});

app.post("/getbutton/accept/:broId", async function(req, res) {
    try {
        const accept = await db.acceptFriendship(
            req.params.broId,
            req.session.userId
        );
        res.json({ success: true });
    } catch (err) {
        console.log("err in post accept getbutton", err);
    }
});

//-----------------------FAVORITES PAGE----------------
app.get("/favorites.json", function(req, res) {
    try {
        db.getListOfFavorites(req.session.userId).then(list => {
            res.json(list);
        });
    } catch (err) {
        console.log("err in get favorites", err);
    }
});
// -----------------------RENDERING WELCOME (KEEP IT IN THE END)-----------------

app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else if (req.session.userId && req.url == "/welcome") {
        res.redirect("/app");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// ------------------STARTING OUR SERVER ---------------------

server.listen(process.env.PORT || 8080, function() {
    ca.neon("Cast and I'll React sweetie!");
});

//-------------------SOCKET.IO--------------------------------
io.on("connection", socket => {
    console.log(`socket with id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    // CHAT - getting the last 10 chatMessages
    socket.on("getComments", async episodeId => {
        try {
            let comments = await db.getComments(episodeId);
            comments.rows.forEach(i => {
                i.created_at = moment(i.created_at, moment.ISO_8601).fromNow();
            });

            io.emit("getComments", comments.rows);
        } catch (err) {
            console.log("err in get last comments", err);
        }
    });

    socket.on("newComment", async comment => {
        try {
            console.log("comments in episode id", comment);
            let commentInfo = await db.addComment(
                userId,
                comment.episodeId,
                comment.comment
            );
            let userInfo = await db.getUserById(userId);
            let timetag = moment(
                commentInfo.rows[0].created_at,
                moment.ISO_8601
            ).fromNow();
            commentInfo.rows[0] = {
                ...commentInfo.rows[0],
                created_at: timetag
            };
            const fullInfo = { ...commentInfo.rows[0], ...userInfo.rows[0] };
            io.emit("newComment", fullInfo);
        } catch (err) {
            console.log("err in add comment", err);
        }
    });
});
