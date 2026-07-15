describe('Job Plan page Navigation Test Suite', () => {

  beforeEach(() => {
    cy.session('loginSession', () => {
      cy.visit('https://devflexi.siyothsoft.com/login')
      cy.get('input[placeholder="Enter your username"]').type('fl01')
      cy.get('input[placeholder="Enter your password"]').type('123456')
      cy.get('button[type="submit"]').click()
      cy.url({ timeout: 10000 }).should('not.include', '/login')
    })
    cy.visit('https://devflexi.siyothsoft.com/job-plan')
  })
    it('should open sidebar and navigate  to job plan dashboard',()=>{
     
    cy.get('.navbar__hamburger',{timeout: 10000}).click()
    cy.get('.sidebar').should('be.visible')
    cy.contains('Job Plan').should('be.visible')
    cy.contains('Job Plan').click()
    cy.contains('Job Planning',{timeout:10000}).should('be.visible')

  })
  it('display the correct table header',()=>{

    cy.contains('button','Preview').should('be.visible').click()
    cy.get('table.job-table',{timeout:15000}).should('be.visible')
    cy.get('table.job-table thead th').eq(0).invoke('text').invoke('trim').should('eq','Actions')
    cy.get('table.job-table thead th').eq(1).invoke('text').invoke('trim').should('eq','Job No')
    cy.get('table.job-table thead th').eq(2).invoke('text').invoke('trim').should('eq','Description')
    cy.get('table.job-table thead th').eq(3).invoke('text').invoke('trim').should('eq','Customer')
    cy.get('table.job-table thead th').eq(4).invoke('text').invoke('trim').should('eq','Machine')
    cy.get('table.job-table thead th').eq(5).invoke('text').invoke('trim').should('eq','Colors')
    cy.get('table.job-table thead th').eq(6).invoke('text').invoke('trim').should('eq','QTY')
    cy.get('table.job-table thead th').eq(7).invoke('text').invoke('trim').should('eq','Alloc QTY')
    cy.get('table.job-table thead th').eq(8).invoke('text').invoke('trim').should('eq','U_QTY')
    cy.get('table.job-table thead th').eq(9).invoke('text').invoke('trim').should('eq','Job Date')
    cy.get('table.job-table thead th').eq(10).invoke('text').invoke('trim').should('eq','Delivery Date')
    cy.get('table.job-table thead th').eq(11).invoke('text').invoke('trim').should('eq','Optimal Date')
    cy.get('table.job-table thead th').eq(12).invoke('text').invoke('trim').should('eq','Actual Date')
    cy.get('table.job-table thead th').eq(13).invoke('text').invoke('trim').should('eq','Model')
    cy.get('table.job-table thead th').eq(14).invoke('text').invoke('trim').should('eq','Print Type')
    cy.get('table.job-table thead th').eq(15).invoke('text').invoke('trim').should('eq','MColors')
    cy.get('table.job-table thead th').eq(16).invoke('text').invoke('trim').should('eq','Days')
    cy.get('table.job-table thead th').eq(17).invoke('text').invoke('trim').should('eq','Slots')
    cy.get('table.job-table thead th').eq(18).invoke('text').invoke('trim').should('eq','Util%')
    cy.get('table.job-table thead th').eq(19).invoke('text').invoke('trim').should('eq','Pyramid Attach')


  })
  it('fill  the job no and click preview button then display table with records',()=>{
    cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00008758')
    cy.contains('button','Preview').should('be.visible').click()
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)

  })
  it('fill the job no ,diliverdate, production date input then dispay table with records',()=>{

     cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00008758')
     cy.get('input[type="date"]').eq(0).should('be.visible').type('2012-10-22')
     cy.get('input[type="date"]').eq(1).should('be.visible').type('2012-10-25')
     cy.contains('button','Preview').should('be.visible').click()
     cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)

  })
  
})