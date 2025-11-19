import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { projects } from '../data/projectData';

const initialNotifications = projects.flatMap((project) => project.notifications);

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: initialNotifications,
      addNotification: (payload) => set((state) => ({
        notifications: [...state.notifications, payload]
      })),
      markAsSeen: (id) => set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, seen: true } : notification
        )
      })),
    }),
    {
      name: 'notification-storage',
    }
  )
);

export default useNotificationStore;
