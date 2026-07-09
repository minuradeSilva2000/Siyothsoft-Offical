describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://devflexi.siyothsoft.com')
  })
})

describe('check Login Tests after navigate dashboard', () => {

  it('Should login with valid credentials', () => {

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'cy-test-token', user: { name: 'Test User', role: 'admin' } }
    }).as('loginApi')

    cy.visit('https://devflexi.siyothsoft.com/login')

    cy.get('input[placeholder="Enter your username"]').type('fl01')
    cy.get('input[placeholder="Enter your password"]').type('123456')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginApi', { timeout: 10000 })
    cy.url({ timeout: 10000 }).should('include', '/dashboard')
  })

})


describe('Login Tests', () => {

  it('check input invalid password', () => {

    cy.visit('https://devflexi.siyothsoft.com/login')

    cy.get('input[placeholder="Enter your username"]').type('fl01')
    cy.get('input[placeholder="Enter your password"]').type('1234')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
  })

})
describe('Invalid login',() =>{
  
  it('Should error for invalid password ', () => {

    cy.visit('https://devflexi.siyothsoft.com/login')
   
    cy.get('input[placeholder="Enter your username"]').type('ghl0647')
    cy.get('input[placeholder="Enter your password"]').type('123456')
    
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
  })
  

})

  