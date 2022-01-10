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



})