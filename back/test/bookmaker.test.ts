import { Main } from "../app";
import axios, { AxiosError } from "axios";
import assert from "assert";
new Main();
const serverUrl = `http://localhost:${process.env.PORT}`;
const endpoint = 'bookmark'
const vimeoUrl = 'https://vimeo.com/66386720'
describe("Bookmark all function", function () {
    it("should create, read, update, check Update and delete", async function () {
        const keyWord = "toto"
        const newKeyword = "titi"

        const createBookmark = await axios.post(
            `${serverUrl}/${endpoint}`,
            {
                "url": vimeoUrl,
                "keyWord": keyWord
            }
        );
        assert.equal(createBookmark.status, 201)
        assert.equal(Object.keys(createBookmark.data).includes('id'), true)
        assert.equal(Object.keys(createBookmark.data).includes('URL'), true)
        assert.equal(Object.keys(createBookmark.data).includes('title'), true)
        assert.equal(Object.keys(createBookmark.data).includes('author'), true)
        assert.equal(Object.keys(createBookmark.data).includes('width'), true)
        assert.equal(Object.keys(createBookmark.data).includes('height'), true)
        assert.equal(Object.keys(createBookmark.data).includes('duration'), true)
        assert.equal(Object.keys(createBookmark.data).includes('keyWord'), true)
        assert.equal(Object.keys(createBookmark.data).includes('createdAt'), true)
        assert.equal(Object.keys(createBookmark.data).includes('updatedAt'), true)
        assert.equal(createBookmark.data.keyWord, keyWord)


        const getBookmark = await axios.get(`${serverUrl}/${endpoint}`);
        assert.equal(getBookmark.status, 200)
        assert.equal(Object.keys(getBookmark.data).includes('count'), true)
        const firstBookmark = getBookmark.data.rows[0]
        assert.equal(Object.keys(firstBookmark).includes('id'), true)
        assert.equal(Object.keys(firstBookmark).includes('URL'), true)
        assert.equal(Object.keys(firstBookmark).includes('title'), true)
        assert.equal(Object.keys(firstBookmark).includes('author'), true)
        assert.equal(Object.keys(firstBookmark).includes('width'), true)
        assert.equal(Object.keys(firstBookmark).includes('height'), true)
        assert.equal(Object.keys(firstBookmark).includes('duration'), true)
        assert.equal(Object.keys(firstBookmark).includes('keyWord'), true)
        assert.equal(Object.keys(firstBookmark).includes('createdAt'), true)
        assert.equal(Object.keys(firstBookmark).includes('updatedAt'), true)
        assert.equal(firstBookmark.keyWord, keyWord)

        const updateBookmark = await axios.put(
            `${serverUrl}/${endpoint}/${createBookmark.data.id}`,
            {
                "keyWord": newKeyword
            }
        );
        assert.equal(updateBookmark.status, 204)

        const updatedBookmark = await axios.get(`${serverUrl}/${endpoint}`);
        const firstBookmarkUpdated = updatedBookmark.data.rows[0]
        assert.equal(firstBookmarkUpdated.keyWord, newKeyword)

        const deleteBookmark = await axios.delete(`${serverUrl}/${endpoint}/${createBookmark.data.id}`);
        assert.equal(deleteBookmark.status, 204)

        const deletedBookmark = await axios.get(`${serverUrl}/${endpoint}`);
        assert.equal(deletedBookmark.data.rows.length, 0)
        assert.equal(deletedBookmark.data.count, 0)
    });
    it("should create two and get only one by key word", async function () {
        const firstKeyWord = "toto"
        const secondKeyword = `${firstKeyWord},titi`

        const firstBookmark = await axios.post(
            `${serverUrl}/${endpoint}`,
            {
                "url": vimeoUrl,
                "keyWord": firstKeyWord
            }
        );
        const secondBookmark = await axios.post(
            `${serverUrl}/${endpoint}`,
            {
                "url": vimeoUrl,
                "keyWord": secondKeyword
            }
        );
        const getBookmark = await axios.get(`${serverUrl}/${endpoint}?keyWord=${secondKeyword}`);
        assert.equal(getBookmark.data.rows.length, 1)
        await axios.delete(`${serverUrl}/${endpoint}/${firstBookmark.data.id}`);
        await axios.delete(`${serverUrl}/${endpoint}/${secondBookmark.data.id}`);
    })

    it("create bookmark should fail and return 404", async function () {
        try {
            await axios.post(
                `${serverUrl}/${endpoint}`,
                {
                    "url": `${vimeoUrl}0`
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.status, 404)
            }
        }
    })
    it("create bookmark should fail and return 400", async function () {
        try {
            await axios.post(
                `${serverUrl}/${endpoint}`,
                {
                    "url": "https://vimeoa.com/66386720"
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.status, 400)
            }
        }
    })
});