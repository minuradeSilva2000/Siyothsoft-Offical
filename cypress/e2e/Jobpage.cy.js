describe('Job page Navigation Test Suite', () => {

  beforeEach(() => {
    cy.session('loginSession', () => {
      cy.visit('https://devflexi.siyothsoft.com/login')
      cy.get('input[placeholder="Enter your username"]').type('fl01')
      cy.get('input[placeholder="Enter your password"]').type('123456')
      cy.get('button[type="submit"]').click()
      cy.url({ timeout: 10000 }).should('not.include', '/login')
    })
    cy.visit('https://devflexi.siyothsoft.com/jobs')
  })
   it('should open sidebar and navigate  to Job dashboard',()=>{
     
    cy.get('.navbar__hamburger',{timeout: 10000}).click()
    cy.get('.sidebar').should('be.visible')
    cy.contains('Job').should('be.visible')
    cy.contains('Job').click()
    cy.contains('Job List',{timeout:10000}).should('be.visible')

  })
  it('should display the correct table headers', () => {
  cy.contains('button', 'View').should('be.visible').click()
  cy.get('table.data-table',{timeout:15000}).should('be.visible')
  cy.get('table.data-table thead th').eq(0).should('have.text','')
  cy.get('table.data-table thead th').eq(1).should('have.text','Job ID')
  cy.get('table.data-table thead th').eq(2).should('have.text','Job No')
  cy.get('table.data-table thead th').eq(3).should('have.text','Job Description')
  cy.get('table.data-table thead th').eq(4).should('have.text','Job Date')
  cy.get('table.data-table thead th').eq(5).should('have.text','Delivery Date')
  cy.get('table.data-table thead th').eq(6).should('have.text','Actual Date')
  cy.get('table.data-table thead th').eq(7).should('have.text','Qty')
  cy.get('table.data-table thead th').eq(8).should('have.text','Customer ID')
  cy.get('table.data-table thead th').eq(9).should('have.text','Priority')
  cy.get('table.data-table thead th').eq(10).should('have.text','Status')


})
})