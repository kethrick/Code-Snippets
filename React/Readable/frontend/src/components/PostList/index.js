import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class PostList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            categoryName: this.props.categoryName,
            posts: this.props.posts,
            myData: this.props.posts,
        }
        this.trim = this.trim.bind(this)
        this.sortBy = this.sortBy.bind(this)
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
        const { myData, categoryName } = this.state
        
        if (myData && myData.length > 0) {
            return (
                <div className="col-md-12">
                    <div className="inline col-md-8 offset-md-1">
                        <ul className='list-group list-group-flush'>
                            {myData.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <Link to={`/post/id/${item.id}`}><h3>{item.title}</h3></Link>
                                    <p>
                                        Author: {item.author} <br />
                                        Created: {moment(item.timestamp).format('YYYY-MM-DD')}
                                    </p>
                                    <p>{ this.trim(item.body) }</p>
                                    <p>Vote Score: { this.trim(item.voteScore) }</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="inline col-md-2">
                        <select onChange={this.sortBy} id={`${categoryName}-sort`}>
                            <option value="byDateASC">By Date Ascending</option>
                            <option value="byDateDESC">By Date Descending</option>
                            <option value="byVoteScoreASC">By Vote Score Ascending</option>
                            <option value="byVoteScoreDESC">By Vote Score Descending</option>
                        </select>
                    </div>
                </div>
            )
        }
        return null
    }
}

export default PostList