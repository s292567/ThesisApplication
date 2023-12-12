describe('Login Page', () => {
    it('should log in successfully as a student with valid credentials', () => {
        cy.visit('http://localhost:5173');
        cy.get('button').contains('Login').click();
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
         cy.wait(10000);

        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn', // Adjust the URL based on Okta's authentication API
            body: {
                username: 's634020@example.com',
                password: 'Test.634020',
            },
        });
        cy.wait('@oktaLogin');
        cy.wait(6000);
     //   cy.visit('http://localhost:5173/myApplications')
      //  cy.wait(1000);

    });



    it('should log in successfully as a professor with valid credentials', () => {
        cy.visit('http://localhost:5173');

        cy.get('button').contains('Login').click();
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
        cy.wait(8000);
        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn', // Adjust the URL based on Okta's authentication API
            body: {
                username: 'p101@example.com',
                password: 'Test.101',
            },
        });

        cy.wait('@oktaLogin');
        cy.visit('http://localhost:5173/professorDashboard');
    });

    it('should show an error message with invalid credentials', () => {
        cy.visit('http://localhost:5173');

        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
        cy.get('button').contains('Login').click();
        cy.wait(6000);
        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn', // Adjust the URL based on Okta's authentication API
            failOnStatusCode: false,
            body: {
                username: 's634020@example.com',
                password: 'Test.634020',
            },
            }).then((response) => {

            if (response.status !== 200) {

                cy.get('.okta-form-infobox-error').should('be.visible').contains('Unable to sign in');
            }
        });
        cy.wait('@oktaLogin');

    });
    });