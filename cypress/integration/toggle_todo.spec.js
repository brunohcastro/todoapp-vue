describe('New Todo', function() {
  beforeEach(function() {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/todos',
      response: {
        todoCount: 3,
        pendingTodosCount: 2,
        completedTodosCount: 1,
        todos: [
          {
            id: 1,
            description: 'New TODO 1',
            completed: false
          },
          {
            id: 2,
            description: 'New TODO 2',
            completed: false
          },
          {
            id: 3,
            description: 'New TODO 3',
            completed: true
          }
        ]
      }
    });

    cy.route({
      method: 'PATCH',
      url: '/api/todos/*/toggle',
      response: {}
    });

    cy.route({
      method: 'PATCH',
      url: '/api/todos/toggle-all',
      response: {}
    });
  });

  it('should toggle todo on checkbox click', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').click();

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').should('be.checked');

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').click();

    cy.get('[data-cy=todo-state-1] > input[type=checkbox]').should('not.be.checked');
  });

  it('should toggle all todos', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=toggle-all]').click();

    cy.get('[data-cy|=todo-state] > input[type=checkbox]').should('be.checked');

    cy.get('[data-cy=toggle-all]').click();

    cy.get('[data-cy|=todo-state] > input[type=checkbox]').should('not.be.checked');
  });
});
