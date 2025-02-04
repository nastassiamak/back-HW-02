import {Request, Response} from "express";
import {postsRepository} from "../postsRepository";
import {HTTP_STATUSES} from "../../../db/db";
import {blogsRepository} from "../../blogs/blogsRepository";

export const delPostController = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params; // Извлекаем ID блога

    const postFind = postsRepository.find(id); // Ищем блог по ID
    if (!postFind) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({ error: "Blog not found" }); // Если блог не найден
    }

   postsRepository.del(id); // Удаляем блог и получаем удаленный объект
    res
        .sendStatus(HTTP_STATUSES.NO_CONTENT_204); // Возвращаем статус 204
};