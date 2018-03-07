import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import uuidv1 from 'uuid'
import { Link } from 'react-router-dom'

import { fetchPost, editPost, postVoteUpdate, deletePost, addComment } from '../../actions/'
import PostForm from '../PostForm/'
import CommentList from '../CommentList/'
import CommentCount from '../CommentCount/'
import NoMatch from '../NoMatch/'
import Nav from '../common/Nav'

class Post extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isEditing: false,
            commentsHasErrored: this.props.commentsHasErrored,
            commentsIsLoading: this.props.commentsIsLoading,
            comments: this.props.comments,
            post: this.props.post,
            post_id: this.props.post_id,
            postHasErrored: this.props.postHasErrored,
            postIsLoading: this.props.postIsLoading,
            comment: this.props.comment,
            category_name: this.props.category_name,
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
        this.props.fetchPost(this.props.post_id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post) {
            this.setState({post: nextProps.post})
            this.setState({ postHasErrored: nextProps.postHasErrored })
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
        const copyPost = this.state.post
        copyPost[field] = event.target.value
        this.setState({ post: copyPost})
    }

    handleSubmit(event) {
        event.preventDefault()
        const copyPost = this.state.post
        if (copyPost.author !== '' && copyPost.body !== '' &&
            copyPost.title !== '' && copyPost.category !== '') {
            this.props.editPost(copyPost)
            this.toggleEdit()
        }
    }

    handlePostEditCancel(event) {
        this.toggleEdit()
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
                        handleSubmit={this.handleSubmit}
                        handleCommentEditCancel={this.handleCommentEditCancel}/>
                </div>
            )
        }

        if (typeof this.state.post.error !== 'undefined' || this.state.postHasErrored) {
            return <NoMatch />
        }

        if (this.state.commentsHasErrored) {
            return <p>Sorry! There was an error loading the comments</p>
        }

        if (this.state.postIsLoading || this.state.commentsIsLoading) {
            return <p>Loading</p>
        }
        
        return (
            <div className="inline col-md-10 offset-md-1">
                <div>
                    <Link to='/'><strong>Home</strong></Link>&nbsp;>>&nbsp;
                    <Link to={`/${this.props.category_name}`}><strong>{this.props.category_name}</strong></Link>&nbsp;>>&nbsp;
                    <strong>{this.state.post.title}</strong>
                </div>
                <div className="inline col-md-10">
                    <Nav />
                    <div className="inline col-md-8">
                        <div>
                            <h3>{this.state.post.title}</h3>
                            <p>
                                Author: {this.state.post.author} <br />
                                Created: {moment(this.state.post.timestamp).format('YYYY-MM-DD')}
                            </p>
                            <p>{this.state.post.body}</p>
                            <CommentCount post_id={this.state.post_id} />
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
                                post_id={this.state.post_id} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const post_id = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.post_id : ownProps.post_id
    const category_name = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.category_name : ownProps.category_name
    let post = {id:"", title: "", author: "", category: "", timestamp: "", body: "", voteScore: ""}
    let comment = {id: "", author: "", body: "", parentId: "", timestamp: "", voteScore: ""}
    if(typeof state.post !== 'undefined') {
        post = state.post
    }
    return {
        post_id: post_id,
        category_name: category_name,
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
        fetchPost: (post_id) => dispatch(fetchPost(post_id)),
        editPost: (post) => dispatch(editPost(post)),
        postVoteUpdate: (post, str) => dispatch(postVoteUpdate(post, str)),
        deletePost: (post) => dispatch(deletePost(post)),
        addComment: (comment) => dispatch(addComment(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)