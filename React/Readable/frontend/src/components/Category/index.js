import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostList from '../PostList/'
import { fetchCategoryPosts } from '../../actions/';

class Category extends Component {
    componentDidMount() {
        this.props.fetchCategoryPosts(this.props.category_name)
    }

    render() {
        const {
            category_name,
            posts,
        } = this.props

        return (
            <div>
                <div className="inline col-md-6 offset-md-1">
                    <h2>{category_name}</h2>
                    <div className="App-intro">
                        <PostList category_name={category_name} posts={posts} />
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
    const category_name = typeof ownProps.match !== 'undefined' && typeof ownProps.match.params !== 'undefined' ? ownProps.match.params.category_name : ownProps.category_name
    
    return {
        category_name,
        posts: state.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryPosts: (category_name) => dispatch(fetchCategoryPosts(category_name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)