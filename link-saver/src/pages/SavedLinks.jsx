// src/pages/SavedLinks.jsx
import { useState, useEffect } from "react";
import api from "../api/client";

export default function SavedLinks() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    api.get("/links/").then(resp => setLinks(resp.data));
  }, []);
  return (
    <ul>
      {links.map(l => (
        <li key={l.id}>{l.url}</li>
      ))}
    </ul>
  );
}
