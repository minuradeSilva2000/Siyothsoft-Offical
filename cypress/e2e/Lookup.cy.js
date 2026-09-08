describe('Lookup page Navigation Test Suite', () => {

  beforeEach(() => {

    cy.login()
    cy.visit('https://devflexi.siyothsoft.com/jobs')

  })
  it('should open sidebar and navigate  to Lookup dashboard',()=>{
     
    cy.get('.navbar__hamburger',{timeout: 10000}).click()
    cy.get('.sidebar').should('be.visible')
    cy.get('.sidebar__item-text').contains('Lookup').should('be.visible')
    cy.get('.sidebar__item-text').contains('Lookup').click()
    cy.contains('Manage Lookup',{timeout:10000}).should('be.visible')

})
})