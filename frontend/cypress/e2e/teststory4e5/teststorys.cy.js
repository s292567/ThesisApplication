describe("Professor Applicants Page", () => {
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
                cy.visit('http://localhost:5173//professorDashboard/applicantsList');
                cy.get('button').contains('+applicants').click()
            });

        });

    it("displays the section title", () => {
        cy.get("h3").should("contain.text", "Applicants Page:");
    });
        it('should show a list of theses when "View by Thesis" button is clicked', () => {
            // Click the "View by Thesis" button
            cy.get('.MuiToggleButton-root:contains("View by Thesis")').click();
            cy.get('.thesis-list').should('exist');
        });
        it('should show a list of students when "View by student" button is clicked', () => {
            // Click the "View by student" button
            cy.get('.MuiToggleButton-root:contains("View by student")').click();
            cy.get('..thesis-list').should('exist');

        });
        it('displays the list of theses fetched from the API', () => {
            // Intercept the getAllApplicationsForLoggedInStudent API call and stub the response
            cy.intercept('GET', '/api/API_applications.js', { fixture: 'proposals.json' }).as('getAllApplicationsDataForProfessor');
            cy.visit('http://localhost:5173/professorDashboard/applicantsList');

            // Wait for the API call to complete
            cy.wait('@getAllApplicationsDataForProfessor');

            // Make assertions about the displayed data
            cy.get('.theses-list').find('.thesis-item').should('have.length', 2);
            // Additional assertions based on the API response or rendered UI
        });
        it('should open the table with the correct structure when counter button is clicked', () => {
            cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-10.MuiGrid-grid-sm-10.MuiGrid-grid-md-10.MuiGrid-grid-lg-8.MuiGrid-grid-xl-6.css-udczfz-MuiGrid-root')
                .as('containers')
                .each(($container, index) => {
                    cy.wrap($container)
                        .find('.MuiIconButton-root.MuiIconButton-sizeLarge')
                        .click()
                    cy.get(`.MuiTableRow-root:nth-child(${index + 1})`)
                        .should('exist')
                        .find('.MuiTableCell-root')
                        .should('have.length', 4)
                        .eq(0)
                        .should('have.text', 'Student Name')// Adjust based on your actual header text
                        .should('have.text', 'Student email')
                        .should('have.text', 'Student degree')
                        .should('have.text', 'status');
                    cy.get(`.MuiTableRow-root:nth-child(${index + 1})`)
                        .should('exist')
                        .find('.MuiTableCell-root')
                        .should('have.length.gt', 0) // Ensure there is at least one <td> element
                        .last()
                        .should('exist')
                        .find('.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium')
                        .should('have.length', 2);
                });
            it('should have "accept" button in the last td for Status', () => {
                cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-10.MuiGrid-grid-sm-10.MuiGrid-grid-md-10.MuiGrid-grid-lg-8.MuiGrid-grid-xl-6.css-udczfz-MuiGrid-root')
                    .as('containers')
                    .each(($container, index) => {

                        cy.wrap($container)
                            .find('.MuiIconButton-root.MuiIconButton-sizeLarge')
                            .click();


                        cy.get(`.MuiTableRow-root:nth-child(${index + 1})`) // Assuming the index corresponds to the container
                            .should('exist')
                            .find('.MuiTableCell-root') // Assuming this is the selector for table cells
                            .last()
                            .should('exist')
                            .find('.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium')
                            .contains('accept')
                            .should('exist');
                    });
            });


            it('should have "decline" button in the last td for Status', () => {
                cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-10.MuiGrid-grid-sm-10.MuiGrid-grid-md-10.MuiGrid-grid-lg-8.MuiGrid-grid-xl-6.css-udczfz-MuiGrid-root')
                    .as('containers')
                    .each(($container, index) => {
                        cy.wrap($container)
                            .find('.MuiIconButton-root.MuiIconButton-sizeLarge')
                            .click();
                        cy.get(`.MuiTableRow-root:nth-child(${index + 1})`) // Assuming the index corresponds to the container
                            .should('exist')
                            .find('.MuiTableCell-root') // Assuming this is the selector for table cells
                            .last()
                            .should('exist')
                            .find('.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium')
                            .contains('decline')
                            .should('exist');
                    });
                });

            });

