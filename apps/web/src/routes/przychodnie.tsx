import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/przychodnie")({
  head: () => ({
    meta: [{ title: "Przychodnie" }],
  }),
  component: PrzychodniePage,
});

const MOCK_CLINICS = [
  {
    name: 'NZOZ „Rodzinna Opieka"',
    address: "ul. Marszałkowska 24/26, 00-576 Warszawa",
    hours: [
      "Pon–Pt: 8:00–20:00",
      "Sob: 9:00–14:00",
      "Niedziela: nieczynne",
    ],
  },
  {
    name: 'Przychodnia POZ „Zdrowie+"',
    address: "ul. Karmelicka 11, 31-133 Kraków",
    hours: [
      "Pon–Pt: 7:30–19:00",
      "Sob: 8:00–12:00",
      "Niedziela: nieczynne",
    ],
  },
  {
    name: "Centrum Medyczne Eskulap",
    address: "al. Niepodległości 18, 61-714 Poznań",
    hours: [
      "Pon–Pt: 8:00–21:00",
      "Sob–Ndz: 9:00–15:00",
    ],
  },
  {
    name: 'Przychodnia Specjalistyczna „Słoneczna"',
    address: "ul. Piotrkowska 105, 90-425 Łódź",
    hours: [
      "Pon–Pt: 8:00–18:00",
      "Sob: 9:00–13:00",
      "Niedziela: nieczynne",
    ],
  },
  {
    name: "MultiMedica Wrocław",
    address: "pl. Grunwaldzki 22, 50-363 Wrocław",
    hours: [
      "Pon–Pt: 7:00–22:00",
      "Sob: 8:00–16:00",
      "Niedziela: 10:00–14:00 (rejestracja)",
    ],
  },
] as const;

function PrzychodniePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Przychodnie</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Przykładowa lista placówek wraz z adresem i godzinami otwarcia (dane demonstracyjne).
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {MOCK_CLINICS.map((clinic) => (
          <li key={clinic.name}>
            <Card className="h-full">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-base">{clinic.name}</CardTitle>
                <CardDescription className="flex items-start gap-2 pt-1">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span>{clinic.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <div>
                    <p className="text-xs font-medium text-foreground">Godziny otwarcia</p>
                    <ul className="mt-1 space-y-0.5 text-muted-foreground">
                      {clinic.hours.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
