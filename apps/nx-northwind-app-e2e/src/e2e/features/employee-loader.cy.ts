describe('employee loader', () => {
  beforeEach(() => cy.visit('/employee/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'employee-loader works!')
  });
});
