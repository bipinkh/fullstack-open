const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map( blog => new Blog(blog) )
    const promiseArray = blogObjects.map( blog => blog.save() )
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
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


afterAll(() => {
    mongoose.connection.close()
})