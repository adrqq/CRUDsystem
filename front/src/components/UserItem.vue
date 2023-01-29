<template>
  <tr class="user-item">
    <td class="user-item__item user-item__id">{{ user.id }}</td>
    <td class="user-item__item user-item__name" @click="selectUser" rout><router-link to="/user-profile">{{`${user.name} ${user.surname}`}}</router-link></td>
    <td>
      <a href="mailto:forever@gmail.com" class="user-item__item">{{ user.email }}</a>
    </td>
    <td>
      <a href="tel:+380000000000" class="user-item__item">{{ user.phone }}</a>
    </td>
    <td class="user-item__item">{{ user.nextEvent || 'No events'}}</td>
    <td>{{ user.eventsCount }}</td>
    <div class="user-item__close" @click="handleDeleteUser">x</div>
  </tr>
</template>

<script>
import { useUsersStore } from '../stores/users';
import { deleteUser } from '../api/usersApi'

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

    handleDeleteUser() {
      try {
        deleteUser(this.user.id)
        this.usersStore.users = this.usersStore.users.filter(user => user.id !== this.user.id)
      } catch (err) {
        console.log(err)
      }
    },

    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },

    convertMsToTime(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = minutes % 60;

      hours = hours % 24;

      return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)} `;
    }
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
  position: relative;

  &__close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-weight: 900;
    cursor: pointer;
  }

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
