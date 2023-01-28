<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { classBody } from '@babel/types';

export default {
  name: 'ModalWindow',

  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['closeModal'],

  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>
<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  z-index: 2;

  &__content {
    margin: auto;
    background-color: rgb(220, 215, 232);
    min-height: 400px;
    min-width: 200px;
    border-radius: 10px;

    @include onTablet {
      min-width: 400px;
    }
  }
}

.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
</style>
