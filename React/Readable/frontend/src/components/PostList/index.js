import React, { Component } from 'react'
import { Link, withRouter} from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { postVoteUpdate, deletePost, editPost } from '../../actions/'
import PostForm from '../PostForm/'
import CommentCount from '../CommentCount/'

class PostList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            category_name: this.props.category_name,
            posts: this.props.posts,
            myData: this.props.posts,
            isEditingPost: false,
            post: null,
        }
        this.trim = this.trim.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.handleVoteUp = this.handleVoteUp.bind(this)
        this.handleVoteDown = this.handleVoteDown.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.openPostEditModal = this.openPostEditModal.bind(this)
        this.closePostEditModal = this.closePostEditModal.bind(this)
        this.handlePostEditChange = this.handlePostEditChange.bind(this)
        this.handlePostEditSubmit = this.handlePostEditSubmit.bind(this)
        this.handlePostEditCancel = this.handlePostEditCancel.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.posts !== nextProps.posts) {
            this.setState({posts: nextProps.posts})
            this.setState({myData: nextProps.posts})
        }
    }

    trim(str) {
        if(typeof str !== 'undefined') {
        return str.length > 125
            ? str.slice(0, 125) + '...'
            : str
        }
        return str
    }

    handleVoteUp(event) {
        event.preventDefault()
        let el = event.target.parentNode
        let pid = el.getAttribute('data-id')
        const votePost = this.state.posts.find(post => post.id === pid)
        this.props.postVoteUpdate(votePost, 'upVote')
    }

    handleVoteDown(event) {
        event.preventDefault()
        let el = event.target.parentNode
        let pid = el.getAttribute('data-id')
        const votePost = this.state.posts.find(post => post.id === pid)
        this.props.postVoteUpdate(votePost, 'downVote')
    }

    handleDelete(event) {
        event.preventDefault()
        let el = event.target.parentNode
        let pid = el.getAttribute('data-id')
        const delPost = this.state.posts.find(post => post.id === pid)
        this.props.deletePost(delPost)
    }

    openPostEditModal(event) {
        let el = event.target.parentNode
        let pid = el.getAttribute('data-id')
        this.setState({ isEditingPost: true })
        this.setState({
            post: this.state.posts.find(post => post.id === pid)
        })
    }

    closePostEditModal() {
        this.setState({
            isEditingPost: false,
            post: null
        })
    }

    handlePostEditChange(event) {
        const field = event.target.id
        const copyPost = this.state.post
        copyPost[field] = event.target.value
        this.setState({ post: copyPost })
    }

    handlePostEditSubmit(event) {
        event.preventDefault()
        const post = this.state.post
        this.props.editPost(post)
        this.closePostEditModal()
    }

    handlePostEditCancel(event) {
        event.preventDefault()
        this.closePostEditModal()
    }

    sortBy(event) {
        const list = event.target
        const sortBy = list.options[list.selectedIndex].value
        let myData
        switch(sortBy) {
            case 'byDateASC':
                 myData = [].concat(this.state.posts)
                    .sort((a, b) => a.timestamp > b.timestamp)
                break
            case 'byDateDESC':
                 myData = [].concat(this.state.posts)
                    .sort((a, b) => a.timestamp < b.timestamp)
                break
            case 'byVoteScoreASC':
                    myData = [].concat(this.state.posts)
                    .sort((a, b) => a.voteScore > b.voteScore)
                break
            case 'byVoteScoreDESC':
                    myData = [].concat(this.state.posts)
                    .sort((a, b) => a.voteScore < b.voteScore)
                break
            default:
                myData = this.state.posts
                break
        }
        this.setState({ myData: myData})
    }

    render() {
        const { myData, category_name, isEditingPost } = this.state

        if (myData && myData.length > 0) {
            return (
                <div className="col-md-12">
                    <div className="inline col-md-8 offset-md-1">
                        <ul className='list-group list-group-flush'>
                            {myData.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <Link to={`/${category_name}/${item.id}`}><h3>{item.title}</h3></Link>
                                    <p>
                                        Author: {item.author} <br />
                                        Created: {moment(item.timestamp).format('YYYY-MM-DD')}
                                    </p>
                                    <p>{this.trim(item.body)}</p>
                                    <CommentCount post_id={item.id} />
                                    <p data-id={item.id}>
                                        Vote Score:&nbsp;
                                        <button className="btn btn-default btn-xs" onClick={this.handleVoteDown}>-</button>&nbsp;{item.voteScore}&nbsp;<button className="btn btn-default btn-xs" onClick={this.handleVoteUp}>+</button>
                                        <br />
                                        <br />
                                        <button onClick={this.openPostEditModal} className="btn btn-success btn-md">Edit</button>&nbsp;&nbsp;
                                        <button onClick={this.handleDelete} className="btn btn-danger btn-md">Delete</button>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="inline col-md-2">
                        <select onChange={this.sortBy} id={`${category_name}-sort`}>
                            <option value="byDateASC">By Date Ascending</option>
                            <option value="byDateDESC">By Date Descending</option>
                            <option value="byVoteScoreASC">By Vote Score Ascending</option>
                            <option value="byVoteScoreDESC">By Vote Score Descending</option>
                        </select>
                    </div>
                    <Modal
                        className='comment-modal'
                        overlayClassName='comment-overlay'
                        isOpen={isEditingPost}
                        onRequestClose={this.closePostEditModal}
                        contentLabel='Modal'
                    >
                        <div className="comment-edit">
                            <PostForm
                                post={this.state.post}
                                handleChange={this.handlePostEditChange}
                                handleSubmit={this.handlePostEditSubmit}
                                handlePostEditCancel={this.handlePostEditCancel} />
                        </div>
                    </Modal>
                </div>
            )
        }
        return null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postVoteUpdate: (post, str) => dispatch(postVoteUpdate(post, str, true)),
        deletePost: (post) => dispatch(deletePost(post)),
        editPost: (post) => dispatch(editPost(post)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostList))