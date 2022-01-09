const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json( blogs )
})

blogRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)
    if(blog.title === undefined || blog.url === undefined){
        response.status(400).end()
        return
    }
    blog.likes = request.body.likes || 0
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
    const updateRequest = request.body
    const blog = await Blog.findOneAndUpdate(request.params.id, updateRequest, {new: true})
    response.json(blog)
})

module.exports = blogRouter