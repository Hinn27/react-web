describe('ReFood E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should load home page successfully', () => {
        cy.contains('ReFood').should('be.visible')
        cy.contains('Kết nối yêu thương').should('be.visible')
    })

    it('should navigate to menu page', () => {
        cy.get('a[href="/menu"]').click()
        cy.url().should('include', '/menu')
    })

    it('should navigate to login page', () => {
        cy.get('a[href="/login"]').click()
        cy.url().should('include', '/login')
    })

    it('should display meal cards on menu page', () => {
        cy.visit('/menu')
        cy.get('[data-testid="meal-card"]').should('have.length.greaterThan', 0)
    })

    it('should add item to cart', () => {
        cy.visit('/menu')
        cy.get('[data-testid="add-to-cart"]').first().click()
        cy.get('[data-testid="cart-badge"]').should('contain', '1')
    })

    it('should navigate to cart page', () => {
        cy.get('[data-testid="cart-icon"]').click()
        cy.url().should('include', '/cart')
    })
})
