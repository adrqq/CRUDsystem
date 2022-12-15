<template>
  <div class="pagination">
    <div class="pagination__button">
      <img src="@/assets/left-arrow.png" alt="arrow_left" class="pagination__arrow pagination__arrow_left" />
    </div>
    <div class="pagination__button">
      <img src="@/assets/right-arrow.png" alt="arrow_right" class="pagination__arrow pagination__arrow_right" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PaginationBlock',
};
</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  &__button {
    width: 40px;
    height: 40px;
    border-radius: 10%;
    background-color: #353a47;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;

    &:hover {
      opacity: 60%;
    }
  }

  &__arrow {
    width: 20px;
    height: 20px;
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
