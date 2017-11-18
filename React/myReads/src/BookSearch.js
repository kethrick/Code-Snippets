import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class BookSearch extends Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        showingBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        if (query) {
            BooksAPI.search(query).then((showingBooks) => {
                console.log(showingBooks);
                if (showingBooks.length > 0) {
                    this.setState({ showingBooks: showingBooks });
                } else {
                    this.setState({ showingBooks: [] });
                }
            });
        } else {
            this.setState({ showingBooks: [] });
        }
    }

    clearQuery = () => {
        this.setState({ query: '' });
    }

    render() {

        const { query, showingBooks } = this.state;
        const { onChangeShelf, dbBooks } = this.props;

        return (
            <div className="search-books" >
                <div className="search-books-bar">

                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input className='search-contacts'
                            type='text'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {/* check showingBooks array is not undefined before trying to use it */}
                    {typeof (showingBooks) !== "undefined" && (
                        <ol className="books-grid">
                            {showingBooks.map((book) => (
                                <li key={book.id}>
                                    <Book itemBook={book} onChangeShelf={onChangeShelf} dbBooks={dbBooks} />
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div >
        );
    }
}

export default BookSearch;