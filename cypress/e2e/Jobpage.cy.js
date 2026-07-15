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

})