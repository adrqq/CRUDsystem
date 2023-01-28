<template lang="">
<!-- create user profile page PAGE with table with events and fields (title, description, startDate, endDate) -->


<div class="user-profile">
  <div class="user-profile__header">
    <h1 class="user-profile__title">User Profile</h1>
      <router-link to="/">
        <img src="../assets/home-page.png" alt="home_page" class="user-profile__link">
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
        <div class="user-profile__events-item" v-for="event in eventsStore.events" :key="event._id" v-if="!eventsStore.isLoading">
          <div class="card-container">
            <div class="photo-container">
              <div class="date">
                <div class="day">{{new Date(event.date).toUTCString().split('').splice(8, 3).join('')}}</div>
                <div class="month">{{new Date(event.date).toUTCString().split('').splice(4, 3).join('')}}</div>
              </div>
              <div class="image"></div>
            </div>
            <div class="info-container">
              <div class="info-wrapper">
                <div class="event-name">
                  {{event.name}}
                </div>
                <div class="event-description">
                  {{event.description}}
                </div>
              </div>
              <div class="info-wrapper">
                <div class="time-text">start-end</div>
                <div class="time">{{`${event.startTime} - ${event.endTime}`}}</div>
              </div>
              <div class="card-container__delete" @click="() => {
                handleDeleteEvent(event.id)
              }">x</div>
            </div>
          </div>
        </div>
        <Loader v-if="eventsStore.isLoading"/>
        <PaginationBlock
          v-if="eventsStore.events.length !== 0"
          :limit="this.eventsStore.eventsLimit"
          :isEvents="true"
          :currentPage="eventsStore.currentEventPage"
          :sortBy="eventsStore.sortBy"
          :isLoading="eventsStore.isLoading"
        />
        <div v-if="!eventsStore.isLoading && eventsStore.events.length === 0" class="no-events">
          There is no events for this user at the time click on the button above and add new event
        </div>
      </div>
    </div>
  </div>
  <div v-if="eventsStore.validationError" class="validation-error">
    <div class="validation-error__text">
      Error: this timeline overlaps another one try changing it!
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
import { deleteEvent } from '../api/eventsApi';


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

    handleDeleteEvent(id) {
      try {
        deleteEvent(id).then(() => {
          this.eventsStore.events = this.eventsStore.events.filter(eve => eve.id !== id)
        })
      } catch (err) {
        console.log(err)
      }
    }
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
  position: relative;

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
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    justify-content: space-between;
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

    @include onTablet {
      padding: 30px;
    }
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
    margin-top: 20px;
  }

  &__events-item {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // width: 100%;
    // padding: 10px;
    // border: 1px solid #000;
    // border-radius: 5px;
    // margin-bottom: 10px;

    // @include onMobile {
    //   flex-direction: column;
    // }
  }

  // &__events-item-info {}

  // &__events-item-title {}

  // &__events-item-title-date {}

  // &__events-item-description {
  //   width: 100px;
  //   word-wrap: break-word;
  // }

  // &__events-item-dates {}

  // &__events-item-date {}

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

  .photo-container {
    font-size: 1.5em;
    background-color: #2c3e52;
    color: white;
    padding: 20px;
    text-align: center;
    grid-area: photo;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-container {
    border-radius: 5px;
    margin: 10px;
    display: grid;
    grid-template-areas:
      'photo info';
    grid-template-columns: 150px 1fr;
    width: 90%;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    line-height: 1.75em;

    &__delete {
      position: absolute;
      top: 10px;
      right: 15px;
      font-weight: 900;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .info-container {
    padding: 20px;
    grid-area: info;
    display: flex;
    flex-direction: column;
    position: relative;

    @include onTablet {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .event-name {
    font-weight: bold;
    padding-bottom: 5px;
  }

  .event-location {
    font-weight: 300;
  }

  .day {
    font-weight: 300;
  }

  .month {
    font-weight: 600;
  }

  .time-text {
    font-weight: bold;
    padding: 20px;
  }

  .time {
    padding-left: 10px;
  }

  @media(max-width: 600px) {
    .card-container {
      // width: 100%;
    }

    .photo-container {
      grid-column: 2;
      min-width: 15px;
      padding: 0;
    }

    .info-container {
      grid-column: 1;
    }

    .day {
      font-size: 10px;
    }

    .month {
      font-size: 8px;
    }
  }

  .info-wrapper {
    display: flex;
    flex-direction: column;
  }

  .no-events {
    height: 200px;
    margin-top: 100px;
    font-size: 24px;
    font-weight: 600;
  }

  .validation-error {
    position: absolute;
    top: 38%;
    background: $charcoal-color-light;
    height: 200px;
    width: 200px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pop 3s ease-in-out;


    @keyframes pop {
      0% {
        width: 400px;
        height: 200px;
      }

      100% {
        width: 700px;
        height: 400px;
      }
    }

    @include onTablet {
      width: 500px;
      height: 300px;
    }

    &__text {
      color: #fff;
      font-weight: 600;
      padding: 10px;

      @include onTablet {
        font-size: 32px;
        width: 400px;
      }
    }
  }
}
</style>