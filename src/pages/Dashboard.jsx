import { Link } from "react-router-dom"
import { noteService } from "../appwrite/Config"
import { useAuth } from "../context/UserContext"
import { useEffect, useState } from "react"
import { useNotes } from "../context/NotesContext"
import NoteCard from "../components/NoteCard"
import CreateNoteButton from "../components/CreateNoteButton"

export const Dashboard = () => {
    const {state} = useAuth()
    const {state:noteState,dispatch:NoteDispatch} = useNotes()

    // fetch the data from the appwrite
    // update the context
    // click to view and update and delete
    async function getAllNotes() {
        const userId = state.userData.$id;
        const data = await noteService.getAllNotes(userId)
        if(data && data.documents){
             NoteDispatch({type:"ADD",payload:data.documents})
        }
    }
    useEffect(()=>{
        getAllNotes()
    },[])
    return <div className="p-2 my-4">
    {/* <Link to="/note">Create Notes</Link> */}
    <CreateNoteButton />
    <div className="md:flex gap-4 md:flex-wrap my-6 justify-center">
        {
        noteState.notes.map((note,index)=>{
            return (<Link key={index} to={`/note/${note.$id}`}>
                {
                    <NoteCard  title={note.title} createdAt={'12-03-2024'}/>
                }
            </Link>)
        })
    }
    </div>
    </div>
}