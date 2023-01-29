<template>
  <div class="options">
    <div class="options__sortby">
      <h3 class="options__title">Sort by</h3>
      <select class="options__selector" id="pagination" name="pagination" @change="setSortby">
        <option value="IDup">ID⇑</option>
        <option value="IDdown">ID⇓</option>
        <option value="NameDown">Name A-Z</option>
        <option value="NameUp">Name Z-A</option>
        <option value="SurnameDown">Surname A-Z</option>
        <option value="SurnameUp">Surname Z-A</option>
        <option value="DateAddedUp">Date added ⇑</option>
        <option value="DateAddedDown">Date added ⇓</option>
      </select>
    </div>

    <div class="options__pagination">
      <h3 class="options__title">Items on the page</h3>
      <select class="options__selector" id="pagination" name="pagination" @change="setPagination">
        <option value="10" class="options__item">10</option>
        <option value="16" class="options__item">16</option>
        <option value="32" class="options__item">32</option>
        <option value="64" class="options__item">64</option>
        <option value={{totalCount}} class="options__item">All</option>
      </select>
    </div>
  </div>
</template>
<script >
import { useUsersStore } from '../stores/users';

export default {
  name: 'OptionsBlock',
  props: {
    usersLimit: {
      type: Number,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    }
  },

  methods: {
    setPagination(e) {
      // this.$emit('setPagination', e.target.value);
      this.$emit('update:usersLimit', e.target.value)
    },

    setSortby(e) {
      this.$emit('update:sortBy', e.target.value);
    },
  },

  setup() {
    const storeUsers = useUsersStore();

    return {
      storeUsers,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../utils/vars.scss';
@import '../utils/mixins.scss';

.options {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  margin-left: 20px;

  @include onTablet {
    margin-left: 0;
  }

  @include onTablet {
    flex-direction: row;
  }

  &__title {
    font-size: 12px;
    color: rgb(188, 175, 175);
    margin-bottom: 2px;
    margin-left: 2px;
  }

  &__pagination {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    margin-right: 20px;
  }

  &__sortby {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
  }

  &__selector {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: #353a47;
    color: #fff;
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
    width: 200px;
  }

  @include onTablet {
    margin-right: 40px;
    justify-content: flex-end;
  }

  &__item {
    cursor: pointer;
  }
}
</style>
