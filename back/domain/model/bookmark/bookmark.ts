export class Bookmark {
    id: number;
    URL: string;
    title: string;
    author: string;
    width: number;
    height: number;
    duration?: number;
    keyWord: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(
        { id, URL, title, author, width, height, keyWord, createdAt, updatedAt, duration }:
            {
                id: number, URL: string, title: string, author: string, width: number, height: number,
                keyWord: string, duration?: number, createdAt: Date, updatedAt: Date
            }) {
        this.id = id
        this.URL = URL;
        this.title = title;
        this.author = author;
        this.width = width;
        this.height = height;
        this.duration = duration;
        this.keyWord = keyWord;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}