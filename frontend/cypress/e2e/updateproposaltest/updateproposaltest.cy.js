describe('Update Proposal', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173');
        cy.get('button').contains('Login').click();
        cy.intercept('POST', 'https://dev-59214398.okta.com/**').as('oktaLogin');
        cy.wait(10000);

        cy.request({
            method: 'POST',
            url: 'https://dev-59214398.okta.com/api/v1/authn', // Adjust the URL based on Okta's authentication API
            body: {
                username: 'p101@example.com',
                password: 'Test.101',
            },
        });
        cy.wait('@oktaLogin');
        cy.wait(6000);

        // visit the proposal creation page
        cy.visit('http://localhost:5173/professorDashboard')

        // click on the theses button
        cy.get('text').contains('Theses').click()

    })

    it('update a proposal', () => {

        // get the first proposal in the list
        cy.get('.MuiPaper-root').first()
        // find the stack
        cy.get('.MuiStack-root')
        cy.wait(1000)

        // get the box with the update and delete buttons and get the first (update) button
        cy.get('.MuiBox-root').first().click()
        cy.wait(1000)

        // change title
        cy.get('textarea')
            .contains('name')
            .clear()

        cy.get('textarea')
            .contains('name')
            .type('Test Proposal')

        // submit changes
        cy.get('button').contains('Submit').click()
    })
})