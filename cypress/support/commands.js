// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// cypress/support/commands.js

Cypress.Commands.add('loginToOkta', (username, password) => {
    Cypress.log({
        displayName: 'OKTA LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        autoEnd: false,
    });

    // Use cy.request to authenticate with Okta
    cy.request({
        method: 'POST',
        url: 'https://dev-59214398.okta.com/api/v1/authn',
        body: {
            username,
            password,
        },
    }).then((response) => {
        // Ensure the authentication was successful
        expect(response.status).to.eq(200);

        // Extract the authentication token from the response
        const authToken = response.body.sessionToken;

        // Use the obtained token to perform further actions, for example, set it in a cookie
        cy.setCookie('oktaAuthToken', authToken);

        // Perform additional checks or actions if needed
        cy.get('[data-test="sidenav-username"]').should('contain', username);

        // End the Cypress log
        Cypress.log({ displayName: 'OKTA LOGIN', message: [`✅ Authenticated | ${username}`] });
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })