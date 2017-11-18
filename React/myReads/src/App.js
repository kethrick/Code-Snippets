import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
    state = {
        dbBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((dbBooks) => {
            this.setState({ dbBooks })
        });
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then((books) => {
            BooksAPI.getAll().then((dbBooks) => {
                this.setState({ dbBooks })
            });
        });
    }

    render() {

        const { dbBooks } = this.state;

        let currentlyReading = [];
        let match = new RegExp(escapeRegExp('currentlyReading'));
        currentlyReading = dbBooks.filter((book) => match.test(book.shelf));

        let wantToRead = [];
        match = new RegExp(escapeRegExp('wantToRead'));
        wantToRead = dbBooks.filter((book) => match.test(book.shelf));

        let readBooks = [];
        match = new RegExp(escapeRegExp('read'));
        readBooks = dbBooks.filter((book) => match.test(book.shelf));

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    bookShelfTitle="Currently Reading"
                                    books={currentlyReading}
                                    dbBooks={dbBooks}
                                    onChangeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    bookShelfTitle="Want to Read"
                                    books={wantToRead}
                                    dbBooks={dbBooks}
                                    onChangeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    bookShelfTitle="Read"
                                    books={readBooks}
                                    dbBooks={dbBooks}
                                    onChangeShelf={this.changeShelf}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link
                                to='/search'
                            >Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={({ history }) => (
                    <BookSearch onChangeShelf={this.changeShelf} dbBooks={dbBooks} />
                )} />
            </div>
        )
    }
}

export default BooksApp