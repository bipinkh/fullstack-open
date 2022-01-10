import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)
    const [newBlog, setNewBlog] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON !== null) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken( user.token )
      }
      blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
        const user = await loginService.login({username, password,})
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
    } catch (exception) {
        setErrorMessage('Wrong username or password')
        setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) =>  {
      event.preventDefault()
      window.localStorage.removeItem('loggedUser')
      blogService.setToken('')
      setUser(null)
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>password
          <input type="password" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

    const handleNewBlogAddition = async (event) => {
        event.preventDefault()
        try{
            const blogRequest = {
                "title": newBlog,
                "author": newBlogAuthor,
                "url": newBlogUrl
            }
            const blog = await blogService.addBlog(blogRequest)
            setBlogs(blogs.concat(blog))
            setNewBlog('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
            setInfoMessage(`a new blog ${blog.title} by ${blog.author}`)
            setTimeout(() => { setInfoMessage(null) }, 5000)
        } catch (exception) {
            setErrorMessage(`Failed to add blog. ${exception.message}`)
            setTimeout(() => { setErrorMessage(null) }, 5000)
        }
    }

    const newBlogForm = () => (
        <form onSubmit={handleNewBlogAddition}>
            title: <input value={newBlog}
                   onChange={({ target }) => setNewBlog(target.value)}
            /> <br/>
            author: <input value={newBlogAuthor}
                   onChange={({ target }) => setNewBlogAuthor(target.value)}
            /> <br/>
            url: <input value={newBlogUrl}
                   onChange={({ target }) => setNewBlogUrl(target.value)}
            /> <br/>
            <button type="submit">save</button>
        </form>
    )

  const blogsSection = () => (
      <div>
          <h2>blogs</h2>
          <b>{user.username} logged in</b>
          <button onClick={handleLogout}>logout</button> <br/>

          { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }

          <h2>create new</h2>
          {newBlogForm()}
      </div>
  )

  return (
    <div>
        {errorMessage !== null && <Notification message={errorMessage} isError={true} />}
        {infoMessage !== null && <Notification message={infoMessage} isError={false} />}
        {user === null && loginForm()}
        {user !== null && blogsSection()}
    </div>
  )
}

export default App