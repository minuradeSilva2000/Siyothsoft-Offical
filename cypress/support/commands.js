Cypress.Commands.add('login', () => {
  cy.session('user-session', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('**', (req) => {
      req.headers['authorization'] = 'Basic ' + btoa('fl01:123456')
    })
    cy.visit('/login', { failOnStatusCode: false })
    cy.get('input[placeholder="Enter your username"]', { timeout: 15000 }).should('be.visible').clear().type('fl01')
    cy.get('input[placeholder="Enter your password"]', { timeout: 15000 }).should('be.visible').clear().type('123456')
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click()
    cy.url({ timeout: 15000 }).should('not.include', '/login')
  })
})
