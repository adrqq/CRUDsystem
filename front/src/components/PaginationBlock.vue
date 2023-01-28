<template>
  <div class="pagination" v-if="storeUsers.users.length !== 0">
    <div class="pagination__button" @click="handleArrowClick('left')" :aria-disabled="currentPage === 1">
      <img src="@/assets/left-arrow.png" alt="arrow_left" class="pagination__arrow pagination__arrow_left" />
    </div>
    <ul class="pagination__list">
      <li v-for="button in getButtons(1, pagesCount)" class='pagination__item'
        :class="{ 'pagination__item_active': button === currentPage }"
        @click="handlePageChange(button)">
        {{ button }}
      </li>
    </ul>
    <div class="pagination__button" @click="handleArrowClick('right')">
      <img src="@/assets/right-arrow.png" alt="arrow_right" class="pagination__arrow pagination__arrow_right" />
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useUsersStore } from '../stores/users';
import { getUsersLimit } from '../api/usersApi';
import { useMediaQuery } from '@vueuse/core'
import { useEventsStore } from '../stores/events';
import { getUserEventsLimit } from '../api/eventsApi';

export default {
  name: 'PaginationBlock',

  props: {
    limit: {
      type: Number,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
    isEvents: {
      type: Boolean,
      required: false,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
    };
  },

  computed: {
    pagesCount() {
      if (this.isEvents) {
        return Math.ceil(this.storeEvents.totalCount / this.storeEvents.eventsLimit);
      } else {
        console.log(this.storeUsers.totalCount, this.limit);

        return Math.ceil(this.storeUsers.totalCount / this.limit);
      }
    },

    activePage(button: number) {
      console.log('button', button);
      return button === this.currentPage ? 'pagination__item_active' : ''
    },
  },

  methods: {
    getButtons(start: number, finish: number): number[] {
      const numbers = [];

      for (let i = start; i <= finish; i++) {
        numbers.push(i);
      }

      return numbers;
    },

    handlePageChange(page: number) {
      console.log(page);

      if (this.isEvents) {
        window.scrollTo(0, 600);
        this.storeEvents.currentEventPage = page;
      } else {
        window.scrollTo(100, 100);

        this.storeUsers.currentUserPage = page;
      }
    },

    handleArrowClick(direction: string) {
      if (this.isEvents) {
        if (direction === 'left') {
          if (this.storeEvents.currentEventPage > 1) {
            this.storeEvents.currentEventPage--;
          } else {
            this.storeEvents.currentEventPage = 1;
          }
        } else {
          if (this.storeEvents.currentEventPage < this.pagesCount) {
            this.storeEvents.currentEventPage++;
          } else {
            this.storeEvents.currentEventPage = this.pagesCount;
          }
        }
      } else {
        if (direction === 'left') {
          if (this.storeUsers.currentUserPage > 1) {
            this.storeUsers.currentUserPage--;
          } else {
            this.storeUsers.currentUserPage = 1;
          }
        } else {
          if (this.storeUsers.currentUserPage < this.pagesCount) {
            this.storeUsers.currentUserPage++;
          } else {
            this.storeUsers.currentUserPage = this.pagesCount;
          }
        }
      }
    },
  },

  setup() {
    const storeUsers = useUsersStore();
    const storeEvents = useEventsStore();

    return {
      storeUsers,
      storeEvents,
    };
  },

  watch: {
    currentPage() {
      try {
        if (!this.isEvents) {
          this.storeUsers.isLoading = true;

          getUsersLimit(this.limit, this.sortBy, this.currentPage).then((res) => {
            console.log('res', res);

            this.storeUsers.users = res[0];
            this.storeUsers.totalCount = res[1];
            console.log('users', this.storeUsers.users);
          }).finally(() => {
            this.storeUsers.isLoading = false;
          });
        } else {
          this.storeEvents.isLoading = true;
          getUserEventsLimit(this.storeUsers.currentUser.id, this.storeEvents.eventsLimit, this.currentPage, this.storeEvents.sortBy).then((res) => {
            console.log('res', res);

            this.storeEvents.events = res[0];
            this.storeEvents.totalCount = res[1];
            console.log('users', this.storeEvents.events);
          }).finally(() => {
            this.storeEvents.isLoading = false;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
@import '../utils/vars.scss';
@import '../utils/mixins.scss';

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: row;
  margin-bottom: 40px;
  // position: absolute;
  // bottom: 0;
  // left: 50%;
  // transform: translateX(-50%);

  &__button {
    width: 20px;
    height: 20px;
    border-radius: 10%;
    background-color: $charcoal-color-light;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;

    &:active {
      transform: scale(0.8);
    }

    &:hover {
      opacity: 60%;
      transform: scale(1.1);
    }

    @include onTablet {
      width: 35px;
      height: 35px;
    }
  }

  &__arrow {
    width: 10px;
    height: 10px;
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @include onTablet {
      width: 20px;
      height: 20px;
    }
  }

  &__item {
    color: #000;
  }

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }

  &__item {
    padding: 0 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 60%;
    }

    &_active {
      color: #fff;
      background-color: $charcoal-color-light;
      opacity: 100%;
      border-radius: 5px;
      padding: 6px;
      animation: popUp 0.3s ease-in-out;

      @keyframes popUp {
        0% {
          transform: scale(1);
          transform: translateY(-100%);
        }

        50% {
          transform: scale(1.1);
        }

        100% {
          transform: scale(1);
        }
      }

      @include onTablet {
        padding: 20px;
      }
    }

    @include onTablet {
      padding: 8px 14px;
    }
  }
}
</style>
