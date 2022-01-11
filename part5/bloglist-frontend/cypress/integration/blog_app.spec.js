describe('Blog app', () => {

  beforeEach(function (){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'bipin',
      password: 'sekretp@ss',
      name: 'bipin k'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('bipin')
      cy.get('#password').type('sekretp@ss')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('bipin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('bipin')
      cy.get('#password').type('incorrrectPw@')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bipin', password: 'sekretp@ss' })
    })

    it('A blog can be created', function() {
      cy.get('.toggleButton').click()
      cy.get('#title').type('Random Blog')
      cy.get('#author').type('Elon Musk')
      cy.get('#url').type('spacex.com')
      cy.get('.newBlogSaveButton').click()
      cy.get('.message').contains('a new blog Random Blog by Elon Musk')
    })

    describe('and has a blog', function (){

      beforeEach(function() {
        cy.createBlog({ title: 'New Blog Test', author: 'Bipin K', url: 'https://erbipin.com', likes: 71 })
      })

      it(' can like the blog', function (){
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('72')
      })

      it(' can delete the blog', function (){
        cy.contains('New Blog Test')
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('deleted New Blog Test by Bipin K')
      })

    })

  })

})
