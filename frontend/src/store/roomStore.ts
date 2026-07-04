import { create } from 'zustand';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isSpeaking: boolean;
  isOnline: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
}

interface RoomState {
  roomId: string | null;
  participants: Participant[];
  setRoomId: (id: string) => void;
  addParticipant: (p: Participant) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  roomId: null,
  participants: [],
  setRoomId: (id) => set({ roomId: id }),
  addParticipant: (p) => set((state) => ({ participants: [...state.participants, p] })),
  removeParticipant: (id) => set((state) => ({ participants: state.participants.filter(p => p.id !== id) })),
  updateParticipant: (id, updates) => set((state) => ({
    participants: state.participants.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
}));
