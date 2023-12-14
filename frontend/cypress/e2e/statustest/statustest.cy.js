
describe('Application', () => {
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
        cy.visit('http://localhost:5173/myApplications')
        cy.get('button').contains('+applications').click()
    })


    beforeEach(() => {
        cy.visit('http://localhost:5173/myApplications');
    });

    it('should render Myapplication with a header', () => {
        cy.get("h3").should("contain", "My applications:");
    });



    it('should render order by', () => {
        cy.get("b").should("contain", "order by:");
    });



    it('should display  titles and status', () => {
        cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-o4ra2u-MuiPaper-root')
        .as('MuiPaperContainer');

        cy.get('@MuiPaperContainer').contains('h5', 'Title').should('exist');
        cy.get('@MuiPaperContainer').contains('h5', 'Status').should('exist');

    });

    it('should display  titles and status', () => {

        // get the first proposal in the list
        cy.get('.MuiPaper-root').first()
        cy.get('button').contains('View').click()
    });



    it('should display  buttons ', () => {
    cy.get('.MuiButton-root')
        .should('exist')
        .and('have.class', 'MuiButton-textPrimary')
        .and('have.attr', 'type', 'button')
        .and('have.attr', 'tabindex', '0')
        .and('contain', 'Title')
        .and('contain', 'EXPIRATIONS')
        .and('contain', 'KEYWORDS')

    });



    it('should sort the list based on the title on button click', () => {
        cy.get('.MuiButton-root').click();
        cy.get('.MuiTypography-h6').invoke('text').then((titles) => {
            const sortedTitles = titles.split('\n').filter(title => title.trim() !== '').sort();
            expect(titles.trim()).to.equal(sortedTitles.join('\n').trim());
        });
    });

    it('should sort the list in reverse order on the second button click', () => {
        cy.get('.MuiButton-root').click().click();
        cy.get('.MuiTypography-h6').invoke('text').then((titles) => {
            const reversedTitles = titles.split('\n').filter(title => title.trim() !== '').sort().reverse();
            expect(titles.trim()).to.equal(reversedTitles.join('\n').trim());
        });
    });

    it('should sort the list in ascending order based on expiration on button click', () => {
        // Click the expiration button to sort the list
        cy.get('.MuiButton-root:contains("Expiration")').click();

        // Verify the list is sorted in ascending order based on expiration
        cy.get('.expiration-selector').invoke('text').then((expirations) => {
            const sortedExpirations = expirations.split('\n').filter(expiration => expiration.trim() !== '').sort();
            expect(expirations.trim()).to.equal(sortedExpirations.join('\n').trim());
        });
    });

    it('should sort the list in reverse order on the second "Expiration" button click', () => {
        // Click the "Expiration" button twice to reverse the order
        cy.get('.MuiButton-root:contains("Expiration")').click({ multiple: true }).click({ multiple: true });

        // Extract and verify the expirations in descending order
        cy.get('.expiration-selector').invoke('text').then((expirations) => {
            const reversedExpirations = expirations.split('\n').filter(expiration => expiration.trim() !== '').sort().reverse();
            expect(expirations.trim()).to.equal(reversedExpirations.join('\n').trim());
        });
    });

    it('should sort the list in ascending order based on keywords on button click', () => {
        cy.get('.MuiButton-root:contains("KEYWORDS")').click();
        cy.get('.keywords-selector').invoke('text').then((keywords) => {
            const sortedKeywords = keywords.split('\n').filter(keyword => keyword.trim() !== '').sort();
            expect(keywords.trim()).to.equal(sortedKeywords.join('\n').trim());
        });
    });

    it('should sort the list in reverse order on the second "KEYWORDS" button click', () => {
        cy.get('.MuiButton-root:contains("KEYWORDS")').click({ multiple: true }).click({ multiple: true });
        cy.get('.keywords-selector').invoke('text').then((keywords) => {
            const reversedKeywords = keywords.split('\n').filter(keyword => keyword.trim() !== '').sort().reverse();
            expect(keywords.trim()).to.equal(reversedKeywords.join('\n').trim());
        });
    });
    it('displays the list of theses fetched from the API', () => {
        // Intercept the getAllApplicationsForLoggedInStudent API call and stub the response
        cy.intercept('GET', '/api/API_applications.js', { fixture: 'proposals.json' }).as('getAllApplicationsForLoggedInStudent');
        cy.visit('http://localhost:5173/myApplications');

        // Wait for the API call to complete
        cy.wait('@getAllApplicationsForLoggedInStudent');

        // Make assertions about the displayed data
        cy.get('.theses-list').find('.thesis-item').should('have.length', 3);
        // Additional assertions based on the API response or rendered UI
    });

    it('should display titles and statuses in each container', () => {
        // Get all MuiPaper containers
        cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-o4ra2u-MuiPaper-root')
            .as('MuiPaperContainers')
            .each(($container) => {
                cy.wrap($container).contains('h5', 'Title').should('exist');
                cy.wrap($container).contains('h5', 'Status').should('exist');
            });
    });
    it('should open the table with the correct number of rows and columns when button is clicked', () => {
        // Get all containers
        cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-10.MuiGrid-grid-sm-10.MuiGrid-grid-md-10.MuiGrid-grid-lg-8.MuiGrid-grid-xl-6.css-udczfz-MuiGrid-root')
            .as('containers')
            .each(($container, index) => {
                cy.wrap($container)
                    .find('.MuiIconButton-root.MuiIconButton-sizeLarge')
                    .click();
                cy.get(`.MuiTableRow-root:nth-child(${index + 1})`) // Assuming the index corresponds to the container
                    .should('exist')
                    .find('.MuiTableCell-root') // Assuming this is the selector for table cells
                    .should('have.length', 4); // Adjust the expected number based on your actual number of columns
            });
});
});
