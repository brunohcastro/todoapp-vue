describe('New Todo', function() {
  beforeEach(function() {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/todos',
      response: {
        todoCount: 0,
        pendingTodosCount: 0,
        completedTodosCount: 0,
        todos: []
      }
    });

    cy.route({
      method: 'POST',
      url: '/api/todos',
      response: {
        id: 1,
        description: 'New TODO',
        completed: false
      }
    });
  });

  it('should cancel input on esc', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=todo-input]').type('New TODO{esc}');

    cy.get('[data-cy=todo-input]').should('have.value', '');

    cy.get('[data-cy=todo-content-1]').should('not.exist');
  });

  it('should send todo data pressing enter', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=todo-input]').type('New TODO{enter}');

    cy.get('[data-cy=todo-content-1]').should('contain', 'New TODO');

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').should('not.be.checked');
  });

  it('should send todo data pressing the add button', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=todo-input]').type('New TODO');

    cy.get('[data-cy=add-todo]').click();

    cy.get('[data-cy=todo-content-1]').should('contain', 'New TODO');

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').should('not.be.checked');
  });
});
