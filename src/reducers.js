export default function(state = {}, action) {
    if (action.type == "RECEIVE_FAVORITES") {
        state = {
            ...state,
            favorites: action.favorites
        };
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    accepted: true
                };
            })
        };
    }
    if (action.type == "REMOVE_FAVORITE") {
        state = {
            ...state,
            favorites: state.favorites.filter(favorite => {
                if (favorite.id != action.id) {
                    return favorite;
                }
            })
        };
    }

    if (action.type == "GET_CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs.reverse()
        };
    }

    if (action.type == "POST_NEW_CHAT_MESSAGE") {
        console.log("inside action");
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg]
        };
    }

    if (action.type == "GET_COMMENTS") {
        state = {
            ...state,
            comments: action.comments
        };
    }

    if (action.type == "POST_NEW_COMMENT") {
        state = {
            ...state,
            comments: [...state.comments, action.comment]
        };
    }

    if (action.type == "GET_GROUP_MESSAGES") {
        console.log("inside action get group messages");
        state = {
            ...state,
            groupMessages: action.groupmsgs
        };
    }

    if (action.type == "POST_NEW_GROUP_MESSAGE") {
        console.log("inside action group message");
        state = {
            ...state,
            groupMessages: [...state.groupMessages, action.msg]
        };
    }

    return state;
}
