import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostList from '../PostList/'
import { fetchCategoryPosts } from '../../actions/';

class Category extends Component {
    componentDidMount() {
        this.props.fetchCategoryPosts(this.props.categoryName)
    }

    render() {
        const {
            categoryName,
            posts,
        } = this.props

        return (
            <div>
                <div className="inline col-md-6 offset-md-1">
                    <h2>{categoryName}</h2>
                    <div className="App-intro">
                        <PostList categoryName={categoryName} posts={posts} />
                    </div>
                </div>
                <div className="col-md-4 offset-md-1">
                    <Link to={`/post/new`}><p>Add a new post</p></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const categoryName = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.categoryName : ownProps.categoryName

    return {
        categoryName,
        posts: state.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryPosts: (categoryName) => dispatch(fetchCategoryPosts(categoryName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)