import { Bookmark, GetBookmark } from '../model'
export interface BookmarkInterface {
    get({ order, limit, offset, keyWord }: { order: string, limit: number, offset: number, keyWord: string }): Promise<GetBookmark>
    createPhoto({ url, keyWord }: { url: string, keyWord: string }): Promise<Bookmark>;
    createVideo({ id, keyWord }: { id: string, keyWord: string }): Promise<Bookmark>;
    update({ id, keyWord }: { id: number, keyWord: string }): Promise<undefined>;
    delete({ id }: { id: number }): Promise<undefined>;
}