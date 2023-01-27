<template lang="">
<!-- create user profile page PAGE with table with events and fields (title, description, startDate, endDate) -->


<div class="user-profile">
  <div class="user-profile__header">
    <h1 class="user-profile__title">User Profile</h1>
      <router-link to="/">
        <img src="../assets/home-page.png" alt="hime_page" class="user-profile__link">
      </router-link>
  </div>
  <div class="user-profile__content">
    <div class="user-profile__info">
      <div class="user-profile__info-item">
        <span class="user-profile__info-title">Name:</span>
        <span class="user-profile__info-value">{{this.usersStore.currentUser.name}}</span>
      </div>
      <div class="user-profile__info-item">
        <span class="user-profile__info-title">Surname:</span>
        <span class="user-profile__info-value">{{this.usersStore.currentUser.surname}}</span>
      </div>
      <div class="user-profile__info-item">
        <span class="user-profile__info-title">Email:</span>
        <span class="user-profile__info-value">{{this.usersStore.currentUser.email}}</span>
      </div>
      <div class="user-profile__info-item">
        <span class="user-profile__info-title">Phone:</span>
        <span class="user-profile__info-value">{{this.usersStore.currentUser.phone}}</span>
      </div>
      <!-- make button that opens modal to create new event -->
      <button class="user-profile__button" @click="handleOpenModal">
        <h3 class="user-profile__button__text">Add new event</h3>
      </button>
      <PaginationBlock
       :limit="this.eventsStore.eventsLimit"
       :isEvents="true"
       :currentPage="eventsStore.currentEventPage"
       :sortBy="eventsStore.sortBy"
       :isLoading="eventsStore.isLoading"
      />
    </div>
    <div class="user-profile__events">
      <h2 class="user-profile__events-title">Events</h2>
      <OptionsEventBlock
        :eventsLimit="eventsLimit"
        :sortBy="sortBy"
        :totalCount="eventsStore.totalCount"
        @update:eventsLimit="eventsLimit = $event" 
        @update:sortBy="sortBy = $event"
      />
      <div class="user-profile__events-list">
        <div class="user-profile__events-item" v-for="event in this.eventsStore.events" :key="event._id" v-if="!eventsStore.isLoading">
          <div class="user-profile__events-item-info">
            <span class="user-profile__events-item-title">{{event.name}}</span>
            <div class="user-profile__events-item-description">
              <span class="user-profile__events-item-description__text">{{event.description}}</span>
            </div>
          </div>
          <div class="user-profile__events-item-dates">
            <span class="user-profile__events-item-title-date">Start-End Date</span>
            <span class="user-profile__events-item-date">{{event.date}}</span>
            <span class="user-profile__events-item-date">00:12</span>
          </div>
        </div>
        <Loader v-if="eventsStore.isLoading"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useUsersStore } from '../stores/users';
import { useEventsStore } from '../stores/events';
import PaginationBlock from '../components/PaginationBlock.vue';
import { onMounted } from 'vue';
import { getUserEventsLimit } from '../api/eventsApi';
import OptionsEventBlock from '../components/OptionsEventBlock.vue';
import Loader from '../components/UI/Loader.vue';


export default {
  name: 'UserProfileView',

  components: {
    PaginationBlock,
    OptionsEventBlock,
    Loader,
  },

  data() {
    return {
      eventsLimit: 10,
      sortBy: 'IDup',
    }
  },

  methods: {
    eventsGetter() {
      getUserEventsLimit(this.usersStore.currentUser.id, this.eventsLimit, 1, this.sortBy).then((res) => {

        console.log(res);
        console.log(res[0]);
        console.log('count', res[1]);
        this.eventsStore.totalCount = res[1];
        this.eventsStore.events = res[0];
      });
    },

    handleOpenModal() {
      this.eventsStore.isModalOpen = true;
    },
  },

  watch: {
    eventsLimit() {
      this.eventsGetter()
    },

    sortBy() {
      this.eventsGetter()
    },
  },

  setup() {
    const usersStore = useUsersStore();
    const eventsStore = useEventsStore();

    onMounted(() => {
      console.log('eventsStore', eventsStore);
      eventsStore.isLoading = true;

      setTimeout(() => {
        getUserEventsLimit(usersStore.currentUser.id, eventsStore.eventsLimit, 1, eventsStore.sortBy).then((res) => {

          console.log(res);
          console.log(res[0]);
          console.log('count', res[1]);

          eventsStore.totalCount = res[1];
          eventsStore.events = res[0];
        })

        eventsStore.isLoading = false;
      }, 1000)
    });

    return { usersStore, eventsStore };
  },

  created() {
    if (this.usersStore.users.length === 0) {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;

  &__button {
    width: 100%;
    height: 50px;
    margin: 20px auto;
    background-color: $charcoal-color;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    // @include onMobile {
    //   width: 100%;
    // }

    &:hover {
      background-color: $dark-sea-green-color;
    }

    &__text {
      font-size: 20px;
      font-weight: 700;
      color: #fff;

      &:hover {
        color: #000;
      }
    }
  }

  &__link {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 30px;
    font-weight: 700;
    color: rgb(31, 23, 44);
    text-shadow: 1px 1px 1px #000;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
  }

  &__info {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-right: 60px;
    padding: 30px;
    background-color: $spanish-pink-color;
    border-radius: 5px;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  &__info-title {
    font-size: 18px;
    font-weight: 700;
    color: #000;
  }

  &__info-value {
    font-size: 22px;
    font-weight: 400;
    color: #000;

    @include onMobile {
      font-size: 12px;
    }
  }

  &__events {
    display: flex;
    flex-direction: column;
    width: 50%;
    background: $dark-sea-green-color;
    border-radius: 5px;
    padding: 30px;
  }

  &__events-title {
    font-size: 24px;
    font-weight: 500;
    color: #000;
    text-shadow: 2px 2px 2px #000;
  }

  &__events-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
  }

  &__events-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    margin-bottom: 10px;

    @include onMobile {
      flex-direction: column;
    }
  }

  &__events-item-info {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  &__events-item-title {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-bottom: 10px;
  }

  &__events-item-title-date {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-top: 20px;

    @include onTablet {
      margin-top: 10px;
    }
  }

  &__events-item-description {
    height: 100px;

    @include onDesktop {
      border: 2px solid #000;
      border-radius: 4px;
      padding: 10px;
      min-width: 250px;
    }

    &__text {
      font-size: 16px;
      font-weight: 400;
      color: #000;
      width: 20px;
    }
  }

  &__events-item-dates {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 10px;

    @include onTablet {
      margin-left: 100px;
    }
  }

  &__events-item-date {
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }

  @media (max-width: 1000px) {
    &__content {
      flex-direction: column;
    }

    &__info {
      width: 100%;
      margin-right: 0;
      border-radius: 5px 5px 0 0;
    }

    &__events {
      width: 100%;
      border-radius: 0 0 5px 5px;
    }
  }
}
</style>