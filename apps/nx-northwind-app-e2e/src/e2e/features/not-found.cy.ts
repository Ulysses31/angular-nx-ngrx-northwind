describe('not-found browser', () => {
  beforeEach(() => cy.visit('/not-found'));

  it('should display welcome message', () => {
    cy.contains('h1', 'not-found works!')
  });
});
