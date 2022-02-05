import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { BookmarkRoute, BookmarkService } from './controller'
import { BookmarkDomain, BookmarkInterface } from './domain'
import { BookmarkData } from './data'
export class Main {
  constructor() {
    let path = ".env";
    if (process.env.APP_ENV) {
      path = `${path}.${process.env.APP_ENV}`;
    }
    dotenv.config({ path: path });
    const PORT = process.env.PORT ?? 3000;

    const app = Express();
    app.use(cors());
    app.use(bodyParser.json());
    const bookmarkData = new BookmarkData()
    const bookmarkDomain = new BookmarkDomain({ bookmarkProvider: bookmarkData })
    const bookmarkService = new BookmarkService({ bookmarkDomain })
    new BookmarkRoute({ app, bookmarkService })
    const startLog = async function log() {
      console.log(`server lauch on port ${PORT}`);
    };

    app.listen(PORT, startLog);
  }
}