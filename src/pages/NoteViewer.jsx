import { Link, useNavigate, useParams } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import NoteEditor from "./NoteEditor";
import { noteService } from "../appwrite/Config";

export const NoteViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const { state: NoteState } = useNotes();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const note = NoteState.notes.find((note) => {
      return note.$id === id;
    });
    if (note) {
      setTitle(note.title);
      setMarkdown(note.content);
    }
  }, [id, NoteState.notes]);

  async function handleDelete(id) {
    const status = await noteService.deletePost(id)
    if(status)
    navigate('/dashboard')
  }

  // get the note with id in params.
  return (
    <div className="mx-2 my-4">
      <div className="m-2 flex gap-2 items-center">
        <h2 className="flex-1 font-extrabold text-2xl">{title}</h2>
        <Link to={`/create-note/${id}`}
          className="bg-green-200 border-4 border-black px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition"
        >
          Edit
        </Link>
        <button className="bg-red-200 border-4 border-black px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition" onClick={()=>handleDelete(id)}>
          Delete
        </button>
      </div>
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
};
