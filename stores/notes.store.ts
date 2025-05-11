import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Note {
  time: number;
  text: string;
}

interface Video {
  id: string;
  notes: Note[];
}

interface NotesStoreState {
  videos: Video[];
  addNote: (videoId: string, note: Note) => void;
  getNotes: (videoId: string) => Note[] | undefined;
}

export const useNotesStore = create<NotesStoreState>()(
  persist(
    (set, get) => ({
      videos: [],
      addNote: (videoId: string, note: Note) =>
        set((state) => {
          const videoIndex = state.videos.findIndex(
            (video) => video.id === videoId,
          );
          if (videoIndex !== -1) {
            const updatedVideos = [...state.videos];
            updatedVideos[videoIndex].notes.push(note);
            return { videos: updatedVideos };
          } else {
            return {
              videos: [...state.videos, { id: videoId, notes: [note] }],
            };
          }
        }),
      getNotes: (videoId: string) => {
        const video = get().videos.find((video) => video.id === videoId);
        return video ? video.notes : undefined;
      },
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
