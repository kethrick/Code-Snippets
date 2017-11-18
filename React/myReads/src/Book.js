import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

class Book extends Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    handleChange = (e) => {
        const shelf = e.target.value;
        if (this.props.onChangeShelf) {
            this.props.onChangeShelf(this.props.itemBook, shelf);
        }
    }

    getSelected = (itemBook) => {
        const dbBooks = this.props.dbBooks;

        let selected = "none";
        let match = new RegExp(escapeRegExp(itemBook.id));
        let dbBook = dbBooks.filter((dbBook) => match.test(dbBook.id));
        if (typeof (dbBook) !== "undefined" && dbBook.length > 0) {
            dbBook = dbBook[0];
        } else {
            dbBook = {};
        }
        if (typeof (dbBook) !== "undefined" && typeof (dbBook.shelf) !== "undefined") {
            selected = dbBook.shelf;
        } else if (typeof (itemBook.shelf) !== "undefined") {
            if (itemBook.shelf === "read") {
                selected = "read";
            } else if (itemBook.shelf === "currentlyReading") {
                selected = "currentlyReading";
            } else if (itemBook.shelf === "wantToRead") {
                selected = "wantToRead";
            }
        }

        return selected;
    }

    render() {

        const { itemBook } = this.props;

        // check authors array to make sure it exists before we try to use it
        let authors = [];
        if (typeof (itemBook.authors) !== "undefined") {
            authors = itemBook.authors;
        }

        // check imageLinks array before we try to use it
        let coverURL = '';
        if (typeof (itemBook.imageLinks) !== "undefined") {
            if (typeof (itemBook.imageLinks.thumbnail) !== "undefined") {
                coverURL = itemBook.imageLinks.thumbnail;
            } else if (typeof (itemBook.imageLinks.smallThumbnail) !== "undefined") {
                coverURL = itemBook.imageLinks.smallThumbnail;
            }
        }

        let selected = this.getSelected(itemBook);

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${coverURL})`
                        }}></div>
                    <div className="book-shelf-changer">
                        <select value={selected} onChange={this.handleChange} >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{itemBook.title}</div>
                <div className="book-authors">
                    {authors.map((author) => (
                        <p key={author} >{author}</p>
                    ))}
                </div>
            </div>);
    }
}

export default Book