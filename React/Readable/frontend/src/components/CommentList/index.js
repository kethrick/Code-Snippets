import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from 'react-modal'

import { fetchPostComments, editComment, deleteComment, postCommentVoteUpdate } from '../../actions/'

class CommentList extends Component{
    
    constructor(props, context) {
        super(props, context)
        this.state = {
            post_id: this.props.post_id,
            comments: this.props.comments,
            isEditingComment: false,
            comment: null,
        }
        this.handleCommentDelete = this.handleCommentDelete.bind(this)
        this.handleCommentVoteUp = this.handleCommentVoteUp.bind(this)
        this.handleCommentVoteDown = this.handleCommentVoteDown.bind(this)
        this.openCommentEditModal = this.openCommentEditModal.bind(this)
        this.closeCommentEditModal = this.closeCommentEditModal.bind(this)
        this.handleCommentEditChange = this.handleCommentEditChange.bind(this)
        this.handleCommentEditSubmit = this.handleCommentEditSubmit.bind(this)
        this.handleCommentEditCancel = this.handleCommentEditCancel.bind(this)
    }

    componentWillMount() {
        Modal.setAppElement('div')
    }

    componentDidMount() {
        this.props.fetchPostComments(this.props.post_id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.comments !== nextProps.comments) {
            this.setState({comments: nextProps.comments})
        }
    }

    openCommentEditModal(event) {
        const index = event.target.parentNode.id
        this.setState({ isEditingComment: true })
        this.setState({
            comment: this.state.comments.find(comment => comment.id === index)
        })
    }

    closeCommentEditModal() {
        this.setState({
            isEditingComment: false,
            comment: null
        })
    }

    handleCommentEditChange(event) {
        const field = event.target.id
        const comment = this.state.comment
        comment[field] = event.target.value
        this.setState({ comment: comment })
    }

    handleCommentEditSubmit(event) {
        event.preventDefault()
        const comment = this.state.comment
        this.props.editComment(comment)
        this.closeCommentEditModal()
    }

    handleCommentEditCancel(event) {
        event.preventDefault()
        this.closeCommentEditModal()
    }

    handleCommentDelete(event) {
        event.preventDefault()
        const commentId = event.target.parentNode.id
        let comment = this.state.comments.find(comment => comment.id === commentId)
        this.props.deleteComment(comment)
    }

    handleCommentVoteUp(event) {
        const commentId = event.target.parentNode.id
        let comment = this.state.comments.find(comment => comment.id === commentId)
        this.props.postCommentVoteUpdate(comment, 'upVote')
    }
    
    handleCommentVoteDown(event) {
        const commentId = event.target.parentNode.id
        let comment = this.state.comments.find(comment => comment.id === commentId)
        this.props.postCommentVoteUpdate(comment, 'downVote')
    }
    
    render() {
        const { comments, comment, isEditingComment } = this.state

        return (
            <div>
                <ul className='list-group list-group-flush'>
                    {comments && comments.map(item => (
                        <li className='list-group-item' id={item.id} key={item.id}>
                            <p>
                                Author: {item.author} <br />
                                Created: {moment(item.timestamp).format('YYYY-MM-DD')}
                            </p>
                            <p>{item.body}</p>
                            <label>Vote Score:</label>&nbsp;
                            <button className="btn btn-default btn-xs" onClick={this.handleCommentVoteDown}>-</button>&nbsp;{item.voteScore}&nbsp;<button className="btn btn-default btn-xs" onClick={this.handleCommentVoteUp}>+</button>    
                            <br />
                            <button onClick={this.openCommentEditModal} className="btn btn-success btn-md">Edit</button>&nbsp;&nbsp;
                            <button onClick={this.handleCommentDelete} className="btn btn-danger btn-md">Delete</button>
                        </li>
                    ))}
                </ul>
                <Modal
                    className='comment-modal'
                    overlayClassName='comment-overlay'
                    isOpen={isEditingComment}
                    onRequestClose={this.closeCommentEditModal}
                    contentLabel='Modal'
                >
                    <div className="comment-edit">
                        <form onSubmit={this.handleCommentEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    value={comment && comment.author}
                                    onChange={this.handleCommentEditChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Comment</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="body"
                                    value={comment && comment.body}
                                    onChange={this.handleCommentEditChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-md">
                                Save Comment
                            </button>&nbsp;&nbsp;
                            <button onClick={this.handleCommentEditCancel} className="btn btn-default btn-md">Cancel</button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const post_id = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.post_id : ownProps.post_id
    return {
        post_id: post_id,
        comments: typeof state.comments !== 'undefined' ? state.comments : [],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostComments: (post_id) => dispatch(fetchPostComments(post_id)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        postCommentVoteUpdate: (comment, str) => dispatch(postCommentVoteUpdate(comment, str)),
        editComment: (comment) => dispatch(editComment(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CommentList)