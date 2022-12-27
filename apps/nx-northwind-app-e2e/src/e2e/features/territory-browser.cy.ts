describe('territory browser', () => {
  beforeEach(() => cy.visit('/territory'));

  it('should display welcome message', () => {
    cy.contains('h1', 'territory-browser works!');
  });
});
