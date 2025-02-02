import {Router} from "express";
import {getBlogsController} from "./controllres/getBlogsController";
import {findBlogController} from "./controllres/findBlogController";
import {delBlogController} from "./controllres/delBlogController";
import {putBlogController} from "./controllres/putBlogController";
import {createBlogController} from "./controllres/createBlogController";
import {blogValidators, findBlogValidator} from "./blogValidators";
import {adminMiddleware} from "../admin-middleware";
import {inputCheckErrorsMiddleware} from "../inputCheckErrorsMiddleware";

export const blogsRouter = Router()

blogsRouter.post('/', ...blogValidators, inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogValidator, findBlogController)
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, delBlogController)
blogsRouter.put('/:id', ...blogValidators, inputCheckErrorsMiddleware, putBlogController)
