
const cardData = [
    {
        image: '/src/assets/images/politoBiblio.jpeg',
        title: 'Discover the New Biblio',
        description: 'Explore the vast resources and modern spaces of our newly opened library at Politecnico di Torino. A hub of knowledge and innovation.',
    },
    {
        image: '/src/assets/images/politoView.jpg',
        title: 'Experience the Campus Life',
        description: 'Immerse yourself in the vibrant campus life at Politecnico di Torino. Engage with diverse cultures and cutting-edge technology.',
    },
];

describe('Landing Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('should display the welcome message', () => {
        cy.get('h1').should('contain', 'Welcome @ Politecnico di Torino');
    });

    it('should display two cards', () => {
        cy.get('.MuiCard-root').should('have.length', 2);
    });

    it('should display card titles and descriptions', () => {
        cy.get('.MuiCard-root').each((card, index) => {
            cy.wrap(card).within(() => {
                // Use specific class or other selectors for better accuracy
                cy.get('h4').should('contain', cardData[index].title);
                cy.get('Typography').should('contain', cardData[index].description); // Adjust the selector accordingly
            });
        });
    });

});
