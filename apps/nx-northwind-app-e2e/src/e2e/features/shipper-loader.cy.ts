describe('shipper loader', () => {
  beforeEach(() => cy.visit('/shipper/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'shipper-loader works!')
  });
});
