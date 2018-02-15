import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import uuidv1 from 'uuid'

import { fetchPost, editPost, postVoteUpdate, deletePost, addComment } from '../../actions/'
import PostForm from '../PostForm/'
import CommentList from '../CommentList/'

class Post extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isEditing: false,
            commentsHasErrored: this.props.commentsHasErrored,
            commentsIsLoading: this.props.commentsIsLoading,
            comments: this.props.comments,
            post: this.props.post,
            postId: this.props.postId,
            postHasErrored: this.props.postHasErrored,
            postIsLoading: this.props.postIsLoading,
            comment: this.props.comment,
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleVoteUp = this.handleVoteUp.bind(this)
        this.handleVoteDown = this.handleVoteDown.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddComment = this.handleAddComment.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }

    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }

    componentDidMount() {
        this.props.fetchPost(this.props.postId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post) {
            this.setState({post: nextProps.post})
        }
        this.setState({isEditing: false})
    }

    handleVoteUp(event) {
        const post = this.state.post
        this.props.postVoteUpdate(post, 'upVote')
    }
    
    handleVoteDown(event) {
        const post = this.state.post
        this.props.postVoteUpdate(post, 'downVote')
    }

    handleChange(event) {
        const field = event.target.id
        const post = this.state.post
        post[field] = event.target.value
        this.setState({post: post})
    }

    handleSubmit(event) {
        event.preventDefault()
        const post = this.state.post
        this.props.editPost(post)
    }

    handleDelete(event) {
        event.preventDefault()
        const post = this.state.post
        this.props.deletePost(post)
    }

    handleCommentChange(event) {
        const field = event.target.id
        const comment = this.state.comment
        comment[field] = event.target.value
        this.setState({comment: comment})
    }

    handleAddComment(event) {
        event.preventDefault()
        const comment = this.state.comment
        
        const parentId = this.state.post.id
        const id = uuidv1()
        const timestamp = moment().valueOf()
        const author = comment.author
        const body = comment.body
        this.props.addComment({ id, parentId, author, body, timestamp })
        comment.author = ""
        comment.body = ""
        this.setState({ comment: comment })
    }

    render() {

        if(this.state.isEditing) {
            return (
                <div className="inline col-md-6 offset-md-1">
                    <h3>Edit Post</h3>
                    <PostForm
                        post={this.state.post}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit} />
                </div>
            )
        }
        if (this.state.postHasErrored) {
            return <p>Sorry! There was an error loading the post</p>
        }

        if (this.state.commentsHasErrored) {
            return <p>Sorry! There was an error loading the comments</p>
        }

        if (this.state.postIsLoading || this.state.commentsIsLoading) {
            return <p>Loading</p>
        }
        
        return (
            <div className="inline col-md-6 offset-md-1">
                <div>
                    <h3>{this.state.post.title}</h3>
                    <p>
                        Author: {this.state.post.author} <br />
                        Created: {moment(this.state.post.timestamp).format('YYYY-MM-DD')}
                    </p>
                    <p>{this.state.post.body}</p>
                    <p>Vote Score:&nbsp;
                        <button className="btn btn-default btn-xs" onClick={this.handleVoteDown}>-</button>&nbsp;{this.state.post.voteScore}&nbsp;<button className="btn btn-default btn-xs" onClick={this.handleVoteUp}>+</button>
                    </p>
                    <button onClick={this.toggleEdit} className="btn btn-success btn-md">Edit</button>&nbsp;&nbsp;
                    <button onClick={this.handleDelete} className="btn btn-danger btn-md">Delete</button>
                </div>
                <hr />
                <div>
                    <h4>Comments</h4>
                    <strong>Add Comment</strong>
                    <form onSubmit={this.handleAddComment}>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                value={this.state.comment.author}
                                onChange={this.handleCommentChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Comment</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="body"
                                value={this.state.comment.body}
                                onChange={this.handleCommentChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-md">
                            Save Comment
                        </button>
                    </form>
                    <hr />
                    <CommentList 
                        postId={this.state.postId} 
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const postId = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.postId : ownProps.postId
    let post = {id:"", title: "", author: "", category: "", timestamp: "", body: "", voteScore: ""}
    let comment = {id: "", author: "", body: "", parentId: "", timestamp: "", voteScore: ""}
    if(typeof state.post !== 'undefined') {
        post = state.post
    }
    return {
        postId: postId,
        post: post,
        postHasErrored: state.postHasErrored,
        postIsLoading: state.postIsLoading,
        comments: typeof state.comments !== 'undefined' ? state.comments : [],
        commentsHasErrored: state.commentsHasErrored,
        commentsIsLoading: state.commentsIsLoading,
        comment: comment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(fetchPost(postId)),
        editPost: (post) => dispatch(editPost(post)),
        postVoteUpdate: (post, str) => dispatch(postVoteUpdate(post, str)),
        deletePost: (post) => dispatch(deletePost(post)),
        addComment: (comment) => dispatch(addComment(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)