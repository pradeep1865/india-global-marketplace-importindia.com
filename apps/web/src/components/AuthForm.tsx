"use client";

import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Building2, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuthStore, type AccountRole } from "@/store/auth-store";
import { useMarketplaceStore } from "@/store/marketplace-store";
import type { CountryRow } from "@/lib/location-table";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const result = login(email, password);
        if (!result.ok) setMessage("Backend login succeeded. Local demo profile was not found; use the API /auth/me route for server profile hydration.");
        router.push("/account");
        return;
      }
    } catch {
      // Fall back to demo auth store when the API/database is not running.
    }

    const result = login(email, password);
    setMessage(result.message);
    if (result.ok) router.push(result.account?.role === "ADMIN" ? "/admin/profile" : "/account");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <AuthMark />
      <div className="rounded-2xl bg-blue-50 p-3 text-xs font-bold leading-6 text-[#0b1f4d]">
        Admin demo login: admin@haylix.com / Admin@12345
      </div>
      <OAuthButton provider="Google" href={`${apiUrl}/api/v1/auth/oauth/google`} />
      <OAuthButton provider="Facebook" href={`${apiUrl}/api/v1/auth/oauth/facebook`} />
      <label className="block text-sm font-bold text-slate-700">
        Email
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4">
          <Mail size={18} className="text-slate-400" />
          <input name="email" className="focus-ring w-full py-3 outline-none" type="email" autoComplete="email" required />
        </div>
      </label>
      <label className="block text-sm font-bold text-slate-700">
        Password
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4">
          <LockKeyhole size={18} className="text-slate-400" />
          <input name="password" className="focus-ring w-full py-3 outline-none" type="password" autoComplete="current-password" required />
        </div>
      </label>
      {message ? <p className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">{message}</p> : null}
      <button className="focus-ring w-full rounded-full bg-[#0b1f4d] px-4 py-3 text-sm font-black text-white">Secure Login</button>
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <a href="/forgot-password">Forgot password?</a>
        <a href="/register">Create account</a>
      </div>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const detectedLocation = useMarketplaceStore((state) => state.location);
  const [role, setRole] = useState<AccountRole>("BUYER");
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");

  useEffect(() => {
    let cancelled = false;

    async function loadLocations() {
      try {
        const response = await fetch("/api/locations", { cache: "force-cache" });
        if (!response.ok) return;
        const data = (await response.json()) as { countries: CountryRow[] };
        if (cancelled) return;

        setCountries(data.countries);
        const detectedCountry = data.countries.find((country) => country.code === detectedLocation.countryCode) ?? data.countries.find((country) => country.code === "IN") ?? data.countries[0];
        if (!detectedCountry) return;

        setCountryCode(detectedCountry.code);
        setPhoneCountryCode(detectedCountry.dialCode);
        const detectedState =
          detectedCountry.states.find((state) => state.cities.some((city) => city.name.toLowerCase() === detectedLocation.city.toLowerCase())) ??
          detectedCountry.states[0];
        setStateId(detectedState?.id ?? "");
        const detectedCity = detectedState?.cities.find((city) => city.name.toLowerCase() === detectedLocation.city.toLowerCase()) ?? detectedState?.cities[0];
        setCityId(detectedCity?.id ?? "");
      } catch {
        // Keep India defaults if the location table cannot be loaded.
      }
    }

    void loadLocations();

    return () => {
      cancelled = true;
    };
  }, [detectedLocation.city, detectedLocation.countryCode]);

  const selectedCountry = useMemo(() => countries.find((country) => country.code === countryCode), [countries, countryCode]);
  const states = selectedCountry?.states ?? [];
  const selectedState = useMemo(() => states.find((state) => state.id === stateId) ?? states[0], [states, stateId]);
  const cities = selectedState?.cities ?? [];
  const selectedCity = useMemo(() => cities.find((city) => city.id === cityId) ?? cities[0], [cities, cityId]);

  function handleCountryChange(nextCountryCode: string) {
    const country = countries.find((item) => item.code === nextCountryCode);
    setCountryCode(nextCountryCode);
    setPhoneCountryCode(country?.dialCode ?? phoneCountryCode);
    const firstState = country?.states[0];
    setStateId(firstState?.id ?? "");
    setCityId(firstState?.cities[0]?.id ?? "");
  }

  function handleStateChange(nextStateId: string) {
    const state = states.find((item) => item.id === nextStateId);
    setStateId(nextStateId);
    setCityId(state?.cities[0]?.id ?? "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      role,
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
      fullName: role === "BUYER" ? String(form.get("name") || "") : undefined,
      companyName: role === "MANUFACTURER" ? String(form.get("name") || "") : undefined,
      dob: role === "BUYER" ? String(form.get("dobOrRegistration") || "") : undefined,
      registrationNumber: role === "MANUFACTURER" ? String(form.get("dobOrRegistration") || "") : undefined,
      country: selectedCountry?.name ?? String(form.get("country") || ""),
      countryCode,
      state: selectedState?.name ?? "",
      city: selectedCity?.name ?? "",
      addressLine: String(form.get("addressLine") || ""),
      location: [selectedCity?.name, selectedState?.name].filter(Boolean).join(", "),
      phoneCountryCode,
      phone: `${phoneCountryCode} ${String(form.get("phone") || "")}`.trim()
    };

    try {
      await fetch(`${apiUrl}/api/v1/auth/register/${role === "BUYER" ? "buyer" : "manufacturer"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body:
          role === "BUYER"
            ? JSON.stringify({
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
                dob: payload.dob,
                country: payload.country,
                state: payload.state,
                city: payload.city,
                addressLine: payload.addressLine,
                location: payload.location,
                phoneCountryCode: payload.phoneCountryCode,
                phone: payload.phone
              })
            : JSON.stringify({
                companyName: payload.companyName,
                email: payload.email,
                password: payload.password,
                registrationNumber: payload.registrationNumber,
                companyCountry: payload.country,
                companyState: payload.state,
                companyCity: payload.city,
                companyAddressLine: payload.addressLine,
                companyLocation: payload.location,
                phoneCountryCode: payload.phoneCountryCode,
                companyPhone: payload.phone
              })
      });
    } catch {
      // The local demo store below keeps the UI working when Postgres is not connected.
    }

    const account = register(payload);

    if (account.role === "MANUFACTURER") {
      setMessage("Manufacturer account saved and pending admin verification before login.");
      return;
    }

    router.push("/account");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("BUYER")}
          className={`focus-ring rounded-2xl border p-4 text-left ${role === "BUYER" ? "border-[#0b1f4d] bg-blue-50" : "border-slate-200"}`}
        >
          <UserRound className="mb-3 text-[#0b1f4d]" />
          <div className="font-black">Buyer</div>
          <div className="text-xs text-slate-500">Source, compare, and order.</div>
        </button>
        <button
          type="button"
          onClick={() => setRole("MANUFACTURER")}
          className={`focus-ring rounded-2xl border p-4 text-left ${role === "MANUFACTURER" ? "border-[#0b1f4d] bg-blue-50" : "border-slate-200"}`}
        >
          <Building2 className="mb-3 text-[#ff9f1c]" />
          <div className="font-black">Manufacturer</div>
          <div className="text-xs text-slate-500">Requires admin approval.</div>
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label={role === "BUYER" ? "Full name" : "Company name"} />
        <Field name="email" label="Email ID" type="email" />
        <Field name="password" label="Password" type="password" />
        <Field name="dobOrRegistration" label={role === "BUYER" ? "Date of birth" : "Company registration number"} />
        <SelectField label={role === "BUYER" ? "Country" : "Company country"} value={countryCode} onChange={handleCountryChange}>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </SelectField>
        <SelectField label={role === "BUYER" ? "State" : "Company state"} value={selectedState?.id ?? ""} onChange={handleStateChange}>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </SelectField>
        <SelectField label={role === "BUYER" ? "City" : "Company city"} value={selectedCity?.id ?? ""} onChange={setCityId}>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </SelectField>
        <Field name="addressLine" label={role === "BUYER" ? "Address" : "Company address"} />
        <label className="block text-sm font-bold text-slate-700 md:col-span-2">
          {role === "BUYER" ? "Phone number" : "Company phone number"}
          <div className="mt-2 grid gap-2 sm:grid-cols-[180px_1fr]">
            <select
              value={phoneCountryCode}
              onChange={(event) => setPhoneCountryCode(event.target.value)}
              className="focus-ring rounded-xl border border-slate-200 px-4 py-3"
              aria-label="Phone country code"
            >
              {countries.map((country) => (
                <option key={`${country.code}-${country.dialCode}`} value={country.dialCode}>
                  {country.dialCode} {country.name}
                </option>
              ))}
            </select>
            <input name="phone" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" type="tel" required />
          </div>
        </label>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <ShieldCheck className="shrink-0 text-emerald-600" />
        Details are saved to the account profile. Backend table persistence is wired through the API when PostgreSQL is connected.
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm font-bold text-amber-700">{message}</p> : null}
      <button className="focus-ring mt-5 w-full rounded-full bg-[#ff9f1c] px-4 py-3 text-sm font-black text-[#0b1f4d]">Create Account</button>
    </form>
  );
}

function AuthMark() {
  return (
    <div className="mb-2 flex items-center gap-3 rounded-2xl bg-[#0b1f4d] p-4 text-white">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl font-black text-[#0b1f4d]">II</div>
      <div>
        <div className="text-lg font-black">Haylix Secure ID</div>
        <div className="text-xs font-bold text-blue-100">One account for sourcing, checkout, and manufacturer tools.</div>
      </div>
    </div>
  );
}

function OAuthButton({ provider, href }: { provider: "Google" | "Facebook"; href: string }) {
  const isGoogle = provider === "Google";

  return (
    <a href={href} className="focus-ring flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
      <span className={`grid h-7 w-7 place-items-center rounded-full text-sm font-black text-white ${isGoogle ? "bg-red-500" : "bg-blue-600"}`}>
        {isGoogle ? "G" : "f"}
      </span>
      Continue with {provider}
    </a>
  );
}

function Field({ name, label, type = "text", defaultValue = "" }: { name: string; label: string; type?: string; defaultValue?: string }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <input name={name} defaultValue={defaultValue} className="focus-ring mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" type={type} required />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" required>
        {children}
      </select>
    </label>
  );
}
