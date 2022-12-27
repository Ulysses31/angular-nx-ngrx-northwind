describe('region loader', () => {
  beforeEach(() => cy.visit('/region/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'region-loader works!');
  });
});
