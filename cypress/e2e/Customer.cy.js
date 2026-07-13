describe('Customer page Navigation Test Suite', () => {

  beforeEach(() => {

    cy.login()
    cy.visit('https://devflexi.siyothsoft.com/jobs')

  })
  it('should open sidebar and navigate  to Customer dashboard',()=>{
     
    cy.get('.navbar__hamburger',{timeout: 10000}).click()
    cy.get('.sidebar').should('be.visible')
    cy.contains('Customer').should('be.visible')
    cy.contains('Customer').click()
    cy.contains('Manage Customers',{timeout:10000}).should('be.visible')

})
it('click view button then display table with records', () => {

  cy.visit('https://devflexi.siyothsoft.com/customers')

  const customers = [
    { id: 1, customerId: 'C001', code: 'CUS-001', name: 'Test Customer', priority: 'High' },
    { id: 2, customerId: 'C002', code: 'CUS-002', name: 'Another Customer', priority: 'Medium' }
  ]

  cy.intercept('GET', '/api/customers*', {
    statusCode: 200,
    body: customers
  }).as('getCustomers')

  cy.contains('button', 'View')
    .should('be.visible')
    .click()

  cy.wait('@getCustomers')

  cy.get('table.data-table', { timeout: 15000 })
    .should('be.visible')

  cy.get('table.data-table thead th').eq(0).should('have.text', 'Customer ID')
  cy.get('table.data-table thead th').eq(1).should('have.text', 'Code')
  cy.get('table.data-table thead th').eq(2).should('have.text', 'Name')
  cy.get('table.data-table thead th').eq(3).should('have.text', 'Priority')

  cy.get('table.data-table tbody tr').should('have.length', 2)

  cy.get('table.data-table tbody tr').eq(0).within(() => {
    cy.get('td').eq(0).should('contain', 'C001')
    cy.get('td').eq(1).should('contain', 'CUS-001')
    cy.get('td').eq(2).should('contain', 'Test Customer')
    cy.get('td').eq(3).should('contain', 'High')
  })

  cy.get('table.data-table tbody tr').eq(1).within(() => {
    cy.get('td').eq(0).should('contain', 'C002')
    cy.get('td').eq(1).should('contain', 'CUS-002')
    cy.get('td').eq(2).should('contain', 'Another Customer')
    cy.get('td').eq(3).should('contain', 'Medium')
  })
})
it('should display customer details when searching by code',()=>{
  cy.visit('https://devflexi.siyothsoft.com/customers')

  cy.intercept('GET', '/api/customers*', {
    statusCode: 200,
    body: [{ id: 1, customerId: 'C001', code: 'A00028', name: 'Test Customer', priority: 'High' }]
  }).as('searchCustomers')

  cy.get('input[name="code"]').first().type('A00028')
  cy.contains('button', 'View').should('be.visible').click()
  cy.wait('@searchCustomers')

  cy.get('table.data-table tbody tr').should('have.length', 1)
  

 
})

it('clcik add button then disply customer form check close button is working',()=>{

  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button', 'Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  cy.get('form.customer-form').within(() => {
    cy.get('button').last().click()
  })

  cy.get('form.customer-form').should('not.exist')
})
it('click add button then visible customer table',()=>{
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button','Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  
})
it('clcik add button when fill form  details ',()=>{
 cy.visit('https://devflexi.siyothsoft.com/customers')
 cy.contains('button','Add').should('be.visible').click()
 cy.get('form.customer-form').should('be.visible')
 cy.get('form.customer-form').find('input').eq(0).type('CUST-002', { force: true })
 cy.get('form.customer-form').find('input').eq(1).type('LOLC PVI LIMITED', { force: true })
 cy.get('form.customer-form select').first().select('4')

})

it('click view buutton then check table is visible with records',()=>{

cy.visit('https://devflexi.siyothsoft.com/customers')

  cy.contains('button', 'View').should('be.visible').click()
  cy.get('table.data-table tbody').should('have.length.greaterThan', 0)



})
it('fill input feild and click view button',()=>{
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.get('input[name="code"]').eq(0).type('A00029',{force:true})
  cy.get('input[name="name"]').eq(0).type('ANVERALLY & SONS (PVT) LTD',{force:true})
  cy.contains('button', 'View').click()
  cy.get('table.data-table').should('be.visible')
})
it('click reset button then input feild are reset',()=>{
   cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.get('input[name="code"]').eq(0).type('A00029',{force:true})
  cy.get('input[name="name"]').eq(0).type('ANVERALLY & SONS (PVT) LTD',{force:true})
  cy.contains('button', 'Reset').click()
  cy.get('input[name="code"]').eq(0).should('have.value', '')
  cy.get('input[name="name"]').eq(0).should('have.value', '')

})
it('click undo button then form input feild are reset',()=>{
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button', 'Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  cy.get('form.customer-form').find('input').eq(0).type('A00021', { force: true })
  cy.get('form.customer-form').find('input').eq(1).type('ALOKOZAY TEA INTERNATIONAL LTD-UAE', { force: true })
  cy.get('form.customer-form select').first().select('4')
  cy.contains('button', 'Undo').click()
  cy.get('form.customer-form').find('input').eq(0).should('have.value', '')
   cy.get('form.customer-form').find('input').eq(1).should('have.value', '')
  cy.get('form.customer-form select').first().invoke('val', '').trigger('change')
  

})

it('clcik the close button then from is closed',()=>{
  cy.on('uncaught:exception', () => false)
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button', 'Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  cy.get('form.customer-form').find('input').eq(0).type('A00021', { force: true })
  cy.get('form.customer-form').find('input').eq(1).type('ALOKOZAY TEA INTERNATIONAL LTD-UAE', { force: true })
  cy.get('form.customer-form select').first().select('3')
  cy.contains('button', 'Close').should('be.visible').click()
  cy.get('form.customer-form').should('not.exist')
 })
 it('click x icon then close form',()=>{
  cy.on('uncaught:exception', () => false)
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button', 'Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  cy.get('form.customer-form').find('input').eq(0).type('A00021', { force: true })
  cy.get('form.customer-form').find('input').eq(1).type('ALOKOZAY TEA INTERNATIONAL LTD-UAE', { force: true })
  cy.get('form.customer-form select').first().select('2')
  cy.get('.modal__close').click()
  cy.get('form.customer-form').should('not.exist')
 })


 

  it('check Next button is working',()=>{
    cy.visit('https://devflexi.siyothsoft.com/customers')

    cy.contains('button', 'View').should('be.visible').click()


    cy.get('table.data-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
    cy.contains('button', 'Next').should('not.be.disabled').click()
    
    cy.get('table.data-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })
  it('check Previous button is working',()=>{
   cy.visit('https://devflexi.siyothsoft.com/customers')

    cy.contains('button', 'View').should('be.visible').click()
    cy.get('table.data-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
    cy.contains('button', 'Next').click()
    cy.contains('button', 'Prev').should('be.visible').and('not.be.disabled').click()
    cy.get('table.data-table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
 })
 it('click add button then fill form details and click save button',()=>{
  cy.on('uncaught:exception', () => false)
  cy.visit('https://devflexi.siyothsoft.com/customers')
  cy.contains('button', 'Add').should('be.visible').click()
  cy.get('form.customer-form').should('be.visible')
  cy.get('form.customer-form').find('input').eq(0).type('A00051', { force: true })
  cy.get('form.customer-form').find('input').eq(1).type('ALOKOZAY TEA INTERNATIONAL LTD-UAE', { force: true })
  cy.get('form.customer-form select').first().select('1')
  cy.intercept('POST', '**/customer**', {
    statusCode: 200,
    body: { message: 'Customer created successfully' }
  }).as('saveCustomer')
  cy.contains('button', 'Save').should('be.visible').click()
  cy.wait('@saveCustomer').then((interception) => {
    expect(interception.response.statusCode).to.eq(200)
  })


 })


})