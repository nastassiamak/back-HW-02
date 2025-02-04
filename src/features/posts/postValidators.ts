import {body} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../blogs/blogsRepository";
import {postsRepository} from "./postsRepository";
import {HTTP_STATUSES} from "../../db/db";
import {adminMiddleware} from "../../global_middlewares/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../global_middlewares/inputCheckErrorsMiddleware";

// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid

export const titleValidator = body("title").isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('more then 30 or 0')

export const shortDescriptionValidator = body("shortDescription").isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('more then 100 or 0')

export const contentValidator = body("content").isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')

export const blogIdValidator = body("blogId").isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepository.find(blogId)
        return !!blog
    }).withMessage('no blog')

export const findPostValidator = (req: Request<{id: string}>,
                                  res: Response, next: NextFunction) => {
    const post = postsRepository.find(req.params.id)
    if (!post) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json({});
        return
    }

    next()
}

export const postValidators = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware


]