import type { Metadata } from "next";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacja o danych przetwarzanych przez Serwis Kórnik na tej stronie.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Polityka prywatności</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          <p>
            Administratorem strony jest {company.name}. Kontakt: {company.email}, telefon {company.phone},{" "}
            {company.address}, {company.city}.
          </p>
          <p>
            Strona nie zakłada kont, nie ma formularza rejestracji i nie prowadzi panelu klienta. Nie
            prosimy o dane w formularzu na stronie.
          </p>
          <p>
            Gdy dzwonisz albo piszesz, używamy numeru telefonu lub adresu e-mail tylko po to, żeby
            odpowiedzieć w sprawie sprzętu. Nie przekazujemy tych danych do celów marketingowych.
          </p>
          <p>
            Strona nie uruchamia narzędzi analitycznych ani reklamowych. Hosting może zapisywać
            techniczne logi połączeń (adres IP, data, przeglądarka) potrzebne do działania i
            bezpieczeństwa serwera.
          </p>
          <p>
            Możesz poprosić o informację, jakie dane z rozmowy lub korespondencji mamy, oraz o ich
            usunięcie — wystarczy wiadomość na {company.email}.
          </p>
          <p>Ta informacja dotyczy wyłącznie niniejszej strony.</p>
        </div>
      </article>
    </main>
  );
}
