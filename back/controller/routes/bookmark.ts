import { Express } from "express";
import { createValidator } from "express-joi-validation";
import { BookmarkService } from '../services'
import { CreateBookmarkSchema, GetBookmarkSchema, UpdateBookmarkSchema, IdSchema } from '../schemas'
const validator = createValidator();
export class BookmarkRoute {
    private readonly endpoint = "bookmark";
    constructor(
        { app, bookmarkService }: { app: Express, bookmarkService: BookmarkService },
    ) {
        app.get(
            `/${this.endpoint}`,
            validator.query(GetBookmarkSchema),
            bookmarkService.get.bind({ ...bookmarkService })
        );
        app.post(
            `/${this.endpoint}`,
            validator.body(CreateBookmarkSchema),
            bookmarkService.create.bind({ ...bookmarkService })
        );
        app.put(
            `/${this.endpoint}/:id`,
            validator.params(IdSchema),
            validator.body(UpdateBookmarkSchema),
            bookmarkService.update.bind({ ...bookmarkService })
        );
        app.delete(
            `/${this.endpoint}/:id`,
            validator.params(IdSchema),
            bookmarkService.delete.bind({ ...bookmarkService })
        );
    }
}
