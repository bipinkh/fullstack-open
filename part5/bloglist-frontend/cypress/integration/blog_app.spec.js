describe('Blog app', () => {

  beforeEach(function () {
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bipin')
      cy.get('#password').type('sekretp@ss')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('bipin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('bipin')
      cy.get('#password').type('incorrrectPw@')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({username: 'bipin', password: 'sekretp@ss'})
    })

    it('A blog can be created', function () {
      cy.get('.toggleButton').click()
      cy.get('#title').type('Random Blog')
      cy.get('#author').type('Elon Musk')
      cy.get('#url').type('spacex.com')
      cy.get('.newBlogSaveButton').click()
      cy.get('.message').contains('a new blog Random Blog by Elon Musk')
    })

    describe('and has a blog', function () {

      beforeEach(function () {
        cy.createBlog({title: 'New Blog Test', author: 'Bipin K', url: 'https://erbipin.com', likes: 71})
      })

      it(' can like the blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('72')
      })

      it(' can delete the blog', function () {
        cy.contains('New Blog Test')
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('deleted New Blog Test by Bipin K')
      })

    })


    describe(' has multiple blogs', function () {
      beforeEach(function () {
        cy.createBlog({title: 'New Blog Test 1', author: 'Bipin K', url: 'https://erbipin.com/1', likes: 10})
        cy.createBlog({title: 'New Blog Test 2', author: 'Bipin L', url: 'https://erbipin.com/2', likes: 3})
        cy.createBlog({title: 'New Blog Test 3', author: 'Bipin M', url: 'https://erbipin.com/3', likes: 189})
        cy.createBlog({title: 'New Blog Test 4', author: 'Bipin N', url: 'https://erbipin.com/4', likes: 55})
        cy.createBlog({title: 'New Blog Test 5', author: 'Bipin O', url: 'https://erbipin.com/5', likes: 7})
      })

      it('they are ordered according to likes ', function () {
        cy.get('.blogDetail>.blogListItem').should((blogg) => {
          expect(blogg[0]).to.contain('New Blog Test 3 Bipin M')
          expect(blogg[1]).to.contain('New Blog Test 4 Bipin N')
          expect(blogg[2]).to.contain('New Blog Test 1 Bipin K')
          expect(blogg[3]).to.contain('New Blog Test 5 Bipin O')
          expect(blogg[4]).to.contain('New Blog Test 2 Bipin L')
        })
      })

    })

  })

})