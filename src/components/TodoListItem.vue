<template>
  <ListItem>
    <template v-if="isEditing(todo.id)">
      <form style="display: flex" @submit.prevent="update()">
        <flat-button variant="warning" @click="cancelEdit">
          <span class="material-icons">close</span>
        </flat-button>
        <input
          type="text"
          v-model="editing.description"
          @keydown="cancelEditOnEsc($event)"
          class="todo-input"
          v-focus
          required
        >
        <save-button type="submit" variant="success">
          <span class="material-icons">check</span>
        </save-button>
      </form>
    </template>
    <template v-else>
      <toggle-status-wrapper>
        <p-check
          :data-cy="'todo-state-' + todo.id"
          name="check"
          color="success"
          class="p-svg p-curve"
          :checked="todo.completed"
          @change="toggleStatus(todo.id)"
        >
          <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
            <path
              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
              style="stroke: white;fill:white"
            ></path>
          </svg>
        </p-check>
      </toggle-status-wrapper>
      <todo-content
        :data-cy="'todo-content-' + todo.id"
        :completed="todo.completed"
        @dblclick.native="edit(todo.id)"
      >{{ todo.description }}</todo-content>
      <delete-button :data-cy="'remove-todo-' + todo.id" variant="danger" @click="deleteTodo(todo.id)">
        <span class="material-icons">delete</span>
      </delete-button>
    </template>
  </ListItem>
</template>

<script>
import ListItem from './styled/ListItem';
import DeleteButton from './styled/DeleteButton';
import FlatButton from './styled/FlatButton';
import SaveButton from './styled/SaveButton';
import TodoContent from './styled/TodoContent';
import ToggleStatusWrapper from './styled/ToggleStatusWrapper';
import Vue from 'vue';
import { mapActions } from 'vuex';

export default {
  name: 'TodoListItem',
  props: {
    todo: {
      required: true
    }
  },
  computed: {
    editing() {
      return this.$store.state.editing;
    }
  },
  methods: {
    ...mapActions(['deleteTodo', 'toggleStatus', 'edit', 'cancelEdit', 'updateDescription']),
    isEditing(id) {
      return this.$store.state.editing && this.$store.state.editing.id === id;
    },
    cancelEditOnEsc(event) {
      if (event.keyCode === 27) {
        this.cancelEdit();
      }
    },
    update() {
      if (this.editing.description === '') {
        return;
      }

      this.updateDescription(this.editing);
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        Vue.nextTick(() => el.focus());
      }
    }
  },
  components: {
    ToggleStatusWrapper,
    ListItem,
    TodoContent,
    DeleteButton,
    FlatButton,
    SaveButton
  }
};
</script>

<style>
.todo-content {
  text-align: left;
  padding: 15px;
  line-height: 40px;
  margin: 0s;
  width: 390px;
  font-size: 21px;
  word-break: break-word;
  display: inline-block;
  user-select: none;
}
</style>
