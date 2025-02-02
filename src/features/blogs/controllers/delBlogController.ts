// Функция удаления
import {Request, Response} from "express";
import {db, HTTP_STATUSES} from "../../../db/db";
import {blogsRepository} from "../blogsRepository";

export const delBlogController = (req: Request<{ id: string }>,
                                  res: Response) => {
    const {id} = req.params;

    const blogFind = blogsRepository.find(id);
    if (!blogFind) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .send({error: "Blog not found"});
    }

    blogsRepository.del(id);
    res
        .sendStatus(HTTP_STATUSES.NO_CONTENT_204)
};