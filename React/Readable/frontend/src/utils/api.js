class Api {
    static fetchCategories() {
        return fetch('http://localhost:3001/categories',
            {
                method: 'GET',
                headers: { 'Authorization': 'whatever-you-want' }
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }

    static fetchPosts() {
        return fetch('http://localhost:3001/posts',
            {
                method: 'GET',
                headers: { 'Authorization': 'whatever-you-want' }
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }

    static fetchCatPosts(category) {
        return fetch('http://localhost:3001/' + category + '/posts',
            {
                method: 'GET',
                headers: { 'Authorization': 'whatever-you-want' }
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static addPost(data) {
        return fetch('http://localhost:3001/posts',
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want' 
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static fetchPost(id) {
        return fetch('http://localhost:3001/posts/'+id,
            {
                method: 'GET',
                headers: { 'Authorization': 'whatever-you-want' }
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static upVote(data, str) {
        return fetch('http://localhost:3001/posts/'+data.id,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want'
                 },
                 body: JSON.stringify({option: str}),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static editPost(data) {
        return fetch('http://localhost:3001/posts/'+data.id,
            {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want'
                 },
                 body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static deletePost(data) {
        return fetch('http://localhost:3001/posts/'+data.id,
            {
                method: 'DELETE',
                headers: { 'Authorization': 'whatever-you-want' },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static fetchPostComments(id) {
        return fetch('http://localhost:3001/posts/' + id + '/comments',
            {
                method: 'GET',
                headers: { 'Authorization': 'whatever-you-want' }
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static addComment(data) {
        return fetch('http://localhost:3001/comments',
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want' 
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static editComment(data) {
        return fetch('http://localhost:3001/comments/'+data.id,
            {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want' 
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static deleteComment(data) {
        return fetch('http://localhost:3001/comments/'+data.id,
            {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want' 
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
    static upCommentVote(data, str) {
        return fetch('http://localhost:3001/comments/'+data.id,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'whatever-you-want'
                 },
                 body: JSON.stringify({option: str}),
            })
            .then((res) => res.json())
            .catch(error => {
                return error
            })
    }
}
export default Api