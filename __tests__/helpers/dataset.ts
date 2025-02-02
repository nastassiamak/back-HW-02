

//готовые данные для преиспользования в тестах
//
// export const creteString = (length: number) => {
//
// }

import {BlogBDType} from "../../src/db/blog-db-type";
import {DBType} from "../../src/db/db";

export const blog1: BlogBDType = {
    id: new Date().toISOString() + Math.random(),
    name: 'name1',
    description: 'description1',
    websiteUrl: 'http://example.com',
} as const // dataset нельзя изменять

export const blog5: BlogBDType = {
    id: new Date().toISOString() + Math.random(),
    name: 'name5',
    description: 'description5',
    websiteUrl: 'http://example5.com',
} as const // dataset нельзя изменять

export const dataset1: DBType = {
    blogs: [blog1],
    posts:[]
}

export const dataset2: DBType = {
    blogs: [blog1 , blog5],
    posts: []
} as const //dataset нельзя изменять
