<template>
  <div class="event-form">
    <div class="event-form__title">
      <h2 class="event-form__title-text">Add new event</h2>
    </div>
    <form class="event-form__content" @submit="handleAddEvent">
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Name:</span>
        <input type="text" class="event-form__content-item-input" v-model.trim="name" placeholder="example: Finish pr..."/>
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Description:</span>
        <textarea type="text" class="event-form__content-item-input event-form__content-item-description" v-model.trim="description" placeholder="Enter your description..." required/>
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">Date:</span>
        <input type="date" class="event-form__content-item-input" v-model.trim="date" required  :min="dateNow"/>
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">StartTime:</span>
        <input type="time" class="event-form__content-item-input" v-model.trim="startTime" required />
      </div>
      <div class="event-form__content-item">
        <span class="event-form__content-item-title">EndTime:</span>
        <input type="time" class="event-form__content-item-input" v-model.trim="endTime" required/>
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
import { calculateNextEvent } from "../api/usersApi";

export default {
  name: 'EventForm',

  data() {
    return {
      name: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      dateNow: new Date().toISOString().split('T')[0].toString().trim(),
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
      e.preventDefault();

      const dateControl = document.querySelector('input[type="date"]');
      console.log(new Date(dateControl.valueAsNumber).toUTCString())

      let timeFrom = new Date(dateControl.valueAsNumber).toUTCString().split('').splice(0, 17).join('') + this.startTime + ':00' + ' GMT'
      console.log(timeFrom)

      let timeTo = new Date(dateControl.valueAsNumber).toUTCString().split('').splice(0, 17).join('') + this.endTime + ':00' + ' GMT'
      console.log(timeTo)

      this.usersStore.users = this.usersStore.users.map((user, index) => {
        if (user.id === this.usersStore.currentUser.id) {
          let isValid = true;

          console.log(user)

          user.takenTimes.forEach(timeline => {
            if (Date.parse(timeFrom) > timeline[0] && Date.parse(timeFrom) < timeline[1]) {
              isValid = false
            } else if (Date.parse(timeTo) > timeline[0] && Date.parse(timeTo) < timeline[1]) {
              isValid = false
            }
          })

          if (isValid) {
            user.takenTimes.push([Date.parse(timeFrom), Date.parse(timeTo)]);
          } else {
            this.eventsStore.validationError = true
            this.eventsStore.isModalOpen = false;

            setTimeout(() => {
              this.eventsStore.validationError = false
            }, 3000)
            console.log(this.eventsStore.validationError)
          }

          console.log([Date.parse(timeFrom), Date.parse(timeTo)])
        }

        return {
          ...user,
        }
      })

      console.log(this.usersStore.users)

      const event = {
        id: this.eventsStore.totalCount + 1,
        name: this.name,
        description: this.description,
        date: dateControl.valueAsNumber,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: this.usersStore.currentUser.id,
      };

      if (!this.eventsStore.validationError) {
        addEvent(event)
          .then(() => {
            getUserEventsLimit(this.usersStore.currentUser.id, this.eventsStore.eventsLimit, this.eventsStore.currentEventPage, this.eventsStore.sortBy).then((res) => {
              this.eventsStore.totalCount = res[1];
              this.eventsStore.events = res[0];
            });

            this.eventsStore.isModalOpen = false;
          })
          .catch((err) => {
            console.log('err', err);
          });
      }

      calculateNextEvent(10, this.usersStore.currentUserPage)
    }
  },
}
</script>

<style lang="scss">
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

.event-form__content-item-title::placeholder {
  color: #000;
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