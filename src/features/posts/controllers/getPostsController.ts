import { Request, Response } from 'express'
import {postsRepository} from "../postsRepository";
import {HTTP_STATUSES} from "../../../db/db";

export const getPostsController = (req: Request, res: Response) => {
    const posts = postsRepository.getAll()

    res
        .status(HTTP_STATUSES.OK_200)
        .json(posts)
}