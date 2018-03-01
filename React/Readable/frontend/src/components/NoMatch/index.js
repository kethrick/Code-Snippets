import React from "react"
import { Link } from 'react-router-dom'

const NoMatch = ({ location }) => (
    <div className="inline col-md-8 offset-md-1">
        <h1>404 not found</h1>
        <p>Nothing to see here</p>
        <p><Link to="/">Back to Home</Link></p>
    </div>
)

export default NoMatch