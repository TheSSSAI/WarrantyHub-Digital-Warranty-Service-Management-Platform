import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Represents the structure of an authenticated user in the frontend state.
 * This aligns with claims typically returned by the Auth Gateway.
 */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tenantId?: string; // For Multi-tenant Brand/Service Center contexts
  permissions?: string[];
}

/**
 * Toast notification structure for global UI feedback.
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
}

/**
 * Interface defining the Global State shape and actions.
 */
interface GlobalState {
  // Authentication State
  user: UserProfile | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  
  // UI State
  theme: 'light' | 'dark' | 'system';
  isSidebarOpen: boolean;
  
  // Notification State
  notifications: Notification[];
  
  // Actions
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

/**
 * Global Store implementation using Zustand.
 * Persists critical session and UI preference data to localStorage.
 */
export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      accessToken: null,
      theme: 'system',
      isSidebarOpen: true,
      notifications: [],

      // Authentication Actions
      login: (user: UserProfile, token: string) => {
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          notifications: [], // Optional: clear notifications on logout
        });
      },

      updateUser: (updates: Partial<UserProfile>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      // UI Actions
      setTheme: (theme) => {
        set({ theme });
        // Side effect: Update DOM class for Tailwind dark mode
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
            root.classList.add(systemTheme);
          } else {
            root.classList.add(theme);
          }
        }
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      setSidebarOpen: (isOpen: boolean) => {
        set({ isSidebarOpen: isOpen });
      },

      // Notification Actions
      addNotification: (notification) => {
        const id = crypto.randomUUID();
        const newNotification: Notification = { ...notification, id };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-dismiss logic if duration is provided (default 5s)
        const duration = notification.duration ?? 5000;
        if (duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },

      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'warranty-hub-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage),
      // Only persist authentication and theme state, not transient notifications
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        theme: state.theme,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);