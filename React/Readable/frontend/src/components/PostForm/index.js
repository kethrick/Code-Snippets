import React from "react"
import PropTypes from 'prop-types'

const PostForm = ({post, handleChange, handleSubmit}) => {

    return (
        <div className="inline col-md-8 offset-md-1">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={post.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={post.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="body"
                        value={post.body}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">SAVE</button>&nbsp;&nbsp;
                <button onClick={this.handlePostEditCancel} className="btn btn-default btn-md">Cancel</button>
            </form>
        </div>
    )
}

PostForm.propTypes = {
    post: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default PostForm