const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = (req, res, next) => {
    const { file } = req;
    if (!file) {
        console.log("multer failed =(");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    s3.putObject({
        Bucket: "myimgboard",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        // this creates a pipeline
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(data => {
            console.log("data from s3.putobject", data);
            next();
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
        .then(() => {
            fs.promises.unlink(path);
            // this deletes our files from the uploads files
        });
};
