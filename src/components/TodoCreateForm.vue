<template>
  <form @submit.prevent="create()" class="form-wrapper">
    <b-input-group>
      <b-input-group-prepend>
        <flat-button variant="default" @click="toggleAllStatus">
          <span :style="{color: hasPendingColor}" class="material-icons">done_all</span>
        </flat-button>
      </b-input-group-prepend>
      <input v-model="todo" @keydown="cancelCreateOnEsc($event)" class="todo-input">
      <b-input-group-append>
        <flat-button type="submit" variant="primary" style="width: 60px">
          <span class="material-icons">add</span>
        </flat-button>
      </b-input-group-append>
    </b-input-group>
  </form>
</template>

<script>
import FlatButton from './styled/FlatButton.js';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      todo: ''
    };
  },
  computed: {
    hasPendingColor() {
      const allCompleted =
        this.$store.state.viewModel.todoCount != 0 &&
        this.$store.state.viewModel.todoCount === this.$store.state.viewModel.completedTodosCount;

      return allCompleted ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.2)';
    }
  },
  methods: {
    ...mapActions(['toggleAllStatus', 'save']),
    create() {
      if (this.todo == '') {
        return;
      }

      this.save(this.todo);
      this.todo = '';
    },
    cancelCreateOnEsc(event) {
      if (event.keyCode === 27) {
        this.todo = '';
      }
    }
  },
  components: {
    FlatButton
  }
};
</script>

<style>
.form-wrapper {
  display: flex !important;
  align-items: center;
  border-radius: 0 !important;
  text-align: left;
  padding: 0 !important;
  margin: 0 !important;
  position: relative;
  border-right: none;
  background: #fff;
  border-left: none;
}
</style>
