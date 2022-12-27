describe('order browser', () => {
  beforeEach(() => cy.visit('/order'));

  it('should display welcome message', () => {
    cy.contains('h1', 'order-browser works!')
  });
});
