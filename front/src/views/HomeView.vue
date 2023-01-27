<template lang="">
  <div class="main__head">
      <button class="main__add-user" @click="handleOpenModal"></button>
      <OptionsBlock
        :usersLimit="usersLimit"
        :sortBy="sortBy"
        @update:usersLimit="usersLimit = $event" 
        @update:sortBy="sortBy = $event"
        :totalCount="storeUsers.totalCount"
      />
    </div>
    <div class="table-wrapper">
      <UsersTable :users="storeUsers.users"/>
    </div>

    <div v-if="!storeUsers.isLoading && storeUsers.users.length === 0 && !storeUsers.notFoundError" class="no_users">
      No users yet, try and add them using plus button
    </div>

    <PaginationBlock
      v-if="!storeUsers.externalServerError && !storeUsers.notFoundError"
      :limit="usersLimit"
      :sortBy="sortBy"
      :currentPage="storeUsers.currentUserPage"
      :isLoading="storeUsers.isLoading"
    />
    <div v-else>
      <div v-if="storeUsers.externalServerError" class="error">
        <div class="error__code">500</div>
        <div class="error__text">Oops.... There is an internal server problem try reloading the page</div>
      </div>
      <div v-else class="error">
        <div class="error__code">500</div>
        <div class="error__text">Oops.... Server can not find data if you have developer access check weather your server is started</div>
      </div>
    </div>
</template>

<script>
import PaginationBlock from '../components/PaginationBlock.vue';
import UsersTable from '../components/UsersTable.vue';
import OptionsBlock from '../components/OptionsBlock.vue';
import ModalWindow from '../components/ModalWindow.vue';
import UserForm from '../components/UserForm.vue';
import Loader from '../components/UI/Loader.vue';

import { getUsersLimit } from '../api/usersApi';
import { onMounted, onUpdated } from 'vue';

import { useUsersStore } from '../stores/users';

import router from '../router';

export default {
  name: 'HomeView',
  components: {
    PaginationBlock: PaginationBlock,
    UsersTable: UsersTable,
    OptionsBlock: OptionsBlock,
    ModalWindow: ModalWindow,
    UserForm: UserForm,
    Loader: Loader,
  },

  data() {
    return {
      usersLimit: 10,
      sortBy: 'IDup',
    };
  },

  setup() {
    const storeUsers = useUsersStore();

    onMounted(() => {
      storeUsers.isLoading = true;
      getUsersLimit(10, 'IDup').then((res) => {
        console.log('res', res);
        console.log(res.status)

        if (res === 'error505') {
          storeUsers.externalServerError = true;
        } else {
          storeUsers.users = res[0];
          storeUsers.totalCount = res[1];
          console.log('users', storeUsers.users);
          storeUsers.externalServerError = false;
          storeUsers.notFoundError = false
        }
      }).catch(error => {
        console.log(error)
        storeUsers.notFoundError = true
      }).finally(() => {
        storeUsers.isLoading = false;
      });
    });

    return {
      storeUsers,
    };
  },

  methods: {
    usersGetter() {
      getUsersLimit(this.usersLimit, this.sortBy).then((res) => {
        console.log('res', res);

        this.storeUsers.totalCount = res[1];
        this.storeUsers.users = res[0];
        console.log('users', this.users);
      }).finally(() => {
        this.storeUsers.isLoading = false;
      });
    },

    handleOpenModal() {
      this.storeUsers.isModalOpen = !this.storeUsers.isModalOpen;
      console.log(this.isModalOpen);
      console.log(this.usersLimit);
      console.log(this.sortBy);
    },
  },

  // created() {
  //   getUsersLimit(this.usersLimit).then((res) => {
  //     console.log('res', res);

  //     storeUsers.users = res.results;
  //     console.log('users', storeUsers.users);
  //   });
  // },

  watch: {
    usersLimit() {
      this.storeUsers.isLoading = true;

      this.usersGetter()
    },

    sortBy() {
      this.storeUsers.isLoading = true;

      this.usersGetter()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';
.main {
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

.table-wrapper {
  overflow-x: auto;
}

.error {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, 50%);
  display: flex;
  flex-direction: column;

  &__code {
    font-size: 32px;
    margin-top: 40px;
    font-weight: 800 ;
    align-self: center;
    margin-bottom: 40px;

    @include onTablet {
      margin-top: 0;
      font-size: 64px;
    }
  }

  &__text {
    font-size: 18px;
  }
}

.no_users {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);

  font-size: 14px;

  @include onTablet {
    font-size: 28px;
  }
}
</style>