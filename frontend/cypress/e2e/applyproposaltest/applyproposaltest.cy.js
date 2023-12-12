describe('Apply Proposal', () => {

    beforeEach(() => {
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
        cy.visit('http://localhost:5173/myApplications')
        cy.wait(1000);
    })

    it('successfully apply for thesis proposal as a student', () => {
        cy.visit('http://localhost:5173/studentDashboard/thesisList/')
        cy.wait(1000)

        // get the first proposal in the list
        cy.get('.MuiPaper-root').first()
        // find the view button
        cy.get('button').contains('View').click()
        cy.wait(1000)

        cy.get('button').contains('apply').click()
        cy.wait(1000)

        cy.get('button').contains('yes').click()
        cy.wait(1000)

        // make sure the apply button changes to applied
        cy.get('button').contains('applied').should('be.visible')
    })

    it('open the proposal details try to apply but cancel process by pressing no on request to apply', () => {
        cy.visit('http://localhost:5173/studentDashboard/thesisList/')
        cy.wait(1000)

        // get the first proposal in the list
        cy.get('.MuiPaper-root').first()
        // find the view button
        cy.get('button').contains('View').click()
        cy.wait(1000)

        cy.get('button').contains('apply').click()
        cy.wait(1000)

        cy.get('button').contains('no').click()
        cy.wait(1000)

        // make sure the apply button did not change
        cy.get('button').contains('apply').should('be.visible')
        cy.get('button').contains('applied').should('not.be.visible')
    })
})