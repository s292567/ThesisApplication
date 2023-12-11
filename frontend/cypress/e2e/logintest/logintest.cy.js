describe('Login Page', () => {
    it('should log in successfully with valid credentials', () => {
        cy.visit('http://localhost:5173');

        cy.get('button').contains('Login').click();
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
        cy.wait(6000);
        cy.get('#email',{ timeout: 10000 }).type('p101@example.com');
        cy.get('#password').type('Test.101');
        cy.get('button').contains('sign in').click();

        // Wait for the Okta login request to complete
        cy.wait('@oktaLogin');
        cy.visit('http://localhost:5173/professorDashboard');
        cy.visit('http://localhost:5173/studentDashboard');
    });

    it('should show an error message with invalid credentials', () => {
        cy.visit('http://localhost:5173');


        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
        cy.get('button').contains('Login').click();
        cy.wait(6000);
        // Fill in invalid username and password
        cy.get('#email').type('invalid@example.com');
        cy.get('#password').type('invalidpassword');
        cy.get('button').contains('sign in').click();
        // Wait for the Okta login request to complete
        cy.wait('@oktaLogin');

        // Ensure that an error message is displayed
        cy.get('.MuiAlert-message').should('be.visible');
    });
});

