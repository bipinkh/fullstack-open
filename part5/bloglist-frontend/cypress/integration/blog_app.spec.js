describe('Blog app', () => {

  beforeEach(function (){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('displays the login form by default', () => {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

})