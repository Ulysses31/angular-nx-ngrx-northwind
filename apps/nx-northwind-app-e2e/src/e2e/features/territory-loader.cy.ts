describe('territory loader', () => {
  beforeEach(() => cy.visit('/territory/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'territory-loader works!')
  });
});
