import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCategories } from '../../actions/'

class Nav extends Component {
    state = {
        categories: null
    }

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const {
            categories,
        } = this.props
        return (
            <div className="inline col-md-2 offset-md-1">
                <br />
                {categories && categories.map((category) => (
                    <Link to={`/${category.name}`} key={category.name}><h4>{category.name}</h4></Link>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))