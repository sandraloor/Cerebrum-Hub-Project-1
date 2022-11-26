beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
//Workshop #8 add visual tests for registration form 3
/*
Task list:
* Create first test suite for visual tests
* Create tests to verify visual parts of the page:
    * radio button and its content
    * dropdown and dependencies between 2 dropdowns
    * checkbox, its content and link in it
    * email format
 */

describe('Section 1: Visual tests', ()=> {
    it('Check radio buttons and their content', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        // Check radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Click radio buttons
        cy.get('input[type="radio"]').eq(0).click().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    it('Check dropdown and dependencies between 2 dropdowns', () => {
        // Check empty and disabled dropdown items
        cy.get('[id="country"]').select('')
        cy.get('[id="city"]').should('be.disabled')

        // Check Spain dropdown and dependencies between cities dropdown
        cy.get('[id="country"]').select('object:3')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').children().eq(0).should('have.text', '')        
        cy.get('[id="city"]').should('have.text','MalagaMadridValenciaCorralejo')
        
        // Check Estonia dropdown and dependencies between cities dropdown
        cy.get('[id="country"]').select('object:4')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').children().eq(0).should('have.text', '')
        cy.get('[id="city"]').should('have.text','TallinnHaapsaluTartu')
        
        // Check Austria dropdown and dependencies between cities dropdown
        cy.get('[id="country"]').select('object:5')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').children().eq(0).should('have.text', '')
        cy.get('[id="city"]').should('have.text','ViennaSalzburgInnsbruck')        
    });

    it('Check checkbox, its content and link in it', () => {
        cy.get(':nth-child(15) > :nth-child(2)').click().should('be.checked')
        cy.get(':nth-child(15) > :nth-child(2)').next().should('have.text', 'Accept our cookie policy')
        cy.get(':nth-child(15) > :nth-child(2)').next().click()
        
        // Check that correct URL opens
        cy.url().should('contain', 'cookiePolicy.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back on registration form 3')        
    });

    it('Check email format', () => {
        // Check correct email address
        cy.get('input[name="email"]').type('name.surname@email.com')

        // Check that the wrong email alert is hidden
        cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')

        // Clear the email field
        cy.get('input[name="email"]').clear().type('  ')
        
        // Check incorrect email address
        cy.get('input[name="email"]').type('kalamaja')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible')
    });
})

//Workshop #9 add functional tests for registration form 3
/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (use function)
    * If city is already chosen and country is updated, then city choice should be removed
    * Bonus task: add file (google yourself for solution)
* Rename file registration_form_3_test.cy.js to contain your name - JohnSmith_form_3_test.cy.js and upload your individual result to  team confluence
 */

describe('Second test suite for registration form 3', () => {
    // Check that all fields are filled in + validation
    it('Check that all fields are filled', () => {
        // Fill the name field
        cy.get('#name').clear().type('Name Surname')
        
        // Fill the email field
        cy.get('.email').type('email.email@email.com')

        // Check the drop-down menu for Spain
        cy.get('#country').select("Spain")
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city>option').eq(0).should('have.text', '')
        cy.get('#city>option').eq(1).should('have.text', 'Malaga')
        cy.get('#city>option').eq(2).should('have.text', 'Madrid')
        cy.get('#city>option').eq(3).should('have.text', 'Valencia')
        cy.get('#city>option').eq(4).should('have.text', 'Corralejo')

        // Check the drop-down menu for Estonia
        cy.get('#country').select("Estonia")
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city>option').eq(0).should('have.text', '')
        cy.get('#city>option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city>option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city>option').eq(3).should('have.text', 'Tartu')

        // Check the drop-down menu for Austria
        cy.get('#country').select("Austria")
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city>option').eq(0).should('have.text', '')
        cy.get('#city>option').eq(1).should('have.text', 'Vienna')
        cy.get('#city>option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city>option').eq(3).should('have.text', 'Innsbruck')

        // Check selecting Spain dropdown and a city
        cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3')
        cy.get('#city').select('Malaga')

        // Fill the 'Date of birth' field
        cy.get(':nth-child(8) > input').type('2022-11-05')

        // Check the radio buttons of newsletter frequency
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Click radio buttons
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')

        // Fill the 'Birthday' field
        cy.get('#birthday').type('2022-11-05')

        // Check the privacy policy check-box
        cy.get(':nth-child(15) > .ng-pristine').click().should('be.checked')

        // Check the cookie policy check-box
        cy.get(':nth-child(15) > :nth-child(2)').click().should('be.checked')

        // Assert that submit button submits the form
        cy.get(':nth-child(2) > input').should('be.enabled')
        cy.get(':nth-child(2) > input').click()
 
        // Go back to previous page
        cy.go('back')
        cy.log('Back on registration form 3')
    });

    it('Check that only mandatory fields are filled in', () => {       
        // Fill the email field
        cy.get('.email').type('email.email@email.com')

        // Check selecting Spain dropdown and a city
        cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3')
        cy.get('#city').select('Malaga')

        // Check the privacy policy check-box
        cy.get(':nth-child(15) > .ng-pristine').click().should('be.checked')

        // Assert that submit button submits the form
        cy.get(':nth-child(2) > input').should('be.enabled')
        cy.get(':nth-child(2) > input').click()

        // Go back to previous page
        cy.go('back')
        cy.log('Back on registration form 3')
    });

    // Check that mandatory fields are absent + validations using function
    it('Check that submit button is disabled when email field is empty', () => {
    
            inputValidData()
    
        cy.get('.email').clear()
        cy.get(':nth-child(2) > input').should('be.disabled')
    });

   it('Check that submit button is disabled when country is not selected', () => {
   
            inputValidData()
    
        cy.get('[id="country"]').select('')
        cy.get(':nth-child(2) > input').should('be.disabled')        
    });

    it('Check that submit button is disabled when city is not selected', () => {
   
        inputValidData()

        cy.get('#city').select('')
        cy.get(':nth-child(2) > input').should('be.disabled')        
    });

    it('Check that submit button is disabled when accept privacy policy is not checked', () => {
   
        inputValidData()

        cy.get(':nth-child(15) > .ng-not-empty').click()
        cy.get(':nth-child(2) > input').should('be.disabled')        
    });

    // If city is already chosen and country is updated, then city choice should be removed
    it('Check that previously chosen city is removed when country is updated', () => {
        cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3')
        cy.get('#city').select('Malaga')
        cy.get('#country').select('Estonia').invoke('val').should('eq', 'object:4')
        cy.get('#city').should('not.have.value')
    });

    // Bonus task: add file
    it('Upload a file', () => {
        cy.get('#myFile').click().selectFile('/Users/Sandra/Downloads/TXT - Sample File.txt')
        cy.get('.w3-container > [type="submit"]').click()
    });

});

function inputValidData() {
    cy.get('.email').type('name.surname@email.com')
    cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3')
    cy.get('#city').select('Malaga')
    cy.get(':nth-child(15) > .ng-pristine').click().should('be.checked')

}
