import {BlogInputModel, BlogViewModel} from "../input-output-type/blog_type";
import {BlogBbType} from "../db/blog-db-type";
import {db} from "../db/db";


export const blogsRepository = {
    //Этот метод создает новый блог. Он принимает объект BlogInputModel, создает новый объект BlogDbType,
    //добавляет его в массив db.blogs, и затем возвращает уникальный ID нового блога.
    create(blog: BlogInputModel) {
        const newBlog: BlogBbType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        db.blogs = [...db.blogs, newBlog]
        return newBlog.id
    },

    //Этот метод находит блог по его ID, переданному в функцию.
    //Если блог найден, он будет возвращен, в противном случае — undefined.
    find(id: string) {
        return db.blogs.find(b => b.id === id)
    },

    //Сначала вызывает метод find, чтобы получить блог по ID,
    // затем использует метод map, чтобы преобразовать его в формат BlogViewModel.
    // Обратите внимание на использование !, который указывает TypeScript,
    // что вы уверены в наличии блога (т.е. blog не равен undefined).
    findAndMap(id: string) {

        const blog = this.find(id)! // использовать этот метод если проверили существование
        return this.map(blog)
    },

    //Этот метод должен возвращать все блоги.
    getAll(){
      return db.blogs.map(this.map); //возвращаем все блоги в формате BlogViewModel
    },

    //Метод для удаления блога по ID.
    del(id: string) {
        const index = db.blogs.findIndex(b => b.id === id) //// Находим индекс блога для обновления
        if (index > -1) {
            db.blogs.splice(index, 1); //удаляем блог из массива
        }
    },

    //Метод для обновления существующего блога по ID.
    put(blog: BlogInputModel, id: string) {
        const index = db.blogs.findIndex(b => b.id === id);

        if (index === -1) {
            return null; // Возвращаем null, если блог не найден
        }

        // Здесь можно добавить возможность обновления и возвращения обновленного блога
        db.blogs[index] = {...db.blogs[index], ...blog}; // Обновление блога
        return db.blogs[index]; // Возврат обновленного блога
    },

    //Этот метод преобразует BlogDbType в BlogViewModel, индивидуально выбирая нужные поля для вывода.
    map(blog: BlogBbType) {
        const blogForOutput: BlogViewModel = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
        }
        return blogForOutput
    },

}