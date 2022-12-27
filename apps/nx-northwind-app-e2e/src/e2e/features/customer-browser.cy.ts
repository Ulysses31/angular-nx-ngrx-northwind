describe('customer browser', () => {
  beforeEach(() => cy.visit('/customer'));

  it('should display welcome message', () => {
    cy.contains('h1', 'customer-browser works!')
  });
});
