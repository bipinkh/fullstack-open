const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const {initialUsers} = require("./test_helper");

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

test('a new user can be created', async () => {
    const userAtStart = await helper.usersInDb()
    const newUser = {
        username: "random",
        name: "random test user",
        password: "randomsekret"
    }
    await api.post('/api/users').send(newUser)
        .expect(200).expect('Content-Type', /application\/json/)
    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(userAtStart.length +1)
    const usernames = userAtEnd.map( u => u.username )
    expect(usernames).toContain(newUser.username)
})



afterAll(() => {
    mongoose.connection.close()
})