// src/pages/NoteEditor.jsx
import { noteService } from "../appwrite/Config";
import MarkdownEditor from "../components/MarkdownEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/UserContext";

const NoteEditor = () => {
  const { id:noteID } = useParams();
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { state: noteState, dispatch: noteDispatch } = useNotes();

  const handleSaveNote = async (markdownContent, title) => {
    try {
      const isNotePresent = noteState.notes.find((note) => {
        return note.$id === noteID;
      });

      if (isNotePresent) {
        await noteService.updateNote(noteID, {
          title,
          content: markdownContent,
        });
        console.log("note updated");
      } else {
        await noteService.createNote({
          title,
          content: markdownContent,
          userId: authState.userData.$id,
        });
        console.log("Saving markdown to database...", markdownContent);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <div className="p-6">
      <MarkdownEditor noteId={noteID} onSubmit={handleSaveNote} />
    </div>
  );
};

export default NoteEditor;
