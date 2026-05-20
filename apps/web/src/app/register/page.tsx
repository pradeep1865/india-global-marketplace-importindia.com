import { AppShell } from "@/components/AppShell";
import { RegisterForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl">
        <p className="font-black uppercase text-[#ff9f1c]">Buyer or manufacturer</p>
        <h1 className="mt-3 text-4xl font-black text-[#0b1f4d]">Create your Emitrix account.</h1>
        <p className="mb-6 mt-3 max-w-2xl leading-7 text-slate-600">
          Manufacturer accounts are locked until manual admin approval, then receive a verified badge.
        </p>
        <RegisterForm />
      </section>
    </AppShell>
  );
}
