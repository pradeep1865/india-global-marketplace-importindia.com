"use client";

import { create } from "zustand";

export type AccountRole = "BUYER" | "MANUFACTURER" | "ADMIN";

export type StoredAccount = {
  id: string;
  role: AccountRole;
  email: string;
  password: string;
  fullName?: string;
  companyName?: string;
  dob?: string;
  registrationNumber?: string;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  addressLine: string;
  location: string;
  phoneCountryCode: string;
  phone: string;
  accountStatus: "ACTIVE" | "PENDING_ADMIN_APPROVAL";
  verificationStatus?: "PENDING" | "APPROVED";
  provider?: "email" | "google" | "facebook";
  addresses: Array<{
    id: string;
    addressLine: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }>;
};

type AuthState = {
  currentUser: StoredAccount | null;
  hasHydrated: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => { ok: boolean; message: string; account?: StoredAccount };
  register: (account: Omit<StoredAccount, "id" | "accountStatus" | "verificationStatus" | "provider" | "addresses">) => StoredAccount;
  logout: () => void;
};

const usersKey = "importindia.users";
const currentUserKey = "importindia.currentUser";
const demoAdmin: StoredAccount = {
  id: "admin-importindia-demo",
  role: "ADMIN",
  email: "admin@haylix.com",
  password: "Admin@12345",
  fullName: "Haylix Super Admin",
  country: "India",
  countryCode: "IN",
  state: "Delhi",
  city: "New Delhi",
  addressLine: "Haylix Operations Center",
  location: "New Delhi, Delhi",
  phoneCountryCode: "+91",
  phone: "+91 99999 00000",
  accountStatus: "ACTIVE",
  provider: "email",
  addresses: []
};

function readUsers() {
  if (typeof window === "undefined") return [demoAdmin];
  try {
    const users = (JSON.parse(window.localStorage.getItem(usersKey) || "[]") as StoredAccount[]) ?? [];
    return users.some((user) => user.email.toLowerCase() === demoAdmin.email) ? users : [demoAdmin, ...users];
  } catch {
    return [demoAdmin];
  }
}

function writeUsers(users: StoredAccount[]) {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
}

function publicAccount(account: StoredAccount) {
  return { ...account, password: "" };
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  hasHydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(currentUserKey);
    set({ currentUser: raw ? (JSON.parse(raw) as StoredAccount) : null, hasHydrated: true });
  },
  login: (email, password) => {
    const account = readUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!account || account.password !== password) return { ok: false, message: "Invalid email or password." };
    if (account.role === "MANUFACTURER" && account.accountStatus !== "ACTIVE") {
      return { ok: false, message: "Manufacturer account is pending admin verification." };
    }

    const sessionAccount = publicAccount(account);
    window.localStorage.setItem(currentUserKey, JSON.stringify(sessionAccount));
    set({ currentUser: sessionAccount });
    return { ok: true, message: "Logged in successfully.", account: sessionAccount };
  },
  register: (account) => {
    const users = readUsers();
    const saved: StoredAccount = {
      ...account,
      id: crypto.randomUUID(),
      accountStatus: account.role === "MANUFACTURER" ? "PENDING_ADMIN_APPROVAL" : "ACTIVE",
      verificationStatus: account.role === "MANUFACTURER" ? "PENDING" : undefined,
      provider: "email",
      addresses: [
        {
          id: crypto.randomUUID(),
          addressLine: account.addressLine,
          city: account.city,
          state: account.state,
          country: account.country,
          zipCode: ""
        }
      ]
    };

    const nextUsers = users.filter((user) => user.email.toLowerCase() !== saved.email.toLowerCase()).concat(saved);
    writeUsers(nextUsers);

    if (saved.role === "BUYER") {
      const sessionAccount = publicAccount(saved);
      window.localStorage.setItem(currentUserKey, JSON.stringify(sessionAccount));
      set({ currentUser: sessionAccount });
    }

    return saved;
  },
  logout: () => {
    window.localStorage.removeItem(currentUserKey);
    set({ currentUser: null });
  }
}));
