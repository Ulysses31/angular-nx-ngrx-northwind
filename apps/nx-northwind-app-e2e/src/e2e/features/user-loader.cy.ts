describe('user loader', () => {
  beforeEach(() => cy.visit('/user/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'user-loader works!')
  });
});
