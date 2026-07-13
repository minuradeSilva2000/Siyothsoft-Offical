describe('Machine Module Test Suite', () => {

  beforeEach(() => {

    cy.login()
    cy.visit('https://devflexi.siyothsoft.com/jobs')

  })
   it('should open sidebar and navigate to Machine dashboard', () => {

    cy.get('.navbar__hamburger', { timeout: 10000 })
      .click()

    cy.get('.sidebar').should('be.visible')

    cy.contains('Machine').should('be.visible')

    cy.contains('Machine').click()

    cy.contains('Machine View', { timeout: 10000 }).should('be.visible')

  })

})