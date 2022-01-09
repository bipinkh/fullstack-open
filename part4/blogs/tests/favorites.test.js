const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

describe( 'favorite among ', () => {

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

    test('empty list of blogs is None', () => {
        const result = listHelper.favoriteBlog( [] )
        expect(result).toBe(null)
    } )

    test('singleton list of blogs is itself', () =>{
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test(' list of blogs is the one with highest likes', () =>{
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(listWithMultipleBlogs[4])
    })

})