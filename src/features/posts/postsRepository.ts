import {PostInputModel, PostViewModel} from "../../input-output-type/post_type";
import {PostDBType} from "../../db/post-db-type";
import {blogsRepository} from "../blogs/blogsRepository";
import {db} from "../../db/db";

export const postsRepository = {
    create(post: PostInputModel) {
        const newPost: PostDBType  = {
            id: new Date().toString() + Math.random(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: blogsRepository.find(post.blogId)!.name,
        }
        db.posts = [...db.posts, newPost]
        return newPost.id
    },

    find(id: string) {
        return db.posts.find(p => p.id === id)
    },

    findAndMap(id: string) {
        const post = this.find(id)!
        return this.map(post)
    },

    getAll() {
        return db.posts.map(p => this.map(p))
    },

    del(id: string) {
        const index = db.posts.findIndex(b => b.id === id)
        if (index > -1) {
            db.posts.splice(index, 1);
        }
    },

    put(post: PostInputModel, id: string) {
        const blog = blogsRepository.find(post.blogId)!
        return db.posts = db.posts.map(p => p.id === id ? {...p, ...post, blogName: blog.name} : p)
    },

    map(post: PostDBType) {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
        }
        return postForOutput
    },
}