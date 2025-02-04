import { Request, Response } from 'express';
import {PostViewModel} from "../../../input-output-type/post_type";
import {postsRepository} from "../postsRepository";
import {HTTP_STATUSES} from "../../../db/db";

export const findPostController = (req: Request<{id:string}>,
                                   res: Response <PostViewModel>) => {
    const { id } = req.params;
    const post = postsRepository.find(id)
    if (!post) {
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    res
        .status(HTTP_STATUSES.OK_200).send(post);
}