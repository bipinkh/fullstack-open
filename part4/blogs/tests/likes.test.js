const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

describe( 'total likes', () => {

    const listWithOneBlog = [
        { _id: '5a422aa71b54a676234d17f8', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 20, __v: 0 }
    ]

    const listWithMultipleBlogs = [
        { _id: '5a422aa71b54a676234d17f8', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 20, __v: 0  },
        { _id: '5a422aa71b54a676234d17f9', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 43, __v: 0  },
        { _id: '5a422aa71b54a676234d17f0', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 12, __v: 0  },
        { _id: '5a422aa71b54a676234d17f1', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 9, __v: 0  },
        { _id: '5a422aa71b54a676234d17f2', "title": "Blog 1", "author": "Bipin K", "url": "google.com",  likes: 756, __v: 0  }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.countLikes( [] )
        expect(result).toBe(0)
    } )

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.countLikes(listWithOneBlog)
        expect(result).toBe(20)
    } )

    test('of a bigger list is calculated right', () => {
        const result = listHelper.countLikes(listWithMultipleBlogs)
        expect(result).toBe( 20+43+12+9+756 )
    } )

} )



