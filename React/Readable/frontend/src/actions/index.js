import api from '../utils/api'
import {
    CATEGORY_HAS_ERRORED,
    CATEGORY_IS_LOADING,
    CATEGORY_FETCH_SUCCESS,
    POST_HAS_ERRORED, 
    POST_IS_LOADING,
    POSTS_FETCH_SUCCESS,
    ADD_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    POST_FETCH_SUCCESS,
    COMMENT_HAS_ERRORED,
    COMMENT_IS_LOADING,
    COMMENTS_FETCH_SUCCESS,
    POST_VOTE_UPDATE_SUCCESS,
    DELETE_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    COMMENT_VOTE_UPDATE_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    CATEGORY_POST_VOTE_UPDATE_SUCCESS,
    COMMENT_COUNT_FETCH_SUCCESS
} from '../constants/action-types'

export function categoryHasErrored(bool) {
    return {
        type: CATEGORY_HAS_ERRORED,
        categoryHasErrored: bool
    }
}

export function categoryIsLoading(bool) {
    return {
        type: CATEGORY_IS_LOADING,
        categoryIsLoading: bool
    }
}

export function categoryFetchSuccess(categories) {
    return {
        type: CATEGORY_FETCH_SUCCESS,
        categories
    }
}

export function fetchCategories() {
    return (dispatch) => {
        dispatch(categoryIsLoading(true))
        return api.fetchCategories()
            .then(categoryIsLoading(false))
            .then(categories => {
                dispatch(categoryFetchSuccess(categories.categories))
            })
            .catch(error => {
                dispatch(categoryHasErrored(true))
            })
    }
}

export function postHasErrored(bool) {
    return {
        type: POST_HAS_ERRORED,
        postHasErrored: bool
    }
}

export function postIsLoading(bool) {
    return {
        type: POST_IS_LOADING,
        postIsLoading: bool
    }
}

export function postsFetchSuccess(posts) {
    return {
        type: POSTS_FETCH_SUCCESS,
        posts
    }
}

export function fetchPosts() {
    return (dispatch) => {
        dispatch(postIsLoading(true))
        return api.fetchPosts()
            .then(postIsLoading(false))
            .then(posts => {
                dispatch(postsFetchSuccess(posts))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function categoryPostsFetchSuccess(posts) {
    return {
        type: POSTS_FETCH_SUCCESS,
        posts
    }
}

export function fetchCategoryPosts(categoryName) {
    return (dispatch) => {
        dispatch(postIsLoading(true))
        return api.fetchCatPosts(categoryName)
            .then(postIsLoading(false))
            .then(posts => {
                dispatch(categoryPostsFetchSuccess(posts))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function addPost(post) {
    return (dispatch) => {
        return api.addPost(post)
            .then(post => {
                dispatch(addPostSuccess(post))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function addPostSuccess(post) {
    return {
        type: ADD_POST_SUCCESS,
        payload: post
    }
}

export function editPost(post) {
    return (dispatch) => {
        return api.editPost(post)
            .then(post => {
                dispatch(editPostSuccess(post))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function editPostSuccess(post) {
    return {
        type: EDIT_POST_SUCCESS,
        payload: post
    }
}

export function postFetchSuccess(post) {
    return {
        type: POST_FETCH_SUCCESS,
        post
    }
}

export function fetchPost(id) {
    return (dispatch) => {
        dispatch(postIsLoading(true))
        return api.fetchPost(id)
            .then(postIsLoading(false))
            .then(post => {
                if (typeof post.id === 'undefined') {
                    dispatch(postHasErrored(true))
                } else {
                    dispatch(postHasErrored(false))
                    dispatch(postFetchSuccess(post))
                }
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function postVoteUpdate(data, str, category=false) {
    return (dispatch) => {
        return api.upVote(data, str)
            .then(post => {
                if (category === true) {
                    dispatch(categoryPostVoteUpdateSuccess(post))
                } else {
                    dispatch(postVoteUpdateSuccess(post))
                }
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function categoryPostVoteUpdateSuccess(post) {
    return {
        type: CATEGORY_POST_VOTE_UPDATE_SUCCESS,
        payload: post
    }
}

export function postVoteUpdateSuccess(post) {
    return {
        type: POST_VOTE_UPDATE_SUCCESS,
        payload: post
    }
}

export function deletePost(data) {
    return (dispatch) => {
        return api.deletePost(data)
            .then(post => {
                dispatch(deletePostSuccess(post))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function deletePostSuccess(post) {
    return {
        type: DELETE_POST_SUCCESS,
        payload: post
    }
}

export function commentHasErrored(bool) {
    return {
        type: COMMENT_HAS_ERRORED,
        commentHasErrored: bool
    }
}

export function commentIsLoading(bool) {
    return {
        type: COMMENT_IS_LOADING,
        commentIsLoading: bool
    }
}

export function commentsFetchSuccess(comments) {
    return {
        type: COMMENTS_FETCH_SUCCESS,
        comments
    }
}

export function fetchPostComments(id) {
    return (dispatch) => {
        dispatch(commentIsLoading(true))
        return api.fetchPostComments(id)
            .then(commentIsLoading(false))
            .then(comments => {
                dispatch(commentsFetchSuccess(comments))
            })
            .catch(error => {
                dispatch(commentHasErrored(true))
            })
    }
}

export function fetchPostCommentCount(id) {
    return (dispatch) => {
        return api.fetchPostComments(id)
            .then(comments => {
                return comments.length
            })
            .catch(error => {
                dispatch(commentHasErrored(true))
            })
    }
}

export function commentCountFetchSuccess(comments) {
    return {
        type: COMMENT_COUNT_FETCH_SUCCESS,
        comments
    }
}

export function addComment(comment) {
    return (dispatch) => {
        return api.addComment(comment)
            .then(comment => {
                dispatch(addCommentSuccess(comment))
            })
            .catch(error => {
                dispatch(commentHasErrored(true))
            })
    }
}

export function addCommentSuccess(comment) {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: comment
    }
}

export function deleteComment(data) {
    return (dispatch) => {
        return api.deleteComment(data)
            .then(comment => {
                dispatch(deleteCommentSuccess(comment))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function deleteCommentSuccess(comment) {
    return {
        type: DELETE_COMMENT_SUCCESS,
        payload: comment
    }
}

export function postCommentVoteUpdate(data, str) {
    return (dispatch) => {
        return api.upCommentVote(data, str)
            .then(comment => {
                dispatch(postCommentVoteUpdateSuccess(comment))
            })
            .catch(error => {
                dispatch(postHasErrored(true))
            })
    }
}

export function postCommentVoteUpdateSuccess(comment) {
    return {
        type: COMMENT_VOTE_UPDATE_SUCCESS,
        payload: comment
    }
}

export function editComment(comment) {
    return (dispatch) => {
        return api.editComment(comment)
            .then(comment => {
                dispatch(editCommentSuccess(comment))
            })
            .catch(error => {
                dispatch(commentHasErrored(true))
            })
    }
}

export function editCommentSuccess(comment) {
    return {
        type: EDIT_COMMENT_SUCCESS,
        payload: comment
    }
}