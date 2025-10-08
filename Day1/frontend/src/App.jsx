import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await axios.get("/api/notes");
    setNotes(res.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title) return alert("Title required");
    const res = await axios.post("/api/notes", { title, body });
    setNotes([res.data, ...notes]);
    setTitle("");
    setBody("");
  }

  async function handleDelete(id) {
    await axios.delete(`/api/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes (Day 1)</h1>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <br />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
            <button onClick={() => handleDelete(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
