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
    

  })
})