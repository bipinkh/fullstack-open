const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', {username: 1, name: 1, id: 1})
    response.json( blogs )
})

blogRouter.post('', async (request, response) => {
    const user = await User.find({})
    const blog = new Blog(request.body)
    blog.user = user[0]._id
    if(blog.title === undefined || blog.url === undefined){
        response.status(400).send('Title and URL cannot be empty')
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