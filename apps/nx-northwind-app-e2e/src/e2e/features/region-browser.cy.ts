describe('region browser', () => {
  beforeEach(() => cy.visit('/region'));

  it('should display welcome message', () => {
    cy.contains('h1', 'region-browser works!');
  });
});
