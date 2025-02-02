import { Request, Response } from "express";
import {BlogViewModel} from "../../../input-output-type/blog_type";
import {db, HTTP_STATUSES} from "../../../db/db";
import {blogsRepository} from "../blogsRepository";

export  const findBlogController = (req: Request<{id: string}>,
                                    res: Response <BlogViewModel>) => {
    const {id} = req.params;

    const blog = blogsRepository.find(id)

     if (!blog) {
         res
             .sendStatus(HTTP_STATUSES.NOT_FOUND_404);
     }
     res.status(HTTP_STATUSES.OK_200).send(blog);

}