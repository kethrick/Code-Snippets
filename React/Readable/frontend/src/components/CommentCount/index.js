import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostCommentCount } from '../../actions/'

class CommentCount extends Component {
    state = {
        commntCount: 0
    }

    componentDidMount() {
        this.props.fetchPostCommentCount(this.props.post_id).then((data) => {
            this.setState({ commentCount: data })
        })
    }

    render() {
        return (
            <p>Number of comments: {this.state.commentCount }</p>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const post_id = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.post_id : ownProps.post_id
    return {
        post_id: post_id,
        commentCount: 0,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostCommentCount: (post_id) => dispatch(fetchPostCommentCount(post_id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentCount)