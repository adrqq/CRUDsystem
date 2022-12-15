<template>
  <tr class="user-item">
    <td class="user-item__item user-item__id">{{user.id}}</td>
    <td class="user-item__item user-item__name">{{user.name}}</td>
    <td>
      <a href="mailto:forever@gmail.com" class="user-item__item">{{user.email}}</a>
    </td>
    <td>
      <a href="tel:+380000000000" class="user-item__item">{{user.phone}}</a>
    </td>
    <td class="user-item__item">1 day</td>
  </tr>
</template>

<script lang="ts">
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
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.user-item {
  &__item {
    color: #000;
    font-weight: bold;
    font-size: 14px;
  }

  &__id {
    font-size: 30px;
    font-weight: 700;
  }

  &__name {
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 1em;

    &:hover {
      color: $charcoal-color-lighter;
    }
  }
}
</style>
