<template lang="">
  <div class="app-wrapper">
    <ModalWindow :is-modal-open="storeUsers.isModalOpen">
      <UserForm @close-modal="handleOpenModal" />
    </ModalWindow>
    <ModalWindow :is-modal-open="storeEvents.isModalOpen">
      <EventForm @close-modal="handleOpenEventModal" />
    </ModalWindow>
    <header class="header">
      <router-link to="/"><img src="@/assets/main_logo.svg" alt="main_logo" class="header__logo" /></router-link>
    </header>

    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import PaginationBlock from './components/PaginationBlock.vue';
import UsersTable from './components/UsersTable.vue';
import OptionsBlock from './components/OptionsBlock.vue';
import ModalWindow from './components/ModalWindow.vue';
import UserForm from './components/UserForm.vue';
import Loader from './components/UI/Loader.vue';
import EventForm from './components/EventForm.vue';

import { getUsersLimit } from './api/usersApi';
import { onMounted, onUpdated } from 'vue';

import { useUsersStore } from './stores/users';
import { useEventsStore } from  './stores/events' ;

import router from './router';

export default {
  name: 'App',

  components: {
    ModalWindow: ModalWindow,
    UserForm: UserForm,
    EventForm: EventForm,
  },

  methods: {
    handleOpenModal() {
      this.storeUsers.isModalOpen = !this.storeUsers.isModalOpen;
      console.log(this.isModalOpen);
      console.log(this.usersLimit);
      console.log(this.sortBy);
    },

    handleOpenEventModal() {
      this.storeEvents.isModalOpen = !this.storeEvents.isModalOpen;
      console.log(this.isEventModalOpen);
    },
  },

  setup() {
    const storeUsers = useUsersStore();
    const storeEvents = useEventsStore();

    return {
      storeUsers,
      storeEvents,
    };
  },
};
</script>

<style lang="scss">
@import './utils/vars.scss';
@import './utils/mixins.scss';

* {
  scroll-behavior: smooth;
}

.main {
  margin: 0 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 100vh;
  position: relative;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #5f6675;
}

.header {
  background-color: #353a47;
  border-bottom: 1px solid #000;
  padding: 20px 0;
  text-align: center;
  margin-bottom: 30px;

  &__logo {
    width: 200px;

    :hover {
      width: 210px;
    }

    @include onTablet {
      width: 300px;
    }
  }
}
</style>
