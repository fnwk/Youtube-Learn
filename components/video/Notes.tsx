import { FlatList, TextInput, View } from "react-native";
import { AppButton, StyledText } from "../ui";
import { useNotesStore } from "@/stores/notes.store";
import { useMemo, useState } from "react";
import { useT } from "@/i18n/useTranslation";
import formatTime from "@/utils/formatTime";

interface NotesProps {
  currentTime: number;
  videoId: string;
}

interface Note {
  time: number;
  text: string;
}

const Note = ({ time, text }: Note) => {
  return (
    <View className="rounded-xl border border-gray p-2 my-4">
      <StyledText>{text}</StyledText>
      <StyledText size="sm" weight="semibold" className="w-full text-right">
        {formatTime(time)}
      </StyledText>
    </View>
  );
};

const Notes = ({ currentTime, videoId }: NotesProps) => {
  const { t } = useT("video");
  const { getNotes, addNote, videos } = useNotesStore((state) => state);
  const [noteText, setNoteText] = useState("");

  const notes = useMemo(() => {
    const notes = getNotes(videoId);
    return notes ? notes : [];
  }, [videoId, videos]);

  const handleAddNote = () => {
    if (noteText.trim() === "") {
      return;
    }
    const newNote: Note = { time: currentTime, text: noteText };
    addNote(videoId, newNote);
    setNoteText("");
  };

  return (
    <View className="h-full pb-12 pt-4 ">
      <FlatList
        data={notes}
        renderItem={({ item }) => <Note time={item.time} text={item.text} />}
        keyExtractor={(item, index) => index.toString()}
        className="mb-auto"
      />
      <TextInput
        multiline
        className="border border-gray rounded-xl h-16 p-3 mb-6 text-[Poppins_400Regular] text-base mt-auto"
        placeholder={t("enterNotes")}
        value={noteText}
        onChangeText={setNoteText}
      />
      <AppButton title={t("addNote")} onPress={handleAddNote} />
    </View>
  );
};

export default Notes;
