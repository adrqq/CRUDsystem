import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Event } from '../types/Event';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: ref<any>([]),
    isLoading: ref(false),
    totalCount: ref(0),
    eventsLimit: ref(10),
    currentEventPage: ref(1),
    sortBy: ref('IDup'),
    itemsPerPage: ref(10),
    isModalOpen: ref(false),
    validationError: ref(false),
  }),
});