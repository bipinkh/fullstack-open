import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  let component
  const likeMockHandler = jest.fn()
  const deleteBlogMockHandler = jest.fn()
  const blogRequest = {
    'title': 'test blog',
    'author': 'Bipin K',
    'url': 'https://erbipin.com',
    'likes': 10
  }

  beforeEach( () => {
    component = render( <Blog blog={blogRequest} like={likeMockHandler} deleteBlog={deleteBlogMockHandler}/> )
  })

  test('contains title and author initially', () => {
    const blogDetailDiv = component.container.querySelector('.blogDetail')
    expect( blogDetailDiv ).toHaveTextContent( 'test blog Bipin K' )
  })

  test('does not contain url and likes initially', () => {
    const togglableContentDiv = component.container.querySelector('.togglableContent')
    expect(togglableContentDiv).toHaveStyle('display: none')
    expect(togglableContentDiv).toHaveTextContent('https://erbipin.com')
    expect(togglableContentDiv).toHaveTextContent('10')
  })

} )