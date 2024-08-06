import { userLibrary } from '../index.js';
import { readStatus } from './book.js';
import expandIcon from '../img/expandIcon.png';
import collapseIcon from '../img/collapseIcon.png';

export default function makeBooks() {
    const bookList = document.createElement('div');
    
    const headline = document.createElement('h1');
    headline.textContent = 'The BookList';
    headline.classList.add('headline');

    bookList.appendChild(headline);


    userLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
    
        const title = document.createElement('h2');
        title.textContent = book.title;
        
        const author = document.createElement('h3');
        author.textContent = `Author: ${book.author}`;
        
        const pages = document.createElement('h3');
        pages.textContent = `Pages: ${book.pages}`;
        
        // read status
        const readDropdown = document.createElement('select');
        Object.values(readStatus).forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status.charAt(0).toUpperCase() + status.slice(1).replaceAll('-', ' ');
            readDropdown.appendChild(option);
        });

        readDropdown.value = book.read;

        readDropdown.addEventListener('change', () => {
            book.read = readDropdown.value;
        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readDropdown);

        // div to contain both remove button and expand button for flexbox purposes
        const container = document.createElement('div');
        container.classList.add('container');

        // remove book button
        const removeBookButton = document.createElement('button');
        removeBookButton.textContent = 'Remove Book';
        removeBookButton.addEventListener('click', () => {
            userLibrary.splice(index, 1);
            bookList.removeChild(bookCard);
        });
        container.appendChild(removeBookButton);
        
        // expand to show description
        const expand = document.createElement('img');
        expand.src = expandIcon;
        expand.alt = 'expand button';
        expand.addEventListener('click', () => {
            description.style.display='block';
            collapse.style.display='block';
            expand.style.display='none';
        });
        container.appendChild(expand);

        bookCard.appendChild(container);

        // collapse to hide description
        const endContainer = document.createElement('div');
        endContainer.classList.add('endContainer');

        const collapse = document.createElement('img');
        collapse.src = collapseIcon;
        collapse.alt = 'collapse button';
        collapse.addEventListener('click', () => {
            description.style.display='none';
            collapse.style.display='none';
            expand.style.display='block';
        });
        endContainer.appendChild(collapse);

        // description
        const description = document.createElement('p');
        description.textContent = 'example text';
        bookCard.appendChild(description);

        bookCard.appendChild(endContainer);

        bookList.appendChild(bookCard);
    });

    return bookList;
}