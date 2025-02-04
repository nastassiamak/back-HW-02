import {db, HTTP_STATUSES, setDB} from "../src/db/db";
import {codedAuth, createString, dataset1, dataset2} from "./helpers/dataset";
import {PostInputModel} from "../src/input-output-type/post_type";
import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../src/setting";


describe('/posts', () => {
     // beforeAll(async () => {
     //     setDB()
     // })


    it('should create', async () => {
        setDB(dataset1)
        const newPost: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: dataset1.blogs[0].id,
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(HTTP_STATUSES.CREATED_201)

        expect(res.body.title).toEqual(newPost.title)
        expect(res.body.shortDescription).toEqual(newPost.shortDescription)
        expect(res.body.content).toEqual(newPost.content)
        expect(res.body.blogId).toEqual(newPost.blogId)
        expect(res.body.blogName).toEqual(dataset1.blogs[0].name)
        expect(typeof res.body.id).toEqual('string')

        expect(res.body).toEqual(db.posts[0])
    })

    it('shouldn\'t create 401', async () => {
        setDB(dataset1)
        const newPost: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: dataset1.blogs[0].id,
        }
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .send(newPost)
            .expect(HTTP_STATUSES.UNAUTHORIZED_401)

        expect(db.posts.length).toEqual(0)
    })

    it('shouldn\'t create', async () => {
        setDB()
        const newPost: PostInputModel = {
            title: createString(31),
            content: createString(1001),
            shortDescription: createString(101),
            blogId: '1',
        }
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        expect(db.posts.length).toEqual(0)
    })

    it('should  get empty array', async () => {
        setDB()

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(HTTP_STATUSES.OK_200)

        expect(res.body.length).toEqual(0)

    })

    it('should get not empty array', async () => {
        setDB(dataset2)

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(HTTP_STATUSES.OK_200)

        expect(res.body.length).toEqual(1)
        expect(res.body[0]).toEqual(dataset2.posts[0])
    })

    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should find', async () => {
        setDB(dataset2)

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .expect(HTTP_STATUSES.OK_200)

        expect(res.body).toEqual(dataset2.posts[0])
    })

    it('should delete', async () => {
        setDB(dataset2)

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        expect(db.posts.length).toEqual(0)
    })

    it('shouldn\'t delete', async () => {
        setDB()

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('shouldn\'t delete 401', async () => {
        setDB()

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth + 'error'})
            .expect(HTTP_STATUSES.UNAUTHORIZED_401)
    })

    it('should update', async () => {
        setDB(dataset2)
        const post: PostInputModel = {
            title: 't2',
            shortDescription: 's2',
            content: 'c2',
            blogId: dataset2.blogs[1].id,
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(post)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        expect(db.posts[0]).toEqual({...db.posts[0], ...post, blogName: dataset2.blogs[1].name})
    })

    it('shouldn\'t update 404', async () => {
        setDB()
        const post: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content:'c1',
            blogId: dataset1.blogs[0].id,
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(post)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should\'t update2', async () => {
        setDB(dataset2)
        const post: PostInputModel = {
            title: createString(31),
            content: createString(1001),
            shortDescription: createString(101),
            blogId: '1',
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(post)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        expect(db).toEqual(dataset2)
        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')
    })

    it('shouldn\'t update 401', async () => {
        setDB(dataset2)
        const post: PostInputModel = {
            title: createString(31),
            content: createString(1001),
            shortDescription: createString(101),
            blogId: '1',
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({'Authorization': 'Basic ' + codedAuth + 'error'})
            .send(post)
            .expect(HTTP_STATUSES.UNAUTHORIZED_401)

       expect(db).toEqual(dataset2)
    })
})