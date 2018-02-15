import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCategories, fetchPosts } from '../../actions/';
import PostList from '../PostList/'

class CategoryList extends Component {
    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchAllPosts()
    }

    render() {
        const {
            categoriesHasErrored,
            categoriesIsLoading,
            categories,
            posts,
            postsHasErrored,
            postsIsLoading
        } = this.props
        if (categoriesHasErrored) {
            return <p>Sorry! There was an error loading the categories</p>
        }
        if (postsHasErrored) {
            return <p>Sorry! There was an error loading the posts</p>
        }
        if (categoriesIsLoading || postsIsLoading) {
            return <p>Loading</p>
        }
        return (
            <div>
                <div className="inline col-md-8 offset-md-1">
                    <ul className="list-group list-unstyled">
                        {categories && categories.map((item) => (
                            <li key={item.name}>
                                <Link to={`/category/${item.name}`}><h2>{item.name}</h2></Link>
                                <div className="App-intro">
                                    <PostList categoryName={item.name} posts={posts && posts.filter(post => post.category === item.name)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="inline col-md-3">
                    <Link to={`/post/new`}><p>Add a new post</p></Link>
                </div>
                <br className="clearBoth" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        categoriesHasErrored: state.categoriesHasErrored,
        categoriesIsLoading: state.categoriesIsLoading,
        posts: state.posts,
        postsHasErrored: state.postsHasErrored,
        postsIsLoading: state.postsIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchAllPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)