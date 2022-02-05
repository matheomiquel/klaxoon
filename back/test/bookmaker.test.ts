import { Main } from "../app";
import axios from "axios";
import assert from "assert";
new Main();
const serverUrl = `http://localhost:${process.env.PORT}`;
const endpoint = 'bookmark'
describe("Bookmark all function", function () {
    it("should create, read, update, check Update and delete", async function () {
        const keyWord = ["toto"]
        const newKeyword = ["titi"]

        const createBookmark = await axios.post(
            `${serverUrl}/${endpoint}`,
            {
                "url": "https://vimeo.com/66386720",
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
        assert.equal(createBookmark.data.keyWord, keyWord.join(','))


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
        assert.equal(firstBookmark.keyWord, keyWord.join(','))

        const updateBookmark = await axios.put(
            `${serverUrl}/${endpoint}/${createBookmark.data.id}`,
            {
                "keyWord": newKeyword
            }
        );
        assert.equal(updateBookmark.status, 204)

        const updatedBookmark = await axios.get(`${serverUrl}/${endpoint}`);
        const firstBookmarkUpdated = updatedBookmark.data.rows[0]
        assert.equal(firstBookmarkUpdated.keyWord, newKeyword.join(','))

        const deleteBookmark = await axios.delete(`${serverUrl}/${endpoint}/${createBookmark.data.id}`);
        assert.equal(deleteBookmark.status, 204)

        const deletedBookmark = await axios.get(`${serverUrl}/${endpoint}`);
        assert.equal(deletedBookmark.data.rows.length, 0)
        assert.equal(deletedBookmark.data.count, 0)
    });
});