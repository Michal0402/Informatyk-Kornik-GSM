import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Panel treści",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  if (!process.env.ADMIN_PASSWORD) notFound();
  return (
    <main>
      <AdminPanel />
    </main>
  );
}
