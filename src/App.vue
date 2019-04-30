<template>
  <div id="app">
    <b-input-group>
      <b-input-group-prepend>
        <b-button @click="toggleAllStatus">Toggle All</b-button>
      </b-input-group-prepend>
      <input v-model="todo" @keydown="cancelCreateOnEsc($event)" class="form-control">
      <b-input-group-append>
        <b-button @click="create()">Criar</b-button>
      </b-input-group-append>
    </b-input-group>
    <br>
    <b-button-group>
      <b-button @click="filterCompleted">Filter Completed</b-button>
      <b-button @click="filterPending">Filter Pending</b-button>
      <b-button @click="clearFilter">Clear Filter</b-button>
      <b-button @click="deleteAll">Delete All</b-button>
    </b-button-group>
    <br>
    <br>
    <b-list-group style="width: 500px; margin: auto">
      <b-list-group-item v-for="td in todos" :key="td.id">
        <b-input-group v-if="isEditing(td.id)">
          <b-input-group-prepend>
            <b-button @click="cancelEdit()">X</b-button>
          </b-input-group-prepend>
          <input @keydown="cancelEditOnEsc($event)" v-model="editing.description">
          <b-input-group-append>
            <b-button @click="updateDescription(editing)">Atualizar</b-button>
          </b-input-group-append>
        </b-input-group>
        <template v-else>
          <b-button @click="toggleStatus(td.id)">Toggle</b-button>
          <span v-if="td.completed">V</span>
          <span v-else>X</span>
          <span @dblclick="edit(td.id)">{{ td.description }}</span> &nbsp;
          <delete-button @click="deleteTodo(td.id)">Delete</delete-button>
        </template>
      </b-list-group-item>
    </b-list-group>
    <pre style="text-align: left">{{viewModel}}</pre>
  </div>
</template>

<script>
import DeleteButton from './components/styled/DeleteButton';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      todo: ''
    };
  },
  computed: {
    viewModel() {
      return JSON.stringify(this.$store.state.viewModel, null, 2);
    },
    todos() {
      return this.$store.getters.todos;
    },
    editing() {
      return this.$store.state.editing;
    }
  },
  methods: {
    ...mapActions([
      'fetchAll',
      'save',
      'edit',
      'cancelEdit',
      'filterCompleted',
      'filterPending',
      'clearFilter',
      'deleteAll',
      'toggleAllStatus',
      'toggleStatus',
      'deleteTodo',
      'updateDescription'
    ]),
    create() {
      this.save(this.todo);
      this.todo = '';
    },
    isEditing(id) {
      return this.$store.state.editing && this.$store.state.editing.id === id;
    },
    cancelEditOnEsc(event) {
      if (event.keyCode === 27) {
        this.cancelEdit();
      }
    },
    cancelCreateOnEsc(event) {
      if (event.keyCode === 27) {
        this.todo = '';
      }
    }
  },
  components: {
    DeleteButton
  },
  created() {
    this.fetchAll();
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 600px;
  margin: 60px auto;
}
</style>
