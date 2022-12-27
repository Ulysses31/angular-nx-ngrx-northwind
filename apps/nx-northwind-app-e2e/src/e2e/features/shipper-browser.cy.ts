describe('shipper browser', () => {
  beforeEach(() => cy.visit('/shipper'));

  it('should display welcome message', () => {
    cy.contains('h1', 'shipper-browser works!')
  });
});
