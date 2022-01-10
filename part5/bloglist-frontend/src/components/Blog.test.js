import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
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


  test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const viewButton = component.container.querySelector('button')
    fireEvent.click(viewButton)
    const togglableContentDiv = component.container.querySelector('.togglableContent')
    expect(togglableContentDiv).not.toHaveStyle('display: none')
    expect(togglableContentDiv).toHaveTextContent('https://erbipin.com')
    expect(togglableContentDiv).toHaveTextContent('10')
  })

} )