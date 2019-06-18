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
      method: 'DELETE',
      url: '/api/todos/*',
      response: {}
    });

    cy.route({
      method: 'DELETE',
      url: '/api/todos',
      response: {}
    });

    cy.route({
      method: 'DELETE',
      url: '/api/todos/completed',
      response: {}
    });
  });

  it('should remove specific todo', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=remove-todo-1]').click();

    cy.get('[data-cy=todo-content-1]').should('not.exist');
  });

  it('should remove all completed todos', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=toolbar-menu]').click();

    cy.get('[data-cy=remove-completed]').click();

    cy.get('[data-cy=todo-content-3]').should('not.exist');
  });

  it('should remove all todos', function() {
    cy.visit('http://localhost:8080');

    cy.get('[data-cy=toolbar-menu]').click();

    cy.get('[data-cy=remove-all]').click();

    cy.get('[data-cy|=todo-content]').should('not.exist');
  });

});
