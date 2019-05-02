import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filter: '',
    loading: false,
    editing: null,
    showMenu: false,
    viewModel: {
      todoCount: 0,
      pendingTodosCount: 0,
      completedTodosCount: 0,
      todos: []
    }
  },
  mutations: {
    LOAD_TODOS(state, payload) {
      state.viewModel = payload;
    },
    ADD_TODO(state, todo) {
      state.viewModel.todos.push(todo);

      state.viewModel.pendingTodosCount++;
      state.viewModel.todoCount++;
    },
    UPDATE_TODO(state, todo) {
      state.viewModel.todos = state.viewModel.todos.map(it => (it.id === todo.id ? todo : it));
    },
    REMOVE_TODO(state, id) {
      const todo = state.viewModel.todos.find(it => it.id === id);

      if (todo.completed) {
        state.viewModel.completedTodosCount--;
      } else {
        state.viewModel.pendingTodosCount--;
      }

      state.viewModel.todoCount--;
      state.viewModel.todos = state.viewModel.todos.filter(it => it.id !== id);
    },
    CLEAR_TODOS(state) {
      state.viewModel = {
        todoCount: 0,
        pendingTodosCount: 0,
        completedTodosCount: 0,
        todos: []
      };
    },
    EDIT_TODO(state, payload) {
      const todo = state.viewModel.todos.find(it => it.id === payload);

      state.editing = { ...todo };
    },
    CLEAR_COMPLETED_TODOS(state) {
      state.viewModel.todoCount = state.viewModel.todoCount - state.viewModel.completedTodosCount;
      state.viewModel.completedTodosCount = 0;
      state.viewModel.todos = state.viewModel.todos.filter(it => !it.completed);
    },
    TOGGLE_ALL_TODOS(state) {
      if (state.viewModel.todoCount === 0) {
        return;
      }

      if (state.viewModel.todoCount !== state.viewModel.completedTodosCount) {
        state.viewModel.completedTodosCount = state.viewModel.todoCount;
        state.viewModel.pendingTodosCount = 0;
        state.viewModel.todos = state.viewModel.todos.map(it => ({ ...it, completed: true }));
      } else {
        state.viewModel.completedTodosCount = 0;
        state.viewModel.pendingTodosCount = state.viewModel.todoCount;
        state.viewModel.todos = state.viewModel.todos.map(it => ({ ...it, completed: false }));
      }
    },
    TOGGLE_TODO_STATUS(state, payload) {
      const todo = state.viewModel.todos.find(it => it.id === payload);

      if (todo.completed) {
        state.viewModel.completedTodosCount--;
        state.viewModel.pendingTodosCount++;
      } else {
        state.viewModel.completedTodosCount++;
        state.viewModel.pendingTodosCount--;
      }

      state.viewModel.todos = state.viewModel.todos.map(it =>
        it.id === payload ? { ...it, completed: !it.completed } : it
      );
    },
    SET_FILTER(state, payload) {
      state.filter = payload;
    }
  },
  actions: {
    async fetchAll({ commit }) {
      const { data } = await Axios.get('/todos');

      commit('LOAD_TODOS', data);
    },

    async toggleCompletedFilter({ commit, state }) {
      if (state.filter === 'completed') {
        commit('SET_FILTER', '');
        return;
      }

      commit('SET_FILTER', 'completed');
    },

    async togglePendingFilter({ commit, state }) {
      if (state.filter === 'pending') {
        commit('SET_FILTER', '');
        return;
      }

      commit('SET_FILTER', 'pending');
    },

    async save({ commit }, todo) {
      const { data } = await Axios.post('/todos', { description: todo });

      commit('ADD_TODO', data);
    },

    async edit({ commit }, id) {
      commit('EDIT_TODO', id);
    },

    async cancelEdit({ commit }) {
      commit('EDIT_TODO', null);
    },

    async updateDescription({ commit }, todo) {
      try {
        await Axios.patch(`/todos/${todo.id}`, { description: todo.description });
        commit('UPDATE_TODO', todo);
        commit('EDIT_TODO', null);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteTodo({ commit }, id) {
      try {
        await Axios.delete(`/todos/${id}`);

        commit('REMOVE_TODO', id);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteAll({ commit }) {
      try {
        await Axios.delete(`/todos`);

        commit('CLEAR_TODOS');
      } catch (err) {
        console.error(err);
      }
    },

    async deleteCompleted({ commit }) {
      try {
        await Axios.delete(`/todos/completed`);

        commit('CLEAR_COMPLETED_TODOS');
      } catch (err) {
        console.error(err);
      }
    },

    async toggleAllStatus({ commit }) {
      try {
        await Axios.patch(`/todos/toggle-all`);

        commit('TOGGLE_ALL_TODOS');
      } catch (err) {
        console.error(err);
      }
    },

    async toggleStatus({ commit }, id) {
      try {
        await Axios.patch(`/todos/${id}/toggle`);

        commit('TOGGLE_TODO_STATUS', id);
      } catch (err) {
        console.error(err);
      }
    }
  },
  getters: {
    todos(state) {
      if (state.filter === '') {
        return state.viewModel.todos;
      } else if (state.filter === 'completed') {
        return state.viewModel.todos.filter(it => it.completed);
      } else if (state.filter === 'pending') {
        return state.viewModel.todos.filter(it => !it.completed);
      }
    }
  }
});
