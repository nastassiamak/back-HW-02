// Функция обновления
import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../../db/db";
import {BlogInputModel} from "../../../input-output-type/blog_type";
import {blogsRepository} from "../blogsRepository";



export const putBlogController = (req: Request<{ id: string }, {}, BlogInputModel>,
                                  res: Response) => {

    const { id } = req.params; // Извлекаем ID блога из параметров
    const blog = blogsRepository.find(id); // Ищем блог по ID

    // Если блог не найден, возвращаем статус 404
    if (!blog) {
         res.sendStatus(HTTP_STATUSES.NOT_FOUND_404); // Завершаем выполнение функции
    }

    // Попытка обновления блога
    const updatedBlog = blogsRepository.put(req.body, id);

    // Проверяем, если обновление прошло успешно
    if (!updatedBlog) {
         res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400); // Возвращаем статус 400 при ошибке обновления
    }

    // Если обновление прошло успешно, возвращаем статус 204 (нет содержимого)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }