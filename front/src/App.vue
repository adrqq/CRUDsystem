<template lang="">
  <div class="app-wrapper">
    <ModalWindow :is-modal-open="isModalOpen">
      <UserForm @close-modal="handleOpenModal" />
    </ModalWindow>
    <header class="header">
      <img src="@/assets/main_logo.svg" alt="main_logo" class="header__logo" />
    </header>

    <main class="main">
      <div class="main__head">
        <button class="main__add-user" @click="handleOpenModal"></button>
        <OptionsBlock :usersLimit="usersLimit" @update:usersLimit="usersLimit = $event"/>
      </div>

      <div class="table-wrapper">
        <UsersTable :users="users"/>
      </div>
      <!-- <PaginationBlock /> -->
    </main>
  </div>
</template>

<script lang="ts">
import PaginationBlock from './components/PaginationBlock.vue';
import UsersTable from './components/UsersTable.vue';
import OptionsBlock from './components/OptionsBlock.vue';
import ModalWindow from './components/ModalWindow.vue';
import UserForm from './components/UserForm.vue';

import { getUsersLimit } from './api/usres';
import { onMounted, onUpdated } from 'vue';

export default {
  name: 'App',

  components: {
    PaginationBlock: PaginationBlock,
    UsersTable: UsersTable,
    OptionsBlock: OptionsBlock,
    ModalWindow: ModalWindow,
    UserForm: UserForm,
  },

  data() {
    return {
      isModalOpen: false,
      usersLimit: 10,
      users: [],
    };
  },

  methods: {
    handleOpenModal() {
      this.isModalOpen = !this.isModalOpen;
      console.log(this.isModalOpen);
      console.log(this.usersLimit);
    },
  },

  created() {
    getUsersLimit(this.usersLimit).then((res) => {
      console.log('res', res);

      this.users = res.results;
      console.log('users', this.users);
    });
  },

  watch: {
    usersLimit() {
      getUsersLimit(this.usersLimit).then((res) => {
        console.log('res', res);

        this.users = res.results;
        console.log('users', this.users);
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.table-wrapper {
  overflow-x: auto;
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

    @include onTablet {
      width: 300px;
    }
  }
}

.main {
  margin: 0 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 100vh;
  position: relative;

  @include onTablet {
    margin: 0 40px;
  }

  &__head {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
    flex-direction: column;
    // margin: 20px 50px;

    @include onTablet {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__border {
    border-bottom: 1px solid rgb(216, 205, 205);
    margin: 10px 20px;
  }

  &__add-user {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #353a47;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
    // margin-left: 60px;
    margin: auto;
    display: flex;
    transition: 0.5s;

    @include onTablet {
      margin-left: 80px;
    }

    &:hover {
      opacity: 60%;
    }

    &:active {
      transform: scale(0.8);
    }

    &::before {
      content: '';
      width: 20px;
      height: 2px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &::after {
      content: '';
      width: 2px;
      height: 20px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
