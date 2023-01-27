import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../types/User';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: ref<User[]>([]),
    isLoading: ref(false),
    totalCount: 0,
    currentUser: ref<any>({
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '+380000000000',
      id: -1,
      date: 0,
      externalServerError: false,
      notFoundError: false,
    }),
    currentUserPage: ref(1),
    isModalOpen: ref(false),
  }),

  actions: {
    addUser(user: User) {
      this.users.push(user);
    }
  },
});