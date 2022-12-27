describe('customer loader', () => {
  beforeEach(() => cy.visit('/customer/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'customer-loader works!')
  });
});
