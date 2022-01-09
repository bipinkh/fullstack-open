const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const sampleBlogs = require('../resources/sample_blogs')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map( blog => new Blog(blog) )
    const promiseArray = blogObjects.map( blog => blog.save() )
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200).expect('Content-Type', /application\/json/)
}, 10000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength( helper.initialBlogs.length)
    const titles = []
    response.body.forEach( res => {
        titles.push(res.title)
        expect(res.id).toBeDefined()
    } )
    helper.initialBlogs.forEach( b => expect(titles).toContain(b.title) )
}, 10000)


test('new blog can be added', async () => {
    const newBlog = sampleBlogs.blogs[0]
    newBlog._id = await helper.nonExistingId()

    const response = await api.post('/api/blogs').send(newBlog)
        .expect(201).expect('Content-Type', /application\/json/)
    expect(response.body).toEqual( helper.toJson(newBlog) )

    await api.get('/get/blogs')

    const updatedEntriesInDb = await helper.blogsInDb()
    expect(updatedEntriesInDb).toHaveLength( helper.initialBlogs.length + 1)
    expect(updatedEntriesInDb).toContainEqual(newBlog)
}, 10000)

test('missing likes property will set it to 0 in db', async () => {
    const newBlog = sampleBlogs.blogs[0]
    delete newBlog.likes
    delete newBlog._id
    const response = await api.post('/api/blogs').send(newBlog)
        .expect(201).expect('Content-Type', /application\/json/)
    expect(response.body.likes).toEqual( 0)
})

afterAll(() => {
    mongoose.connection.close()
})