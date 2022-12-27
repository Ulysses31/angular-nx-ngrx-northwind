describe('category browser', () => {
  beforeEach(() => cy.visit('/category'));

  it('should display welcome message', () => {
    cy.contains('h1', 'category-browser works!');
  });
});
