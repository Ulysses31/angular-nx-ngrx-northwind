describe('user browser', () => {
  beforeEach(() => cy.visit('/user'));

  it('should display welcome message', () => {
    cy.contains('h1', 'user-browser works!')
  });
});
