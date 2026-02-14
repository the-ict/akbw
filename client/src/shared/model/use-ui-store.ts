import { create } from 'zustand';

interface UIState {
  isProfileOpen: boolean;
  activeProfileTab:
    | 'menu'
    | 'favorites'
    | 'notifications'
    | 'reviews'
    | 'editProfile'
    | 'supportChat'
    | 'productInquiry';
  // We can simplify sub-sections into tabs or keep them separate.
  // Looking at the existing Profile component, it uses strings for tabs and sub-sections.
  // Let's standardise:
  // 'menu' is the main view.
  // 'editProfile', 'supportChat', 'productInquiry' are sub-sections but functionally act like views.

  // To keep it compatible with existing logic:
  // activeTab = 'menu' | 'favorites' | 'notifications' | 'reviews'
  // activeSubSection = null | 'editProfile' | ...

  activeProfileSubSection: string | null;

  // Actions
  onOpenChange: (open: boolean) => void;
  openProfile: () => void;
  closeProfile: () => void;
  openProfileChat: () => void;
  setProfileSubSection: (section: string | null) => void;
  setProfileTab: (tab: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProfileOpen: false,
  activeProfileTab: 'menu',
  activeProfileSubSection: null,

  onOpenChange: (open) => set({ isProfileOpen: open }),

  openProfile: () =>
    set({
      isProfileOpen: true,
      activeProfileTab: 'menu',
      activeProfileSubSection: null,
    }),

  closeProfile: () => set({ isProfileOpen: false }),

  openProfileChat: () =>
    set({
      isProfileOpen: true,
      activeProfileTab: 'menu',
      activeProfileSubSection: 'supportChat',
    }),

  setProfileSubSection: (section) => set({ activeProfileSubSection: section }),

  setProfileTab: (tab) =>
    set({
      activeProfileTab: tab as any,
      activeProfileSubSection: null, // Reset subsection when changing main tabs? Usually yes.
    }),
}));
