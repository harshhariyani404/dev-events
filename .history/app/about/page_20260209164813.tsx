"use client";

import { useState, useRef } from "react";

export default function AboutPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("offline");
  const [audience, setAudience] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [agenda, setAgenda] = useState<string[]>([]);
  const [agendaInput, setAgendaInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function addTag() {
    if (!tagInput.trim()) return;
    setTags((t) => [...t, tagInput.trim()]);
    setTagInput("");
  }

  function removeTag(i: number) {
    setTags((t) => t.filter((_, idx) => idx !== i));
  }

  function addAgenda() {
    if (!agendaInput.trim()) return;
    setAgenda((a) => [...a, agendaInput.trim()]);
    setAgendaInput("");
  }

  function removeAgenda(i: number) {
    setAgenda((a) => a.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("overview", overview);
      form.append("venue", venue);
      form.append("location", location);
      form.append("date", date);
      form.append("time", time);
      form.append("mode", mode);
      form.append("audience", audience);
      form.append("organizer", organizer);

      // API expects tags and agenda as JSON string values
      form.append("tags", JSON.stringify(tags));
      form.append("agenda", JSON.stringify(agenda));

      const file = fileRef.current?.files?.[0];
      if (file) form.append("image", file);

      const res = await fetch("/api/events", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create event");

      setMessage("Event created successfully");
      formRef.current?.reset();
      setTags([]);
      setAgenda([]);
      setTitle("");
      setDescription("");
      setOverview("");
      setVenue("");
      setLocation("");
      setDate("");
      setTime("");
      setMode("offline");
      setAudience("");
      setOrganizer("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Create Event</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Overview</label>
          <textarea
            name="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Image (file)</label>
          <input type="file" name="image" ref={fileRef} accept="image/*" />
        </div>

        <h3>Location & Venue</h3>
        <div style={{ marginBottom: 12 }}>
          <label>Venue</label>
          <input
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Location (City, State)</label>
          <input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <h3>Date & Time</h3>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <h3>Event Metadata</h3>
        <div style={{ marginBottom: 12 }}>
          <label>Mode</label>
          <select name="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="online">online</option>
            <option value="offline">offline</option>
            <option value="hybrid">hybrid</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Audience</label>
          <input
            name="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <h3>Agenda</h3>
        <div style={{ marginBottom: 8 }}>
          <input
            value={agendaInput}
            onChange={(e) => setAgendaInput(e.target.value)}
            placeholder='e.g. "09:00 AM - Keynote"'
            style={{ width: "80%" }}
          />
          <button type="button" onClick={addAgenda} style={{ marginLeft: 8 }}>
            Add
          </button>
        </div>
        <ul>
          {agenda.map((a, i) => (
            <li key={i}>
              {a} <button type="button" onClick={() => removeAgenda(i)}>Remove</button>
            </li>
          ))}
        </ul>

        <h3>Tags</h3>
        <div style={{ marginBottom: 8 }}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder='e.g. Cloud'
            style={{ width: "80%" }}
          />
          <button type="button" onClick={addTag} style={{ marginLeft: 8 }}>
            Add
          </button>
        </div>
        <ul>
          {tags.map((t, i) => (
            <li key={i}>
              {t} <button type="button" onClick={() => removeTag(i)}>Remove</button>
            </li>
          ))}
        </ul>

        <div style={{ marginBottom: 12 }}>
          <label>Organizer</label>
          <input
            name="organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        {/* Hidden inputs to send tags/agenda as JSON strings */}
        <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        <input type="hidden" name="agenda" value={JSON.stringify(agenda)} />

        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create Event"}
          </button>
        </div>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </main>
  );
}
