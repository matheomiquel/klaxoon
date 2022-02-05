import { BookmarkInterface } from '../interfaces'
import { Bookmark, GetBookmark } from '../model'
import { DomainError } from '../error'
export class BookmarkDomain {
    private readonly bookmarkProvider: BookmarkInterface
    constructor({ bookmarkProvider }: { bookmarkProvider: BookmarkInterface }) {
        this.bookmarkProvider = bookmarkProvider
    }

    async get({ order, limit, offset, keyWord }: { order: string, limit: number, offset: number, keyWord: string }): Promise<GetBookmark> {
        return await this.bookmarkProvider.get({ order, limit, offset, keyWord })
    }

    async create({ keyWord, url }: { keyWord: string, url: string }): Promise<Bookmark> {
        const isPhoto = url.split('.').some((word) => word === 'flickr')
        const isVideo = url.split('/').some((word) => word === 'vimeo.com')
        if (isPhoto) {
            return this.bookmarkProvider.createPhoto({ url, keyWord })
        } else if (isVideo) {
            const id = url.split('/').slice(-1)[0]
            return this.bookmarkProvider.createVideo({ id, keyWord })
        } else {
            throw DomainError.bad_request('l\'url envoyé n\'est pas bonne')
        }
    }
    async update({ keyWord, id }: { keyWord: string, id: number }): Promise<undefined> {
        return await this.bookmarkProvider.update({ keyWord, id })
    }
    async delete({ id }: { id: number }): Promise<undefined> {
        return await this.bookmarkProvider.delete({ id })
    }
}