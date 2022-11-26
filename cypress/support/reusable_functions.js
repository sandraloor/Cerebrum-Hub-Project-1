export function applicationFormWithInvalidUsername(username, tooltip, numberOfInvalidFields) {
    // Checking form validation without making actions on form
    cy.get('#applicationForm').then(
        ($form) => expect($form[0].checkValidity()).to.be.false,
    )
    cy.get('#applicationForm :invalid').should('have.length', `${numberOfInvalidFields}`)

    // Checking tooltip with invalid data
    cy.get('#username').clear().type(`${username}`)
    cy.get('h2').contains('Password').click()
    cy.get('input[name="username"]:invalid').invoke('prop', 'validationMessage').should('equal', `${tooltip}`)
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    inputPasswords('MyPassword', 'MyPassword')
}

export function inputPasswords(input, confirmation) {
    cy.get('input[name="password"]').type(`${input}`)
    cy.get('[name="confirm"]').type(`${confirmation}`)
}

export function inputValidData2() {
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
    // cy.get('[id="confirm"]').type('password{enter}')
}