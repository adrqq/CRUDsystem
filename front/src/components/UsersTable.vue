<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Time to next event</th>
      </tr>
    </thead>
    <tbody>
      <UserItem :user="user" v-for="user in users"/>
    </tbody>
  </table>
</template>

<script lang="ts">
import UserItem from './UserItem.vue';

export default {
  name: 'UsersTable',
  components: {
    UserItem: UserItem,
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';

.users-table {
  border-collapse: collapse;
  margin: 25px auto;
  min-width: 400px;
  width: 90%;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.users-table thead tr {
  background-color: $charcoal-color-light;
  color: #fff;
  text-align: left;
  font-weight: bold;
}

.users-table th,
.users-table td {
  padding: 12px 15px;
}

.users-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.users-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.users-table tbody tr:last-of-type {
  border-bottom: 2px solid $charcoal-color-light;
}

.users-table tbody tr.active-row {
  font-weight: bold;
  color: $charcoal-color-light;
}
</style>
