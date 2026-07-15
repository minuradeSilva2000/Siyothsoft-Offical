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

   it('verify allocate button are working',()=>{
    cy.intercept('POST', '/api/job-plan/preview*', {
      statusCode: 200,
      body: [{jobNo:'MO00052281',description:'LEMON TEA ENV - MD20 ENV',customer:'STASSEN NATURAL FOODS (PVT) LTD',machine:'M5',colors:5,Qty:77250,allocQty:77250,uQty:0,jobDate:'2016-12-23',deliveryDate:'2016-12-23',optimalDate:'2016-12-22',actualDate:null,model:'G',printType:'MD20.ENV',mColors:8,days:0.1,slots:10,util:0,pyramidAttach:0}]
    }).as('previewData')
    cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00052281')
    cy.contains('button','Preview').should('be.visible').click()
    cy.wait('@previewData')
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)
    cy.get('.btn-allocate',{timeout:10000}).should('be.visible')
  })
   it('verify  next button are working then navigate next page',()=>{
    cy.intercept('POST', '/api/job-plan/preview*', {
      statusCode: 200,
      body: Array.from({length: 25}, (_, i) => ({
        jobNo:`MO000${8758+i}`,description:`Test Job ${i}`,customer:'Test Customer',machine:'M5',colors:2,Qty:100,allocQty:50,uQty:50,
        jobDate:'2026-01-01',deliveryDate:'2026-07-01',optimalDate:'2026-06-01',actualDate:null,model:'G',printType:'Screen',mColors:2,days:5,slots:10,util:80.5,pyramidAttach:0
      }))
    }).as('previewData')
    cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00008758')
    cy.contains('button','Preview').should('be.visible').click()
    cy.wait('@previewData')
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)
    cy.get('[class*="next"], [aria-label="Next"], [class*="pagination"] > *:last-child').should('be.visible').click()
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)

  })
  it('verify  Previous button are working then navigate Previous page',()=>{
    cy.intercept('POST', '/api/job-plan/preview*', {
      statusCode: 200,
      body: Array.from({length: 25}, (_, i) => ({
        jobNo:`MO000${8758+i}`,description:`Test Job ${i}`,customer:'Test Customer',machine:'M5',colors:2,Qty:100,allocQty:50,uQty:50,
        jobDate:'2026-01-01',deliveryDate:'2026-07-01',optimalDate:'2026-06-01',actualDate:null,model:'G',printType:'Screen',mColors:2,days:5,slots:10,util:80.5,pyramidAttach:0
      }))
    }).as('previewData')
    cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00008758')
    cy.contains('button','Preview').should('be.visible').click()
    cy.wait('@previewData')
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)
    cy.get('[class*="next"], [aria-label="Next"], [class*="pagination"] > *:last-child').should('be.visible').click()
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)
     cy.get('[class*="previous"], [aria-label="Previous"], [class*="pagination"] > *:first-child').should('be.visible').click()
    cy.get('table.job-table tbody tr',{timeout:15000}).should('have.length.greaterThan',0)

  })
  it('verify click the reset button then clear all input feils',()=>{

     cy.get('input[placeholder="Enter job no"]').should('be.visible').type('MO00008758')
     cy.get('input[type="date"]').eq(0).should('be.visible').type('2012-10-22')
     cy.get('input[type="date"]').eq(1).should('be.visible').type('2012-10-25')
     cy.contains('button','Reset').should('be.visible').click()
     cy.get('input[placeholder="Enter job no"]').should('have.value','')
     cy.get('input[type="date"]').eq(0).should('have.value','')
     cy.get('input[type="date"]').eq(1).should('have.value','')
  })
  it('verify click the Go to Jobs button then navigate to jobs page',()=>{
     cy.contains('button','Go to Jobs').should('be.visible').click()
     cy.url().should('include','/jobs')
  })
  
})