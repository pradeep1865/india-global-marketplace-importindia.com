"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const messagesKey = "importindia.contactMessages";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW";
  createdAt: string;
};

export function ContactMessageForm() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name: String(form.get("name") || currentUser?.fullName || currentUser?.companyName || "Guest"),
      email: String(form.get("email") || currentUser?.email || ""),
      subject: String(form.get("subject") || "Marketplace support request"),
      message: String(form.get("message") || ""),
      status: "NEW",
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(window.localStorage.getItem(messagesKey) || "[]") as ContactMessage[];
    window.localStorage.setItem(messagesKey, JSON.stringify([nextMessage, ...existing]));
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">
          Name
          <input name="name" defaultValue={currentUser?.fullName || currentUser?.companyName || ""} className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" required />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Email
          <input name="email" type="email" defaultValue={currentUser?.email || ""} className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" required />
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold text-slate-700">
        Subject
        <input name="subject" className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" required />
      </label>
      <label className="mt-4 block text-sm font-bold text-slate-700">
        Message to admin
        <textarea name="message" rows={5} className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" required />
      </label>
      {sent ? <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-black text-emerald-700">Message sent to the admin inbox.</p> : null}
      <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full bg-[#0b1f4d] px-5 py-3 text-sm font-black text-white">
        <Send size={17} />
        Send request
      </button>
    </form>
  );
}
