describe('employee browser', () => {
  beforeEach(() => cy.visit('/employee'));

  it('should display welcome message', () => {
    cy.contains('h1', 'employee-browser works!')
  });
});
