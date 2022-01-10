import React from 'react'
import Togglable from "./Togglable";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({blog}) => (
  <div style={blogStyle}>
      <div>{blog.title}</div>
      <Togglable buttonLabel="view" hideLabel="hide">
          {blog.url}<br/>
          {blog.likes} <button>like</button> <br/>
          {blog.author}<br/>
      </Togglable>
  </div>
)

export default Blog