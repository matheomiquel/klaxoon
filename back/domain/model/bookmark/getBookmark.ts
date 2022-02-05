import { Bookmark } from './bookmark'

export class GetBookmark {
    count: number;
    bookmark: Bookmark[]
    constructor({ count, bookmark }: { count: number, bookmark: Bookmark[] }) {
        this.count = count;
        this.bookmark = bookmark;
    }
}