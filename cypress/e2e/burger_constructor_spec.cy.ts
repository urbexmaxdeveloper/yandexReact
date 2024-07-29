// cypress/integration/constructor.spec.ts
describe('checking the functionality of the constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json',
    });

    cy.visit('/');
  });

  it('should render the constructor page correctly', () => {
    cy.contains('Булки');
  });

  it('should open the modal with a certain ingredient', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0943');
    cy.get('[data-cy="modal-content"]').should('contain', 'Соус фирменный Space Sauce');
  });

  it('should close the modal by click', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0943');
    cy.get('[data-cy="close"]').click();
    cy.contains('Калории').should('not.exist');
  });

  it('should open the page with ingredient and information about him', () => {
    cy.visit('/ingredients/643d69a5c3f7b9001cfa093d');
    cy.contains('Флюоресцентная булка R2-D3');
  });

  it('testing drag and drop', () => {
    const dataTransfer = new DataTransfer();

    // Constructor renders correctly
    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('@constructor').should('exist').and('contain', 'Выберите начинку');
    cy.get('[data-cy="total-price"]').as('total-price').should('have.text', '0');
    cy.contains('Оформить заказ').should('be.disabled');

    // Drag and drop bun
    cy.contains('Флюоресцентная булка R2-D3').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3').and('exist');
    cy.get('@total-price').should('exist').and('have.text', '1976');

    // Drag and drop some ingredient
    cy.contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.contains('Соус фирменный Space Sauce').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.contains('Соус традиционный галактический').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@total-price').should('exist').and('have.text', '3059');

    // Create order
    cy.contains('Оформить заказ').should('be.enabled').click();
    cy.get('[data-cy="order-details"]').should('exist');
    cy.contains('47772');
  });
});
