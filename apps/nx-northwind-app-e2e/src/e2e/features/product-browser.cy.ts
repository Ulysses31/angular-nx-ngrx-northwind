describe('product browser', () => {
  beforeEach(() => cy.visit('/product'));

  it('should display welcome message', () => {
    cy.contains('h1', 'product-browser works!')
  });
});
