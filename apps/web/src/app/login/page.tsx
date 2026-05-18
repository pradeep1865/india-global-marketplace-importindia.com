import { AppShell } from "@/components/AppShell";
import { LoginForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="font-black uppercase text-[#ff9f1c]">Secure marketplace access</p>
          <h1 className="mt-3 text-5xl font-black text-[#0b1f4d]">Login to source, sell, and manage orders globally.</h1>
          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Buyers can continue checkout and saved searches. Manufacturers can access the console after admin verification.
          </p>
        </div>
        <LoginForm />
      </section>
    </AppShell>
  );
}
