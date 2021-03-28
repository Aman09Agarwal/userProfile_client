const initialState = {
    fetching: false,
    fetched: false,
    sfetching: false,
    sfetched: false,
    posting: false,
    posted: false,
    updating: false,
    updated: false,
    deleted: false,
    deleting: false,
    users: [],
    user: {},
    search: "",
    error: false
}

function userReducer(state=initialState, action) {
    switch (action.type) {
        case "FETCH_USERS_PENDING": {
            return {
                ...state,
                fetching: true
            }
        }
        case "FETCH_USERS_FULFILLED": {
            if (action.payload.status === 200) {
                if (action.payload.data.success) {
                    action.payload = action.payload.data
                }
            }
            return {
                ...state,
                fetched: true,
                fetching: false,
                error: false,
                users: action.payload
            }
        }
        case "FETCH_USERS_REJECTED": {
            return {
                ...state,
                fetched: false,
                fetching: false,
                error: action.payload,
                users: []
            }
        }


        case "FETCH_USER_PENDING": {
            return {
                ...state,
                sfetching: true
            }
        }
        case "FETCH_USER_FULFILLED": {
            if (action.payload.status === 200) {
                if (action.payload.data.success) {
                    action.payload = action.payload.data
                }
            }
            return {
                ...state,
                sfetched: true,
                sfetching: false,
                error: false,
                user: action.payload
            }
        }
        case "FETCH_USER_REJECTED": {
            return {
                ...state,
                sfetched: false,
                sfetching: false,
                error: action.payload,
                user: {}
            }
        }


        case "POST_USER_PENDING": {
            return {
                ...state,
                posting: true
            }
        }
        case "POST_USER_FULFILLED": {
            if (action.payload.status === 200) {
                if (!action.payload.data.success) {
                    return {
                        ...state,
                        posted: true,
                        posting: false,
                        error: action.payload.data.message
                    }
                }
            }
            return {
                ...state,
                posted: true,
                posting: false,
                error: false
            }
        }
        case "POST_USER_REJECTED": {
            return {
                ...state,
                posted: false,
                posting: false,
                error: action.payload.response.data
            }
        }


        case "UPDATE_USER_PENDING": {
            return {
                ...state,
                updating: true
            }
        }
        case "UPDATE_USER_FULFILLED": {
            if (action.payload.status === 200) {
                if (!action.payload.data.success) {
                    return {
                        ...state,
                        updated: true,
                        updating: false,
                        error: action.payload.data.message
                    }
                }
            }
            return {
                ...state,
                updated: true,
                updating: false,
                error: false
            }
        }
        case "UPDATE_USER_REJECTED": {
            return {
                ...state,
                updated: false,
                updating: false,
                error: action.payload.response.data
            }
        }


        case "DELETE_USER_PENDING": {
            return {
                ...state,
                deleting: true
            }
        }
        case "DELETE_USER_FULFILLED": {
            if (action.payload.status === 200) {
                if (!action.payload.data.success) {
                    return {
                        ...state,
                        deleted: true,
                        deleting: false,
                        error: action.payload.data.message
                    }
                }
            }
            return {
                ...state,
                deleted: true,
                deleting: false,
                error: false
            }
        }
        case "DELETE_USER_REJECTED": {
            return {
                ...state,
                deleted: false,
                deleting: false,
                error: action.payload.response.data
            }
        }


        case "SEARCH_USER": {
            return {
                ...state,
                search: action.payload
            }
        }


        default: {
            return state
        }
    }
}

export default userReducer;