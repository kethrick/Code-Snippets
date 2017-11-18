import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        bookShelfTitle: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {

        const { books, bookShelfTitle, onChangeShelf, dbBooks } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book itemBook={book}
                                    dbBooks={dbBooks}
                                    onChangeShelf={onChangeShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;