import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import PostList from '../PostList/'
import Nav from '../common/Nav'
import { fetchCategoryPosts, fetchCategories } from '../../actions/'

class Category extends Component {
    state = {
        categories: null
    }
    componentDidMount() {
        this.props.fetchCategoryPosts(this.props.category_name)
        this.props.fetchCategories()
        console.log('here')
    }

    handleClick(event) {
        this.setState({ category_name: event.target.id})
        window.parent.location = window.parent.location.href;
    }

    render() {
        const {
            category_name,
            posts,
            categories,
        } = this.props

        return (
            <div className="inline col-md-10 offset-md-1">
                <div className="col-md-8">
                    <Link to='/'><strong>Home</strong></Link>&nbsp;>>&nbsp;
                    <strong>{category_name}</strong>
                </div>
                <div className="col-md-2">
                    <Link to={`/post/new`}><p>Add a new post</p></Link>
                </div>
                <div className="inline col-md-10">
                    <div className="inline col-md-2 offset-md-1">
                        <br />
                        {categories && categories.map((category) => (
                            <Link to={`/${category.name}`} onClick={this.handleClick} key={category.name}><h4 id={category.name}>{category.name}</h4></Link>
                        ))}
                    </div>
                    <div className="inline col-md-8" key={category_name}>
                        <div>
                            <h2>{category_name}</h2>
                            <div className="App-intro">
                                <PostList category_name={category_name} posts={posts} />
                            </div>
                        </div>
                    </div>
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
        categories: state.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryPosts: (category_name) => dispatch(fetchCategoryPosts(category_name)),
        fetchCategories: () => dispatch(fetchCategories()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))