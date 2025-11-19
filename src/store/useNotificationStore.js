import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (payload) => set((state) => ({
        notifications: [...state.notifications, payload]
      })),
      markAsSeen: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, seen: true } : n
        )
      })),
    }),
    {
      name: 'notification-storage',
    }
  )
);

export default useNotificationStore;
