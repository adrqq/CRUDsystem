<template>
  <div class="user-form">
    <div class="user-form__top">
      <div class="user-form__title">Add user</div>
      <button class="user-form__close" @click="handleCloseModal"></button>
    </div>

    <div class="user-form__border"></div>

    <form action="" class="users-form__form" @submit="handleUserSubmit">
      <div class="user-form__input-wrapper">
        <input type="text" id="name" class="user-form__input" placeholder="Name" required v-model.trim="name" />
      </div>

      <div class="user-form__input-wrapper">
        <input type="text" id="surname" class="user-form__input" placeholder="Surname" required v-model.trim="surname" />
      </div>

      <div class="user-form__input-wrapper">
        <input type="email" id="email" class="user-form__input" placeholder="Email" required  v-model.trim="email" />
      </div>

      <div class="user-form__input-wrapper">
        <input type="tel" id="phone" class="user-form__input" placeholder="Number" required  v-model.trim="phone" />
      </div>

      <div class="user-form__bottom">
        <button class="user-form__button" type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useUsersStore } from '../stores/users';
import { addUser } from '../api/usersApi';
import { getUsersLimit } from '../api/usersApi';

export default {
  name: 'UserForm',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
    };
  },
  methods: {
    handleCloseModal() {
      this.$emit('close-modal');
    },

    handleUserSubmit(e: Event) {
      e.preventDefault();
      // const name = (e.target as HTMLFormElement).name.value;
      // const surname = (e.target as HTMLFormElement).surname.value;
      // const email = (e.target as HTMLFormElement).email.value;
      // const phone = (e.target as HTMLFormElement).phone.value;

      const user = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        id: this.usersStore.totalCount + 1,
        date: Date.now(),
        takenTimes: [[1, 1]],
      };

      addUser(user).then(() => {
        this.usersStore.isLoading = true;

        getUsersLimit(10, 'IDup', this.usersStore.currentUserPage).then((res) => {
          console.log('res', res);

          this.usersStore.totalCount = res[1];
          this.usersStore.users = res[0];
        }).finally(() => {
          this.usersStore.isLoading = false;
        });
      });

      this.$emit('close-modal');
    },
  },

  setup() {
    const usersStore = useUsersStore();
    return { usersStore };
  },
};
</script>

<style lang="scss">
@import '@/utils/vars.scss';
@import '@/utils/mixins.scss';

.user-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;

    @include onTablet {
      font-size: 30px;
    }
  }

  &__close {
    width: 30px;
    height: 30px;
    background: url('@/assets/cross.png') no-repeat;
    background-size: cover;
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    @include onTablet {
      width: 40px;
      height: 40px;
    }
  }

  &__border {
    width: 100%;
    height: 4px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #353a47;
    color: #fff;
    font-size: 14px;
    transition: background-color 0.3s ease-in-out;
    margin-bottom: 20px;

    &:focus {
      background-color: #fff;
      color: #353a47;
    }

    @include onTablet {
      font-size: 18px;
    }
  }

  &__button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #353a47;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-top: 40px;

    &:hover {
      background-color: #fff;
      color: #353a47;
    }

    @include onTablet {
      font-size: 36px;
    }
  }

  &__bottom {
    display: flex;
    justify-content: center;
  }
}
</style>
