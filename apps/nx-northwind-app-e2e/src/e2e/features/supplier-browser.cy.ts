describe('supplier browser', () => {
  beforeEach(() => cy.visit('/supplier'));

  it('should display welcome message', () => {
    cy.contains('h1', 'supplier-browser works!')
  });
});
