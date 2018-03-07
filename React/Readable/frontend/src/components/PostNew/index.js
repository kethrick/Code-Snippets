import React, { Component } from "react"
import { connect } from "react-redux"
import moment from 'moment'
import uuidv1 from "uuid"
import { Link } from 'react-router-dom'

import { addPost } from "../../actions/index"
import PostForm from '../PostForm'

class PostNew extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            author: "",
            body: "",
            category: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { title, author, body, category } = this.state
        
        const id = uuidv1()
        const timestamp = moment().valueOf()
        if (author !== '' && body !== '' &&
            title !== '' && category !== '') {
            this.props.addPost({ id, title, author, body, category, timestamp })
            this.setState({ title: "" })
            this.setState({ body: "" })
            this.setState({ author: "" })
            this.setState({ category: "" })
        } else {
            alert('Oops looks like you missed some fields')
        }
    }

    render() {
        const post = this.state

        return (
            <div className="inline col-md-6 offset-md-1">
                <div>
                    <Link to='/'><strong>Home</strong></Link>
                </div>
                <div>
                    <h3>Add Post</h3>
                    <PostForm
                        post={post}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: post => dispatch(addPost(post))
    }
}
export default connect(null, mapDispatchToProps)(PostNew)