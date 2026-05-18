"use client";

import Link from "next/link";
import { LogOut, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/store/auth-store";

export default function AccountPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  if (!currentUser) {
    return (
      <AppShell>
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-[#0b1f4d]">
            <UserRound size={30} />
          </div>
          <p className="mt-5 text-sm font-black uppercase text-[#ff9f1c]">Guest account</p>
          <h1 className="mt-2 text-4xl font-black text-[#0b1f4d]">You are browsing as a guest.</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            Sign in to view personal details, delivery addresses, phone number, password settings, saved products, orders, and checkout history.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="focus-ring rounded-full bg-[#0b1f4d] px-5 py-3 text-sm font-black text-white">Sign In</Link>
            <Link href="/register" className="focus-ring rounded-full bg-[#ff9f1c] px-5 py-3 text-sm font-black text-[#0b1f4d]">Create Account</Link>
          </div>
        </section>
      </AppShell>
    );
  }

  const displayName = currentUser.fullName || currentUser.companyName || currentUser.email;

  return (
    <AppShell>
      <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-black uppercase text-[#ff9f1c]">{currentUser.role === "BUYER" ? "Buyer account" : "Manufacturer account"}</p>
            <h1 className="mt-2 text-4xl font-black text-[#0b1f4d]">{displayName}</h1>
            <p className="mt-2 text-sm font-bold text-slate-600">{currentUser.email}</p>
          </div>
          <button onClick={logout} className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-600">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Personal details" icon={<UserRound />}>
          <Detail label={currentUser.role === "BUYER" ? "Full name" : "Company name"} value={displayName} />
          <Detail label="Email" value={currentUser.email} />
          <Detail label="Country" value={currentUser.country} />
          <Detail label="State" value={currentUser.state} />
          <Detail label="City" value={currentUser.city} />
          <Detail label="Location" value={currentUser.location} />
          {currentUser.registrationNumber ? <Detail label="Registration number" value={currentUser.registrationNumber} /> : null}
          {currentUser.dob ? <Detail label="Date of birth" value={currentUser.dob} /> : null}
        </Panel>

        <Panel title="Delivery addresses" icon={<MapPin />}>
          {currentUser.addresses.map((address) => (
            <Detail key={address.id} label={address.country} value={`${address.addressLine}, ${address.city}, ${address.state}`} />
          ))}
        </Panel>

        <Panel title="Phone number" icon={<Phone />}>
          <Detail label="Primary phone" value={currentUser.phone} />
        </Panel>

        <Panel title="Password" icon={<ShieldCheck />}>
          <Detail label="Password" value="Saved securely. Use reset flow to change it." />
          <button className="focus-ring mt-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-[#0b1f4d]">Change password</button>
        </Panel>
      </div>
    </AppShell>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-[#0b1f4d]">{icon}</div>
        <h2 className="text-2xl font-black text-[#0b1f4d]">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-slate-800">{value}</div>
    </div>
  );
}
