describe('Item page Navigation Test Suite', () => {

  beforeEach(() => {
    cy.session('loginSession', () => {
      cy.visit('https://devflexi.siyothsoft.com/login')
      cy.get('input[placeholder="Enter your username"]').type('fl01')
      cy.get('input[placeholder="Enter your password"]').type('123456')
      cy.get('button[type="submit"]').click()
      cy.url({ timeout: 10000 }).should('not.include', '/login')
    })
    cy.visit('https://devflexi.siyothsoft.com/items')
  })
   it('should open sidebar and navigate  to Items dashboard',()=>{
     
    cy.get('.navbar__hamburger',{timeout: 10000}).click()
    cy.get('.sidebar').should('be.visible')
    cy.contains('Items').should('be.visible')
    cy.contains('Items').click()
    cy.contains('Item View',{timeout:10000}).should('be.visible')

  })
  it('should display the correct table headers', () => {
  cy.contains('button', 'View').should('be.visible').click()
  cy.get('table.data-table', { timeout: 15000 }).should('be.visible')
  cy.get('table.data-table thead th').eq(0).should('have.text', 'Item Id')
  cy.get('table.data-table thead th').eq(1).should('have.text', 'Item Code')
  cy.get('table.data-table thead th').eq(2).should('have.text', 'Item Desc')
  cy.get('table.data-table thead th').eq(3).should('have.text', 'Colors')
  cy.get('table.data-table thead th').eq(4).should('have.text', 'Sides')
  cy.get('table.data-table thead th').eq(5).should('have.text', 'Status')
 })
 
 it('click view button then display table with records', () => {

  cy.contains('button', 'View').should('be.visible').click()

  cy.get('table.data-table', { timeout: 15000 }).should('be.visible')

  cy.contains('No data available', { timeout: 5000 }).should('not.exist')

  cy.get('table.data-table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
})


})