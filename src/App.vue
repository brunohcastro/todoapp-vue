<template>
  <div id="app">
    <todo-create-form></todo-create-form>
    <todo-empty-list v-if="hasTodo && !todos.length"></todo-empty-list>
    <b-list-group v-else style="margin: auto">
      <todo-list-item v-for="td in todos" :key="td.id" :todo="td"></todo-list-item>
    </b-list-group>
    <todo-list-toolbar v-if="hasTodo"></todo-list-toolbar>
  </div>
</template>

<script>
import TodoCreateForm from './components/TodoCreateForm.vue';
import TodoListItem from './components/TodoListItem.vue';
import TodoListToolbar from './components/TodoListToolbar.vue';
import TodoEmptyList from './components/TodoEmptyList.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    hasTodo() {
      return this.$store.state.viewModel.todoCount > 0;
    }
  },
  methods: mapActions(['fetchAll']),
  components: {
    TodoCreateForm,
    TodoListItem,
    TodoListToolbar,
    TodoEmptyList
  },
  created() {
    this.fetchAll();
  }
};
</script>

<style>
html,
body {
  height: 100%;
  background-color: #333 !important;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
}

a,
a:focus,
a:hover {
  color: #fff;
  outline: none;
}

.list-group-item {
  border-right: none !important;
  border-left: none !important;
}

.list-group-item:hover .btn {
  opacity: 1;
}

.dropdown-menu {
  border-radius: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
}

.todo-input {
  text-align: left;
  padding: 15px;
  line-height: 40px;
  margin: 0s;
  width: 390px;
  font-size: 21px;
  color: rgba(0, 0, 0, 0.8);
  word-break: break-word;
  display: inline-block;
  user-select: none;
  border: none;
  outline: none;
}

.dropdown-toggle {
  height: 30px;
  background: #777777;
  width: 60px;
  border-radius: 0 !important;
  color: #fff;
}

.dropdown-toggle:focus {
  box-shadow: none !important;
}
</style>
