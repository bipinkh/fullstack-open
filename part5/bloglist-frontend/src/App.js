import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password,})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
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

  const blogList = () => (
      <div>
          <h2>blogs</h2>
          <h3>{user.username} logged in</h3>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
  )

  return (
    <div>
        {user === null && loginForm()}
        {user !== null && blogList()}
        {
            errorMessage !== null &&
            <div style={{ color: 'red' }}>{errorMessage}</div>
        }
    </div>
  )
}

export default App