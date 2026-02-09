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
    <main className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">Create Event</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-800 bg-slate-950 p-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Overview</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Event Image</label>
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              className="block w-full text-sm text-slate-400
            file:mr-4 file:rounded-md file:border-0
            file:bg-indigo-600 file:px-4 file:py-2
            file:text-white hover:file:bg-indigo-500"
            />
          </div>

          {/* Venue & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Venue</label>
              <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-300">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-300">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              />
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            >
              <option value="online">online</option>
              <option value="offline">offline</option>
              <option value="hybrid">hybrid</option>
            </select>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Audience</label>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            />
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">Agenda</label>
            <div className="flex gap-2 mb-3">
              <input
                value={agendaInput}
                onChange={(e) => setAgendaInput(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
                placeholder="09:00 AM - Keynote"
              />
              <button
                type="button"
                onClick={addAgenda}
                className="rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-500"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {agenda.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
                >
                  {a}
                  <button
                    type="button"
                    onClick={() => removeAgenda(i)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
                placeholder="Cloud"
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-500"
              >
                Add
              </button>
            </div>

            <ul className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-full bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="text-red-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Organizer</label>
            <input
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create Event"}
          </button>

          {message && (
            <p className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>

  );
}
