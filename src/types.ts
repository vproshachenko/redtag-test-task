export interface Author {
    id: string;
    name: string;
}
  
export interface Book {
    id: string;
    title: string;
    authorId: string;
    publishedYear: number;
    imageUrl: string;
}