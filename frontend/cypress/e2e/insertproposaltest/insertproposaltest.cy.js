describe('Insert Proposal', () => {

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
        cy.get('button').contains('+Thesis').click()
    })

    it('create a new proposal', () => {

        cy.get('#title').type('Test Proposal')
        cy.get('#coSupervisors').type('Giovanna Ruben')
        cy.get('#keywords').type('AI ') // test that the keywords are added when typing space behind them
        cy.get('#type').type('Research')
        cy.get('#groups').type('G32')
        cy.get('#description').type('Test description')
        cy.get('#requiredKnowledge').type('Test knowledge')
        cy.get('#notes').type('Test notes')
        cy.get('#expiration').type('2024-04-30')
        cy.get('#level').type('MSc')
        cy.get('#cds').type('Computer Engineer')

        cy.get('button').contains('Submit').click()

        cy.get('.MuiAlert-message').should('not.be.visible')

    })

    it('submit proposal form without title', () => {

        cy.get('#title').type('Test Proposal')
        cy.get('#coSupervisors').type('Giovanna Ruben')
        cy.get('#keywords').type('AI,') // test that the keywords are added when typing space behind them
        cy.get('#type').type('Research')
        cy.get('#groups').type('G32')
        cy.get('#description').type('Test description')
        cy.get('#requiredKnowledge').type('Test knowledge')
        cy.get('#notes').type('Test notes')
        cy.get('#expiration').type('2024-04-30')
        cy.get('#level').type('MSc')
        cy.get('#cds').type('Computer Engineer')

        cy.get('button').contains('Submit').click()

        cy.get('.MuiAlert-message').should('be.visible')
    })
})