describe('order-detail loader', () => {
  beforeEach(() => cy.visit('/order-detail/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'order-detail-loader works!');
  });
});
