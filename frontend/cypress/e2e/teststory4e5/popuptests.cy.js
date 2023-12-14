describe('Pop-up Test Suite', () => {
    beforeEach(() => {
        // Visit the login page and log in
        cy.visit('http://localhost:5173');

        // Click on the login button
        cy.get('button').contains('Login').click();

        // Intercept the Okta login request
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');


        cy.wait(8000);

        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn',
            body: {
                username: 'p101@example.com',
                password: 'Test.101',
            },
        });
        cy.visit('http://localhost:5173//professorDashboard/applicantsList');
        cy.get('button').contains('+applicants').click()
    });

    it('should display the pop-up with warning message and buttons', () => {
        cy.get('#warning-modal').should('be.visible');

        cy.get('#warning-modal .MuiTypography-root').should('contain.text', 'Warning!');
        cy.get('#warning-modal .MuiSvgIcon-root[data-testid="WarningRoundedIcon"]').should('be.visible');

        cy.get('#warning-modal button:contains("Yes")').should('be.visible');
        cy.get('#warning-modal button:contains("No")').should('be.visible');
    });

    it('should open the modal when accepting the application', () => {
        cy.intercept('POST', '/api/API_applications.js').as('acceptApplication');

        cy.get('.css-i3e2hc-MuiButtonBase-root-MuiButton-root:contains("accept")').click();
        cy.get('#warning-modal').should('be.visible');

        cy.get('#warning-modal button:contains("Yes")').click();

        cy.wait('@acceptApplication').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get('#warning-modal').should('not.exist');
        });
    });

    it('should open the modal when declining the application', () => {
        cy.intercept('POST', '/api/API_applications.js').as('declineApplication');

        cy.get('.css-1q75ooe-MuiButtonBase-root-MuiButton-root:contains("decline")').click();
        cy.get('#warning-modal').should('be.visible');

        cy.get('#warning-modal button:contains("No")').click();

        cy.wait('@declineApplication').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get('#warning-modal').should('not.exist');
        });
    });
});
