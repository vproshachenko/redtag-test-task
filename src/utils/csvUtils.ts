import type { Book, Author } from "../types";

export function exportLibraryToCsv(books: Book[], authors: Author[]): void {
    const headers = ['Book ID', 'Title', 'Author ID', 'Author Name', 'Published Year'].join(',');

    const rows = books.map((book) => {
    const matchedAuthor = authors.find((a) => a.id === book.authorId);
    const authorName = matchedAuthor ? matchedAuthor.name : 'Unknown Author';

    const cleanTitle = book.title.replace(/"/g, '""');
    const cleanAuthorName = authorName.replace(/"/g, '""');

    return [
        `"${book.id}"`,
        `"${cleanTitle}"`,
        `"${book.authorId}"`,
        `"${cleanAuthorName}"`,
        book.publishedYear
    ].join(',');
    });

    const csvContent = [headers, ...rows].join('\n');

    const content = "data:text/csv;charset=utf-8," 
    + csvContent

    var encodedUri = encodeURI(content);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "library.csv");
    document.body.appendChild(link);

    link.click();
}