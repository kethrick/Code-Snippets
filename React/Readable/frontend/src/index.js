import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import NoMatch from './components/NoMatch'

const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/post/new" component={PostNew} />
                    <Route exact path="/:category_name" component={Category} />
                    <Route exact path="/:category_name/:post_id" component={Post} />

                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
