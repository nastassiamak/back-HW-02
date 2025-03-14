
import {BlogInputModel} from "../src/input-output-type/blog_type";
import {SETTINGS} from "../src/setting";
import {db, HTTP_STATUSES, setDB} from "../src/db/db";
import {codedAuth, createString, dataset1} from "./helpers/dataset";
import {req} from "./helpers/test-helpers";


describe('/blogs', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()

    })

    it('should create', async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog) // отправка данных
            .expect(HTTP_STATUSES.CREATED_201)

        //console.log(res.body)

        expect(res.body.name).toEqual(newBlog.name)
        expect(res.body.description).toEqual(newBlog.description)
        expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl)
        expect(typeof res.body.id).toEqual('string')

        expect(res.body).toEqual(db.blogs[0])
    })
    it('shouldn\'t create 401', async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .send(newBlog) // отправка данных
            .expect(HTTP_STATUSES.UNAUTHORIZED_401)

        // console.log(res.body)

        expect(db.blogs.length).toEqual(0)
    })
    it('shouldn\'t create', async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog) // отправка данных
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        //console.log(res.body)

        expect(res.body.errorsMessages.length).toEqual(3)
        expect(res.body.errorsMessages[0].field).toEqual('name')
        expect(res.body.errorsMessages[1].field).toEqual('description')
        expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')

        expect(db.blogs.length).toEqual(0)
    })
    it('should get empty array', async () => {
        setDB() // очистка базы данных если нужно

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200) // проверяем наличие эндпоинта

       // console.log(res.body) // можно посмотреть ответ эндпоинта

        expect(res.body.length).toEqual(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        setDB(dataset1) // заполнение базы данных начальными данными если нужно

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200)

        // console.log(res.body)

        expect(res.body.length).toEqual(1)
        expect(res.body[0]).toEqual(dataset1.blogs[0])
    })
    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404) // проверка на ошибку

        // console.log(res.body)
    })
    it('should find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .expect(HTTP_STATUSES.OK_200) // проверка на ошибку

        // console.log(res.body)

        expect(res.body).toEqual(dataset1.blogs[0])
    })
    it('should del', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(HTTP_STATUSES.NO_CONTENT_204) // проверка на ошибку

        //console.log(res.body)

        expect(db.blogs.length).toEqual(0)
    })
    it('shouldn\'t del', async () => {
        setDB()

        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(HTTP_STATUSES.NOT_FOUND_404) // проверка на ошибку

        //console.log(res.body)
    })
    it('shouldn\'t del 401', async () => {
        setDB()

        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic' + codedAuth}) // no ' '
            .expect(HTTP_STATUSES.UNAUTHORIZED_401) // проверка на ошибку

        // console.log(res.body)
    })
    it('should update', async () => {
        setDB(dataset1)
        const blog: BlogInputModel = {
            name: 'n2',
            description: 'd2',
            websiteUrl: 'http://some2.com',
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(HTTP_STATUSES.NO_CONTENT_204) // проверка на ошибку

        // console.log(res.body)

        expect(db.blogs[0]).toEqual({...db.blogs[0], ...blog})
    })
    it('shouldn\'t update 404', async () => {
        setDB()
        const blog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(HTTP_STATUSES.NOT_FOUND_404) // проверка на ошибку

        //console.log(res.body)
    })
    it('shouldn\'t update2', async () => {
        setDB(dataset1)
        const blog: BlogInputModel = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(HTTP_STATUSES.BAD_REQUEST_400) // проверка на ошибку

        //console.log(res.body)

        expect(db).toEqual(dataset1)
        expect(res.body.errorsMessages.length).toEqual(3)
        expect(res.body.errorsMessages[0].field).toEqual('name')
        expect(res.body.errorsMessages[1].field).toEqual('description')
        expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
    })
    it('shouldn\'t update 401', async () => {
        setDB(dataset1)
        const blog: BlogInputModel = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth + 'error'})
            .send(blog)
            .expect(HTTP_STATUSES.UNAUTHORIZED_401) // проверка на ошибку

        //console.log(res.body)

        expect(db).toEqual(dataset1)
    })
})