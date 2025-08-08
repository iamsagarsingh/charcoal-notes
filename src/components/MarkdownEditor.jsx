// src/components/MarkdownEditor.jsx
import { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { useNotes } from "../context/NotesContext";

const MarkdownEditor = ({initialContent = "", onSubmit, noteId=null }) => {
  const [markdown, setMarkdown] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState(false);
  const [title,setTitle] = useState('')
  const {state,dispatch} = useNotes()

  const handlePreviewToggle = () => setPreviewMode(!previewMode);

  const populateData = () => {
    const isNotePresent = state.notes.find(note=>{
        return note.$id === noteId
    })
    
    if(isNotePresent){
        setTitle(isNotePresent.title)
        setMarkdown(isNotePresent.content)
    }
    else{
        console.log("not present");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit)
        {   
            dispatch({type:"ADD",payload:{title,markdown}})
            onSubmit(markdown,title);
        }
  };

  useEffect(()=>{
    populateData()
  },[])

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="md:text-lg text-sm font-semibold">Markdown Editor</h2>
        <div className="space-x-2">
          <button
            onClick={handlePreviewToggle}
            className="bg-blue-200 border-4 border-black text-sm md:px-4 px-1 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition"
          >
            {previewMode ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-200 border-4 border-black text-sm md:px-4 px-1 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition"
          >
            Submit
          </button>
        </div>
      </div>
        <input value={title} type="text"  placeholder="title" className="p-2 my-1 w-1/2" onChange={(e)=>setTitle(e.target.value)}/>
      {!previewMode ? (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows="15"
          className="w-full border rounded p-3 text-sm font-mono focus:outline-none focus:ring"
          placeholder="Write your markdown here..."
        />
      ) : (
        <div className="prose max-w-none bg-gray-100 p-4 rounded overflow-auto">
          <MarkdownRenderer markdown={markdown} />
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;