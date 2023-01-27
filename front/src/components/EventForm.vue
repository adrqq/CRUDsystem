<template>
  <!-- create beautiful form to add new event with fields name description date and userId -->

  <div class="event-form">
    <div class="event-form__title">
      <h2 class="event-form__title-text">Add new event</h2>
    </div>
    <form class="event-form__content" @submit.prevent="handleAddEvent">
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Name:</span>
        <input type="text" class="event-form__content-item-input" v-model.trim="name" />
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Description:</span>
        <textarea type="text" class="event-form__content-item-input event-form__content-item-description" v-model.trim="description" />
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Date:</span>
        <input type="date" class="event-form__content-item-input" v-model.trim="date"/>
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">StartTime:</span>
        <input type="time" class="event-form__content-item-input" v-model.trim="startTime"/>
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">EndTime:</span>
        <input type="time" class="event-form__content-item-input" v-model.trim="endTime"/>
      </div>
      <div class="event-form__buttons">
      <button class="event-form__button" type="submit">
        <h3 class="event-form__button-text">Add</h3>
      </button>
      <button class="event-form__button" @click="handleCloseModal">
        <h3 class="event-form__button-text">Cancel</h3>
      </button>
    </div>
    </form>
  </div>
</template>

<script>
import { useEventsStore } from '../stores/events';
import { useUsersStore } from '../stores/users';
import { addEvent, getUserEventsLimit } from '../api/eventsApi';

export default {
  name: 'EventForm',

  data() {
    return {
      name: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
    };
  },

  setup() {
    const eventsStore = useEventsStore();
    const usersStore = useUsersStore();

    return {
      eventsStore,
      usersStore,
    };
  },

  methods: {
    handleCloseModal() {
      this.eventsStore.isModalOpen = false;
    },

    handleAddEvent(e) {
      console.log('name', this.name);
      console.log('description', this.description);
      console.log('date', this.date);
      console.log('startTime', this.startTime);
      console.log('endTime', this.endTime);

      const event = {
        name: this.name,
        description: this.description,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: this.usersStore.currentUser.id,
      };

      addEvent(event)
        .then((res) => {
          console.log('res', res);
          this.eventsStore.isModalOpen = false;
          
          getUserEventsLimit(0, 10)
            .then((res) => {
              console.log('res', res);
              this.eventsStore.events = [0];
              this.eventsStore.totalCount = res[1];
            })
            .catch((err) => {
              console.log('err', err);
            });
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  },
}

</script>

<style lang="scss">
// add styles to form such as below
.event-form {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.event-form__title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.event-form__title-text {
  font-size: 24px;
  font-weight: 500;
  color: #000;
  text-shadow: 2px 2px 2px #000;
}

.event-form__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.event-form__content-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.event-form__content-item-title {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-right: 20px;
}

.event-form__content-item-input {
  width: 100%;
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.event-form__content-item-description {
  height: 100px;
  resize: none;
}

.event-form__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-form__button {
  width: 45%;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #fff;
  }
}

.event-form__button-text {
  font-size: 18px;
  font-weight: 500;
  color: #000;

  &:hover {
    color: #fff;
  }
}
</style>