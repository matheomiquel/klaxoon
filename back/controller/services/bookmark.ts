import { Request, Response } from "express";
import { BookmarkDomain, Bookmark, GetBookmark } from '../../domain'
import { ErrorType } from '../../errorType'
import { getBookmarkInterface } from '../schemas'


export class BookmarkService {
    private readonly bookmarkDomain: BookmarkDomain
    constructor({ bookmarkDomain }: { bookmarkDomain: BookmarkDomain }) {
        this.bookmarkDomain = bookmarkDomain
    }
    async get(req: Request, res: Response): Promise<Response<GetBookmark[]>> {
        let keyWord = req.query.keyWord as string
        if (!!keyWord) {
            keyWord = keyWord.split(',').map((word) => `\(?=.*${word}\)`).join('')
        }
        const getBookmark = {
            order: req.query.order,
            limit: req.query.limit,
            offset: req.query.offset,
            keyWord
        } as unknown as getBookmarkInterface
        const titi = await this.bookmarkDomain.get({ ...getBookmark })
        return res.status(200).json(titi)
    }

    async create(req: Request, res: Response): Promise<Response<Bookmark>> {
        const dataCreate = {
            keyWord: req.body.keyWord,
            url: req.body.url
        }
        try {
            return res.status(201).json(await this.bookmarkDomain.create({ ...dataCreate }))
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).json(await e)
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        return res.status(204).json(await this.bookmarkDomain.update({ keyWord: req.body.keyWord, id: Number(req.params.id) }))
    }
    async delete(req: Request, res: Response): Promise<Response> {
        return res.status(204).json(await this.bookmarkDomain.delete({ id: Number(req.params.id) }))
    }
}