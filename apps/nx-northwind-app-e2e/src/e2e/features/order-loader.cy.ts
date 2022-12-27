describe('order loader', () => {
  beforeEach(() => cy.visit('/order/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'order-loader works!');
  });
});
