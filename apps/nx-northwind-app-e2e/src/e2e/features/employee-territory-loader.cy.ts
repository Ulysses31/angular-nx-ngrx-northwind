describe('employee-territory loader', () => {
  beforeEach(() => cy.visit('/employee-territory/1'));

  it('should display welcome message', () => {
    cy.contains('h1', 'employee-territory-loader works!')
  });
});
