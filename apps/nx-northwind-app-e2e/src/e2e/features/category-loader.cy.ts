describe('category loader', () => {
  beforeEach(() => cy.visit('/category/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'category-loader works!')
  });
});
