import { inputValidData2 } from "../support/reusable_functions"

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #6 create following tests:

describe('Section 1: Functional tests', () => {
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('[data-testid="user"]').type('UserName')
        cy.get('[name="email"]').type('aurevoir@ipanema.ee')
        cy.get('[data-cy="name"]').type('FirstName')
        cy.get('[data-testid="lastNameTestId"]').type('LastName')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')

        // User clicks outside of the form
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('[id="success_message"]').should('be.visible')
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('[data-testid="user"]').type('UserName')
        cy.get('[name="email"]').type('aurevoir@ipanema.ee')
        cy.get('[data-cy="name"]').type('FirstName')
        cy.get('[data-testid="lastNameTestId"]').type('LastName')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')
        cy.get('[id="htmlFavLanguage"]').check()
        cy.get('[id="cssFavLanguage"]').check()
        cy.get('[id="javascriptFavLanguage"]').check()
        cy.get('[id="phpFavLanguage"]').check()
        cy.get('[id="vehicle1"]').check()
        cy.get('[id="vehicle2"]').check()
        cy.get('[id="vehicle3"]').check()
        cy.get('[id="cars"]').select('volvo')
        cy.get('[id="cars"]').select('saab')
        cy.get('[id="cars"]').select('opel')
        cy.get('[id="cars"]').select('audi')
        cy.get('[id="animal"]').select('dog')
        cy.get('[id="animal"]').select('cat')
        cy.get('[id="animal"]').select('snake')
        cy.get('[id="animal"]').select('hippo')
        cy.get('[id="animal"]').select('spider')
        cy.get('[id="animal"]').select('mouse')
        cy.get('[id="password"]').type('password')
        cy.get('[id="confirm"]').type('password{enter}')

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('[id="success_message"]').should('be.visible')
    })

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get('[data-testid="user"]').type('UserName')
        cy.get('[name="email"]').type('aurevoir@ipanema.ee')
        cy.get('[data-cy="name"]').type('FirstName')
        cy.get('[data-testid="lastNameTestId"]').type('LastName')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')

        // Type confirmation password which is different from first password
        cy.get('[id="password"]').type('password')
        cy.get('[id="confirm"]').type('password123')

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('[id="success_message"]').should('not.be.visible')

        // Assert that error message is visible
        cy.get('[id="password_error_message"]').should('be.visible')

    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData2()

        // Add steps for emptying username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear().type('  ')

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    //Add more similar tests for checking other mandatory field's absence

    it('Check that submit button cannot be selected if email is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData2()

        // Add steps for emptying email input field
        cy.get('[name="email"]').scrollIntoView()
        cy.get('[name="email"]').clear().type('  ')

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    it('Check that submit button cannot be selected if first name is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData2()

        // Add steps for emptying first name input field
        cy.get('[data-cy="name"]').scrollIntoView()
        cy.get('[data-cy="name"]').clear().type('  ')

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    it('Check that submit button cannot be selected if last name is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData2()

        // Add steps for emptying last name input field
        cy.get('[data-testid="lastNameTestId"]').scrollIntoView()
        cy.get('[data-testid="lastNameTestId"]').clear().type('  ')

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    it('Check that submit button cannot be selected if phone number is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData2()

        // Add steps for emptying phone number input field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear().type('  ')

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })
})

// Workshop #7 create more visual tests

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // identical call to the previous one:
        cy.get('#logo').should('have.attr', 'src', 'cerebrum_hub_logo.png')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
        // identical call to the previous one:
        cy.get('img').should('have.attr', 'height').and('equal', '166')
    })

    // Create similar test for checking second picture
    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // identical call to the previous one:
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src', 'cypress_logo.png')
        // get element and check its parameter height, to be equal 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)
        // identical call to the previous one:
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'height').and('equal', '88')
    })


    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain', '/registration_form_1.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that URL to Cerebrum Hub page is correct and clickable', () => {
        //Create similar test for checking second link to Cerebrum Hub homepage
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain', '/registration_form_1.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array has total of 4 elements
        cy.get('input[type="radio"]').should('have.length', 4)
        /*
        .next() is needed because of HTML structure:
        <input type="radio" id="htmlFavLanguage" name="fav_language" value="HTML">
        <label for="htmlFavLanguage">HTML</label><br>
         */
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it.only('Check that checkbox list is correct', () => {
        // Array has totally 3 elements
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('#vehicle1').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('#vehicle2').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('#vehicle3').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // Selecting one will remove selection from other checkbox
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        // Don't forget to delete files and comment back if not using
        // cy.get('#cars').select(1).screenshot('Cars drop-down')
        // cy.screenshot('Full page screenshot')

        // Different solutions how get array length of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        // Create test similar to previous one

    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    // To get multiple classes user .class1.class2 selector
    cy.get('#confirm').type('MyPass')
    cy.get('[name="confirm"]').type('InvalidMyPass')
    cy.get('h2').contains('Password').click()
}

