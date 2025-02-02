import {Request, Response} from "express";
import {BlogViewModel, BlogInputModel} from "../../../input-output-type/blog_type";
import {db, HTTP_STATUSES} from "../../../db/db";
import {blogsRepository} from "../blogsRepository";

export const createBlogController = (req: Request<any, any, BlogInputModel>,
                                    res:Response<BlogViewModel>) =>{
    const newBlogId = blogsRepository.create(req.body)
    const newBlog = blogsRepository.findAndMap(newBlogId)

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newBlog)
}