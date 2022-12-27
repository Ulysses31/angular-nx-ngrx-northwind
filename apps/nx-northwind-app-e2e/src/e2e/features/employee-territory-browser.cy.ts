describe('employee-territory browser', () => {
  beforeEach(() => cy.visit('/employee-territory'));

  it('should display welcome message', () => {
    cy.contains('h1', 'employee-territory-browser works!');
  });
});
