import {insertProposal, getAllProposals} from "../../../src/api/API_proposals.js";
describe('ThesesPage API Tests', () => {
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

    it('displays the list of theses fetched from the API', () => {
        // Intercept the getAllProposals API call and stub the response
        cy.intercept('GET', '/api/proposals', { fixture: 'proposals.json' }).as('getAllProposals');

        // Visit the ThesesPage
        cy.visit('http://localhost:5173/professorDashboard/thesisList/');

        // Wait for the API call to complete
        cy.wait('@getAllProposals');

        // Make assertions about the displayed data
        cy.get('.theses-list').find('.thesis-item').should('have.length', 3);
        // Additional assertions based on the API response or rendered UI
    });

    it('creates a new thesis through the API', () => {
        // Intercept the insertProposal API call and stub the response
        cy.intercept('POST', '/api/proposals', { fixture: 'newProposalResponse.json' }).as('insertProposal');

        // Visit the ThesesPage
        cy.visit('http://localhost:5173/professorDashboard/thesisList/');

        // Click on the "Add" button
        cy.get('.add-thesis-button').click();

        // Fill out the form
        cy.get('#thesisTitle').type('New Thesis Title');
        cy.get('#thesisDescription').type('Description of the new thesis');
        // ...

        // Submit the form
        cy.get('.submit-thesis-button').click();

        // Wait for the API call to complete
        cy.wait('@insertProposal');

        // Make assertions about the updated state or handle response validation
        // ...
    });

    it('deletes a thesis through the API', () => {
        // Intercept the deleteProposalById API call and stub the response
        cy.intercept('DELETE', '/api/proposals/*', { statusCode: 204 }).as('deleteProposal');

        // Visit the ThesesPage
        cy.visit('http://localhost:5173/professorDashboard/thesisList/');

        // Click on the delete button of a thesis
        cy.get('.delete-thesis-button').first().click();

        // Confirm the deletion

        cy.wait('@deleteProposal');

    });


});
