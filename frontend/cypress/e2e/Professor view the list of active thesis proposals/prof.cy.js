// thesesPage.spec.js

describe('ThesesPage', () => {
    beforeEach(() => {
        // Visit the login page and log in
        cy.visit('http://localhost:5173');

        // Click on the login button
        cy.get('button').contains('Login').click();

        // Intercept the Okta login request
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');

        // Wait for the Okta login form to load (adjust the wait time as needed)
        cy.wait(8000);

        // Send a POST request to Okta to log in with valid credentials
        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn',
            body: {
                username: 'p101@example.com',
                password: 'Test.101',
            },
        });

        // Wait for the Okta login request to complete
        cy.wait('@oktaLogin');

        // Visit the professor dashboard
        cy.visit('http://localhost:5173/professorDashboard/thesisList/');
    });

    it('displays the list of theses', () => {
        // Make assertions about the initial state of the component
        cy.get('.section-title').should('have.text', 'Theses: '); //This verifies that the correct title is displayed on the page.
        cy.get('.searchbar').should('exist'); // It ensures that the page includes a search functionality.
        cy.get('.sorting-toolbar').should('exist'); // It ensures that the page includes a toolbar for sorting the list of theses.
        cy.get('.theses-list').should('exist'); // It verifies the presence of the main component displaying the theses.
    });



    it('allows creating a new thesis (for Professor role)', () => {
        // Click on the "Add" button
        cy.get('.add-thesis-button').click();

    });

});
