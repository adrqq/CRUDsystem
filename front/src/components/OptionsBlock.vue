<template>
  <div class="options">
    <div class="options__sortby">
      <select class="options__selector" id="pagination" name="pagination">
        <option value="">first name</option>
        <option value="">last name</option>
        <option value="">events count ⇑</option>
        <option value="">events count ⇓</option>
        <option value="">A-Z</option>
        <option value="">Z-A</option>
      </select>
    </div>

    <div class="options__pagination">
      <select class="options__selector" id="pagination" name="pagination" @change="setPagination">
        <option value="10" class="options__item">10</option>
        <option value="20" class="options__item">20</option>
        <option value="30" class="options__item">30</option>
        <option value="40" class="options__item">40</option>
        <option value="50" class="options__item">50</option>
        <option value="All" class="options__item">All</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'OptionsBlock',
  props: {
    usersLimit: {
      type: Number,
      required: true,
    },
  },

  methods: {
    setPagination(e: any) {
      // this.$emit('setPagination', e.target.value);
      this.$emit('update:usersLimit', e.target.value)
    },
  },
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

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

  &__pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
  }

  &__sortby {
    display: flex;
    flex-direction: row;
    align-items: center;
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
