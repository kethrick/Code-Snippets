import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './bootstrap/css/bootstrap.css'
import registerServiceWorker from './registerServiceWorker'

import initialState from './store/initialState'
import configureStore from './store/configureStore'
import Header from './components/common/header.js'
import App from './components/App'
import Category from './components/Category'
import Post from './components/Post'
import PostNew from './components/PostNew'

const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="App">
                <Header />
                <Route exact path="/" component={App} />
                <Route path="/post/new" component={PostNew} />
                <Route path="/category/:categoryName" component={Category} />
                <Route path="/post/id/:postId" component={Post} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
