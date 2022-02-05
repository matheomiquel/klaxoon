import { BookmarkInterface, Bookmark, GetBookmark } from '../../domain'
import { BookmarkDB } from '../model'
import { Op } from 'sequelize'
import { DataError } from '../error'
const model = require('../../models')
import axios from 'axios'

export class BookmarkData implements BookmarkInterface {
    async get({ order, limit, offset, keyWord }: { order: string, limit: number, offset: number, keyWord: string }): Promise<GetBookmark> {
        const query = {
            offset: offset,
            limit: limit,
            order: [['createdAt', order]],
            where: {}
        }
        if (!!keyWord)
            query.where = {
                'keyWord': {
                    [Op.regexp]: keyWord
                }
            }
        const bookmark = await model.bookmark.findAndCountAll(query)
        return bookmark
    }
    async createPhoto({ url, keyWord }: { url: string, keyWord: string }): Promise<Bookmark> {
        try {
            const photo = await axios.get(`${process.env.PHOTO_URL}${url}`)
            const photoDB = await model.bookmark.create({
                URL: photo.data.url,
                title: photo.data.title,
                author: photo.data.author_name,
                width: photo.data.width,
                height: photo.data.height,
                keyWord: keyWord
            }) as BookmarkDB
            return new Bookmark(photoDB)
        } catch (e) {
            throw DataError.ressource_not_found()
        }

    }

    async createVideo({ id, keyWord }: { id: string, keyWord: string }): Promise<Bookmark> {

        try {
            const photo = await axios.get(`${process.env.VIDEO_URL}${id}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.VIMEO_TOKEN}`
                }
            })
            const photoDB = await model.bookmark.create({
                URL: photo.data.player_embed_url,
                title: photo.data.name,
                author: photo.data.user.name,
                width: photo.data.width,
                height: photo.data.height,
                duration: photo.data.duration,
                keyWord: keyWord
            }) as BookmarkDB
            return new Bookmark(photoDB)
        } catch (e) {
            throw DataError.ressource_not_found()
        }
    }

    async update({ id, keyWord }: { id: number, keyWord: string }): Promise<undefined> {
        await model.bookmark.update({
            keyWord: keyWord
        }, {
                where: {
                    id
                }
            }) as BookmarkDB
        return;
    }

    async delete({ id }: { id: number }): Promise<undefined> {
        const bookmark = await model.bookmark.destroy({
            where: {
                id
            }
        }) as BookmarkDB
        return;
    }
}