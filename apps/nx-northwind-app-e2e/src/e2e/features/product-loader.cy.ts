describe('product loader', () => {
  beforeEach(() => cy.visit('/product/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'product-loader works!')
  });
});
