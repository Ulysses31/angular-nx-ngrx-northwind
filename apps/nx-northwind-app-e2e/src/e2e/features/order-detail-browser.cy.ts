describe('order-detail browser', () => {
  beforeEach(() => cy.visit('/order-detail'));

  it('should display welcome message', () => {
    cy.contains('h1', 'order-detail-browser works!');
  });
});
