<template>
  <tr class="user-item">
    <td class="user-item__item user-item__id">{{user.id}}</td>
    <td class="user-item__item user-item__name" @click="selectUser"><router-link to="/user-profile">{{`${user.name} ${user.surname}`}}</router-link></td>
    <td>
      <a href="mailto:forever@gmail.com" class="user-item__item">{{user.email}}</a>
    </td>
    <td>
      <a href="tel:+380000000000" class="user-item__item">{{user.phone}}</a>
    </td>
    <td class="user-item__item">No events yet</td>
    <td>10</td>
  </tr>
</template>

<script>
import { useUsersStore } from '../stores/users';
// import router from 'vue-router';

export default {
  name: 'UserItem',
  data() {
    return {
      empty: '',
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectUser() {
      this.usersStore.currentUser = this.user;
    },
  },

  setup() {
    const usersStore = useUsersStore();
    return { usersStore };
  },
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.user-item {
  &__item {
    color: #000;
    font-size: 14px;
  }

  &__id {
    font-size: 24px;
    font-weight: 700;
  }

  &__name {
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 1em;
    transition: 0.4s ease;

    &:hover {
      color: $charcoal-color-lighter;
      background-color: $dark-sea-green-color;
    }
  }
}
</style>
