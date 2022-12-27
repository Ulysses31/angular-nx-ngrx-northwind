describe('supplier loader', () => {
  beforeEach(() => cy.visit('/supplier/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'supplier-loader works!')
  });
});
