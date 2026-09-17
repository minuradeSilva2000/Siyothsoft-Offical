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
  it('verify select the  holiday and  visible the holiday table',()=>{
    cy.visit('https://devflexi.siyothsoft.com/lookups')
    cy.get('select', { timeout: 15000 }).should('be.visible')
    cy.get('select').contains('option', 'Holiday', { timeout: 15000 }).should('exist')
    cy.get('select').select('Holiday')
    cy.get('table', { timeout: 15000 }).should('be.visible')
    cy.get('table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.wait(2000)
  })
   it('Verify Reason selection displays the Reason table and moda',()=>{
    cy.visit('https://devflexi.siyothsoft.com/lookups')
    cy.get('select', { timeout: 15000 }).should('be.visible')
    cy.get('select').contains('option', 'Reason', { timeout: 15000 }).should('exist')
    cy.get('select').select('Reason')
    cy.get('table', { timeout: 15000 }).should('be.visible')
    cy.get('table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.get('table tbody tr td span', { timeout: 15000 }).first().click()
    cy.get('.modal-box').should('be.visible')

  })
})


