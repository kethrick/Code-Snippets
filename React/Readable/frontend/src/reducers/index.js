import initialState from '../store/initialState'
import {
    CATEGORY_HAS_ERRORED,
    CATEGORY_IS_LOADING,
    CATEGORY_FETCH_SUCCESS,
    POST_HAS_ERRORED,
    POST_IS_LOADING,
    POSTS_FETCH_SUCCESS,
    POST_FETCH_SUCCESS,
    ADD_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    COMMENT_HAS_ERRORED,
    COMMENT_IS_LOADING,
    COMMENTS_FETCH_SUCCESS,
    POST_VOTE_UPDATE_SUCCESS,
    DELETE_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    COMMENT_VOTE_UPDATE_SUCCESS,
    EDIT_COMMENT_SUCCESS
} from '../constants/action-types'

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_HAS_ERRORED:
            return action.categoryHasErrored
        case CATEGORY_IS_LOADING:
            return action.categoryIsLoading
        case CATEGORY_FETCH_SUCCESS:
            return {
                ...state, categories: action.categories
            }
        case POST_HAS_ERRORED:
            return action.postHasErrored
        case POST_IS_LOADING:
            return action.postIsLoading
        case POSTS_FETCH_SUCCESS:
            return {
                ...state, posts: action.posts
            }
        case POST_FETCH_SUCCESS:
            return {
                ...state, post: action.post
            }
        case ADD_POST_SUCCESS:
            return {
                ...state, posts: [...state.posts, action.payload]
            }
        case EDIT_POST_SUCCESS:
            return {
                ...state, post: action.payload
            }
        case POST_VOTE_UPDATE_SUCCESS:
            return {
                ...state, post: action.payload
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state, posts: [ ...state.posts.filter(post => post.id !== action.payload.id)]
            }
        case COMMENT_HAS_ERRORED:
            return action.commentHasErrored
        case COMMENT_IS_LOADING:
            return action.commentIsLoading
        case COMMENTS_FETCH_SUCCESS:
            return {
                ...state, comments: action.comments
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state, comments: [...state.comments, action.payload]
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state, comments: [ ...state.comments.filter(comment => comment.id !== action.payload.id)]
            }
        case COMMENT_VOTE_UPDATE_SUCCESS:
            return {
                ...state, comments: state.comments.map(
                    comment => comment.id === action.payload.id ? { ...comment, voteScore: action.payload.voteScore }
                        : comment
                )
            }
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state, comments: state.comments.map(
                    comment => comment.id === action.payload.id ? action.payload : comment
                )
            }
        default:
            return state
    }
}

export default rootReducer