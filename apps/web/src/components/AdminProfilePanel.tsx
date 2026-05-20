"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BadgeCheck, ClipboardCheck, Mail, ShieldCheck, UserCog, XCircle } from "lucide-react";

type PendingListing = {
  id: string;
  manufacturerName: string;
  productName: string;
  segment: string;
  priceInr: number;
  moq: number;
  status: "PENDING_ADMIN_APPROVAL" | "APPROVED" | "REJECTED";
  createdAt: string;
};

type StoredAccount = {
  id: string;
  role: "BUYER" | "MANUFACTURER" | "ADMIN";
  email: string;
  companyName?: string;
  fullName?: string;
  accountStatus: "ACTIVE" | "PENDING_ADMIN_APPROVAL";
  verificationStatus?: "PENDING" | "APPROVED";
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW";
  createdAt: string;
};

const listingsKey = "importindia.pendingListings";
const usersKey = "importindia.users";
const messagesKey = "importindia.contactMessages";

export function AdminProfilePanel() {
  const [listings, setListings] = useState<PendingListing[]>([]);
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setListings(JSON.parse(window.localStorage.getItem(listingsKey) || "[]") as PendingListing[]);
    setAccounts(JSON.parse(window.localStorage.getItem(usersKey) || "[]") as StoredAccount[]);
    setMessages(JSON.parse(window.localStorage.getItem(messagesKey) || "[]") as ContactMessage[]);
  }, []);

  const pendingManufacturers = accounts.filter((account) => account.role === "MANUFACTURER" && account.accountStatus !== "ACTIVE");
  const pendingListings = listings.filter((listing) => listing.status === "PENDING_ADMIN_APPROVAL");

  function updateListing(id: string, status: PendingListing["status"]) {
    const next = listings.map((listing) => (listing.id === id ? { ...listing, status } : listing));
    setListings(next);
    window.localStorage.setItem(listingsKey, JSON.stringify(next));
  }

  function approveManufacturer(id: string) {
    const next = accounts.map((account) =>
      account.id === id ? { ...account, accountStatus: "ACTIVE" as const, verificationStatus: "APPROVED" as const } : account
    );
    setAccounts(next);
    window.localStorage.setItem(usersKey, JSON.stringify(next));
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b1f4d] text-[#ff9f1c]">
              <UserCog size={25} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Admin profile</p>
              <h1 className="text-3xl font-black text-[#0b1f4d]">Emitrix Operations Admin</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/manufacturers" className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-[#0b1f4d]">
              Manufacturer queue
            </Link>
            <Link href="/admin/moderation" className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-[#0b1f4d]">
              Listing moderation
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Metric label="Pending manufacturers" value={pendingManufacturers.length} />
          <Metric label="Pending listings" value={pendingListings.length} />
          <Metric label="Contact messages" value={messages.length} />
          <Metric label="Admin role" value="Super Admin" />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="text-[#0b1f4d]" />
          <h2 className="text-2xl font-black text-[#0b1f4d]">Manufacturer Approvals</h2>
        </div>
        {pendingManufacturers.length ? (
          <div className="space-y-3">
            {pendingManufacturers.map((account) => (
              <article key={account.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <h3 className="font-black text-slate-950">{account.companyName || account.fullName}</h3>
                  <p className="text-sm font-bold text-slate-500">{account.email}</p>
                </div>
                <button onClick={() => approveManufacturer(account.id)} className="focus-ring inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">
                  <BadgeCheck size={16} />
                  Approve manufacturer
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">No pending manufacturer accounts from local signups.</p>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Mail className="text-[#0b1f4d]" />
          <h2 className="text-2xl font-black text-[#0b1f4d]">Contact Requests</h2>
        </div>
        {messages.length ? (
          <div className="space-y-3">
            {messages.map((message) => (
              <article key={message.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-slate-950">{message.subject}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {message.name} / {message.email} / {new Date(message.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{message.status}</span>
                </div>
                <p className="mt-3 leading-7 text-slate-700">{message.message}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">No contact requests yet. Messages from Contact Us will appear here.</p>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <ClipboardCheck className="text-[#0b1f4d]" />
          <h2 className="text-2xl font-black text-[#0b1f4d]">Add Your Listing Approvals</h2>
        </div>
        {listings.length ? (
          <div className="space-y-3">
            {listings.map((listing) => (
              <article key={listing.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-slate-950">{listing.productName}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {listing.manufacturerName} / {listing.segment} / MOQ {listing.moq.toLocaleString("en-IN")} / Rs {listing.priceInr.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{listing.status.replaceAll("_", " ")}</span>
                </div>
                {listing.status === "PENDING_ADMIN_APPROVAL" ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => updateListing(listing.id, "APPROVED")} className="focus-ring inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">
                      <BadgeCheck size={16} />
                      Approve listing
                    </button>
                    <button onClick={() => updateListing(listing.id, "REJECTED")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-600">
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">No submitted listings yet. Use Add Your Listing to create the first approval item.</p>
        )}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="text-2xl font-black text-[#0b1f4d]">{value}</div>
      <div className="mt-1 text-xs font-black uppercase text-slate-500">{label}</div>
    </div>
  );
}
