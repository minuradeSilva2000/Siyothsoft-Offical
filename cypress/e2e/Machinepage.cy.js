describe('Machine Module Test Suite', () => {

  beforeEach(() => {

    cy.login()
    cy.visit('https://devflexi.siyothsoft.com/jobs')

  })
   it('should open sidebar and navigate to Machine dashboard', () => {

    cy.get('.navbar__hamburger', { timeout: 10000 }).click()

    cy.get('.sidebar').should('be.visible')

    cy.contains('Machine').should('be.visible')

    cy.contains('Machine').click()

    cy.contains('Machine View', { timeout: 10000 }).should('be.visible')

  })
  it('click the view button and check details are visible', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.contains('button', 'View').should('be.visible').click()

    cy.get('table.data-table', { timeout: 10000 }).should('be.visible')

    cy.contains('Machine Id').should('exist').and('be.visible')
  })
  it('check input fields are working fill input fields then click view button', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.get('input.input').first().type('M1')

    cy.contains('button', 'View').should('be.visible').click()

  })
  it('give values all input fields and click view button', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.get('input.input').first().type('M1')

    cy.get('select.form-select').eq(0).should('be.visible').select('G')

    cy.contains('button', 'View').should('be.visible').click()
  })
  it('give values all input fields and click view button with different values', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.get('input.input').first().type('P3')

    cy.get('select.form-select').eq(0).should('be.visible').select('Y')

    cy.contains('button', 'View').should('be.visible').click()
  })
 

    it('give input value input fields then click view button and after click reset button', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.get('input.input').type('FB1')

    cy.get('select.form-select').should('be.visible').select('G')

    cy.contains('button', 'View').should('be.visible').click()

    cy.contains('button', 'Reset').should('be.visible').click()

    cy.get('input.input').should('have.value', '')

    cy.get('select.form-select').should('have.value', '')
    cy.get('table.data-table tbody tr').should('have.length', 1)

  })

   it('click next button then navigate next page', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.intercept('/api/machines*', {
      statusCode: 200,
      body: { data: [{ id:1 , machineId: 'M1', code: 'M1', colors: 4, model: 'G' }, { id: 2, machineId: 'M2', code: 'M2', colors: 2, model: 'F' }], recordsTotal: 15, recordsFiltered: 15, totalPages: 2, page: 1, limit: 10 }
    }).as('machinesApi')

    cy.contains('button', 'View').click()

    cy.wait('@machinesApi', { timeout: 10000 })

    cy.contains('button', 'Next', { timeout: 10000 }).should('be.visible').click()
    cy.get('table.data-table tbody tr').should('have.length', 2)
    cy.contains('M1').should('be.visible')
    cy.contains('M2').should('be.visible')
  
  })
   it('click previous button then navigate previous page', () => {
    cy.visit('https://devflexi.siyothsoft.com/machines')
    cy.intercept('/api/machines*', {
      statusCode: 200,
      body: { data: [{ id: 1, machineId: 'M1', code: 'M1', colors: 4, model: 'G' }, { id: 2, machineId: 'M2', code: 'M2', colors: 2, model: 'F' }], recordsTotal: 15, recordsFiltered: 15, totalPages: 2, page: 1, limit: 10 }
    }).as('machinesApi')
    cy.contains('button', 'View').click()
    cy.wait('@machinesApi', { timeout: 10000 })
    cy.contains('button', 'Next', { timeout: 10000 }).should('be.visible').click()
    cy.contains('button', 'Prev', { timeout: 10000 }).should('be.visible').click()
  })
    it('fill one input field', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.get('select.form-select').should('be.visible').select('G')

    cy.contains('button', 'View').should('be.visible').click()

    cy.get('table.data-table', { timeout: 10000 }).should('be.visible')

    cy.contains('Model').should('exist').and('be.visible')

  })
   it('click the add button check form should be visible', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')

    cy.contains('button', 'Add').should('be.visible').click()

    cy.get('form.machine-detail__form').should('be.visible')

  })
   it('check the input fields are working fill input fields and click cancel button', () => {

    cy.visit('https://devflexi.siyothsoft.com/machines')
    cy.contains('button', 'Add').should('be.visible').click()
    cy.get('form.machine-detail__form').should('be.visible')
    cy.get('form.machine-detail__form input').first().type('M7')
    cy.get('form.machine-detail__form select.form-select').eq(0).select('10', { force: true })
    cy.get('form.machine-detail__form select.form-select').eq(1).select('12', { force: true })
    cy.get('form.machine-detail__form select.form-select').eq(2).select('D2', { force: true })
    cy.contains('button', 'Close').should('be.visible').click()
  })
 
})