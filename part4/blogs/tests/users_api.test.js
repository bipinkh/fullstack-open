const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const {initialUsers} = require("./test_helper");

const api = supertest(app)

describe('new user can be created with', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('valid username, name and password', async () => {
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

});


describe('new user cannot be created with', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('empty username', async () => {
        const newUser = { password: "secret", name: "random user" }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('empty password', async () => {
        const newUser = { username: "user101", name: "random user" }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('empty username password', async () => {
        const newUser = { name: "random user" }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('username less than 3 characters', async () => {
        const newUser = { username:"ab", password: "secret", name: "random user" }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('password less than 3 characters', async () => {
        const newUser = { username:"user101", password: "se", name: "random user" }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('duplicate username', async () => {
        const newUser = { username:"user999", password: "secret", name: "random user" }
        await api.post('/api/users').send(newUser).expect(200)
        const newUser2 = { username:"user999", password: "secret2", name: "random user2" }
        await api.post('/api/users').send(newUser).expect(400)
    })

});

afterAll(() => {
    mongoose.connection.close()
})