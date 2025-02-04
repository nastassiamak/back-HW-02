import {Request, Response} from "express";
import {postsRepository} from "../postsRepository";
import {HTTP_STATUSES} from "../../../db/db";
import {PostInputModel} from "../../../input-output-type/post_type";

export const putPostController =  (req: Request<{id:string}, {}, PostInputModel>,
                                   res: Response) => {
    const {id} = req.params;
    const post = postsRepository.find(id)

    if (!post) {
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    const updatedPost = postsRepository.put(req.body, id);

    // Проверяем, если обновление прошло успешно
    if (!updatedPost) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400); // Возвращаем статус 400 при ошибке обновления
    }

        // Если обновление прошло успешно, возвращаем статус 204 (нет содержимого)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

}

