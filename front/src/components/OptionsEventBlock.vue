<template>
  <div class="options">
    <div class="options__sortby">
      <h3 class="options__title">Sort by</h3>
      <select class="options__selector" id="pagination" name="pagination" @change="setSortby">
        <option value="IDup">ID⇑</option>
        <option value="IDdown">ID⇓</option>
        <option value="NameDown">Name A-Z</option>
        <option value="NameUp">Name Z-A</option>
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
<script>
import { useUsersStore } from '../stores/users';
import { useEventsStore } from '../stores/events';

export default {
  name: 'OptionsEventBlock',
  props: {
    eventsLimit: {
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
      this.$emit('update:eventsLimit', e.target.value)
      this.eventsStore.eventsLimit = e.target.value
    },

    setSortby(e) {
      this.$emit('update:sortBy', e.target.value);
    },
  },

  setup() {
    const storeUsers = useUsersStore();
    const eventsStore = useEventsStore();

    return {
      storeUsers,
      eventsStore
    };
  },
};
</script>

<style lang="scss">
@import '../utils/vars.scss';
@import '../utils/mixins.scss';

.options {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  @include onTablet {
    flex-direction: row;
  }

  &__title {
    font-size: 12px;
    color: rgb(0, 0, 0);
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
    width: 175px;
  }

  &__item {
    cursor: pointer;
  }
}
</style>
