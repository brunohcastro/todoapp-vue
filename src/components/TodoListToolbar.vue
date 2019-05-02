<template>
  <toolbar>
    <todo-counter>
      <template v-if="pendingTodoCount === 0">Nenhuma tarefa pendente</template>
      <template v-else-if="pendingTodoCount === 1">1 tarefa pendente</template>
      <template v-else>{{pendingTodoCount}} tarefas pendentes</template>
    </todo-counter>
    <b-dropdown id="dropdown-1" style="float: right" right>
      <b-dropdown-item
        @click="toggleCompletedFilter"
        :active="filter === 'completed'"
        :disabled="isFilterDisabled('completed')"
      >Completos</b-dropdown-item>
      <b-dropdown-item
        @click="togglePendingFilter"
        :active="filter === 'pending'"
        :disabled="isFilterDisabled('pending')"
      >Pendentes</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item
        @click="deleteCompleted"
        :disabled="completedTodoCount === 0"
      >Apagar Completos</b-dropdown-item>
      <b-dropdown-item @click="deleteAll">Apagar Todos</b-dropdown-item>
    </b-dropdown>
  </toolbar>
</template>

<script>
import Toolbar from './styled/Toolbar';
import TodoCounter from './styled/TodoCounter';

import { mapActions } from 'vuex';

export default {
  name: 'todo-list-toolbar',
  computed: {
    pendingTodoCount() {
      return this.$store.state.viewModel.pendingTodosCount;
    },
    completedTodoCount() {
      return this.$store.state.viewModel.completedTodosCount;
    },
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    ...mapActions(['toggleCompletedFilter', 'togglePendingFilter', 'deleteAll', 'deleteCompleted']),
    isFilterDisabled(filterToCheck) {
      return this[`${filterToCheck}TodoCount`] === 0 && this.filter !== filterToCheck;
    }
  },
  components: {
    Toolbar,
    TodoCounter
  }
};
</script>

