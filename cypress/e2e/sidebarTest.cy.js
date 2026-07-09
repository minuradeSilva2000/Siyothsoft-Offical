describe('Sidebar Navigation Test Suite', () => {

  beforeEach(() => {

    cy.login()
    cy.visit('https://devflexi.siyothsoft.com/jobs')

  })
   


  it('should open sidebar and navigate to Job Plan dashboard', () => {

    // Step 3: Open sidebar (hamburger menu)
    cy.get('.navbar__hamburger', { timeout: 10000 })
      .click()

    // Step 4: Verify sidebar is visible
    cy.get('.sidebar').should('be.visible')

    // Step 5: Check Job Plan exists
    cy.contains('Job Plan').should('be.visible')

    // Step 6: Click Job Plan
    cy.contains('Job Plan').click()

    // Step 7: Verify navigation success
    cy.contains('Job', { timeout: 10000 })
      .should('be.visible')

  })
  it('check input fields are correctly working',()=>{
    
     cy.visit('https://devflexi.siyothsoft.com/job-plan')
    cy.get('input[placeholder="Enter job no"]').type('MO00008758')
     cy.contains('Preview').click()

  

  })
   it('check  preview button are working',()=>{
    cy.visit('https://devflexi.siyothsoft.com/job-plan')
    cy.get('input[placeholder="Enter job no"]').type('MO00008758')
    cy.get('input[type="date"]').eq(0).type('2026-04-27')
    cy.get('input[type="date"]').eq(1).type('2026-07-27')

     cy.intercept('POST', '/api/job-plan/preview*', {
       statusCode: 200,
       body: [{ jobNo: 'MO00008758', description: 'Test Job' }]
     }).as('previewData')
     cy.contains('Preview').click()
     cy.wait('@previewData', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
     cy.contains('MO00008758').should('exist')

  })
   it('check  reset button are working',()=>{
    cy.visit('https://devflexi.siyothsoft.com/job-plan')
    
    cy.get('input[placeholder="Enter job no"]').type('TEST-001')
    cy.get('input[type="date"]').eq(0).type('2026-04-22')
    cy.get('input[type="date"]').eq(1).type('2026-04-30')

    cy.contains('Reset').click()
    

    cy.get('input[placeholder="Enter job no"]').should('have.value', '')
    cy.get('input[type="date"]').eq(0).should('have.value', '')
    cy.get('input[type="date"]').eq(1).should('have.value', '')

  })
  it('should navigate back to Jobs page when the Go to Jobs button is clicked',()=>{

   cy.visit('https://devflexi.siyothsoft.com/job-plan')
   cy.contains('Go to Jobs').click()

   cy.url().should('include', '/jobs')
  })
  

  it('should navigate to Machine page via sidebar item text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Machine').click()

    // Verify  page is displayed
    cy.contains('Machine View', { timeout: 10000 }).should('be.visible')

  })

    it('should navigate to Actual Job page via sidebar item text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Actual Job').click()

    // Verify Job Plan page is displayed
    cy.contains('Actual Jobs', { timeout: 10000 }).should('be.visible')

  })

    it('should navigate to Customer page via sidebar item text', () => {

   
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Customer').click()

    cy.contains('Manage Customers', { timeout: 10000 }).should('be.visible')

  })
  
    it('should navigate to Item page via sidebar item text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Items').click()

    // Verify Job Plan page is displayed
    cy.contains('Item View', { timeout: 10000 }).should('be.visible')

  })
   it('should navigate to Lookup page via sidebar lookuppage text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Lookup').click()

    // Verify Job Plan page is displayed
    cy.contains('Manage Lookup', { timeout: 10000 }).should('be.visible')

  })
  it('should navigate to Print Type page via sidebar Print Type text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Print Type').click()

    // Verify Job Plan page is displayed
    cy.contains('Manage Print Types', { timeout: 10000 }).should('be.visible')

  })
   it('should navigate to Job Finishing List page via sidebar Job Finishing List text', () => {

    // Open sidebar
    cy.get('.navbar__hamburger', { timeout: 10000 }).click()
    cy.get('.sidebar').should('be.visible')

    // Click Job Plan via sidebar item text
    cy.get('.sidebar__item-text').contains('Job Card').click()

    // Verify Job Plan page is displayed
    cy.contains('Job Finishing List', { timeout: 10000 }).should('be.visible')

  })
   
 })