import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/przychodnie")({
  component: PrzychodniaComponent,
});

interface Przychodnia {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

const mockPrzychodnie: Przychodnia[] = [
  {
    id: 1,
    name: "Przychodnia Medyczna Centrum",
    address: "ul. Marszałkowska 45",
    city: "Warszawa",
    postalCode: "00-693",
    openingHours: {
      weekdays: "7:00 - 20:00",
      saturday: "8:00 - 15:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 2,
    name: "Przychodnia Rodzinna Zdrowie",
    address: "ul. Krakowska 123",
    city: "Wrocław",
    postalCode: "50-425",
    openingHours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 14:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 3,
    name: "Centrum Medyczne Vita",
    address: "ul. Długa 67",
    city: "Kraków",
    postalCode: "31-147",
    openingHours: {
      weekdays: "6:30 - 21:00",
      saturday: "8:00 - 16:00",
      sunday: "10:00 - 14:00",
    },
  },
  {
    id: 4,
    name: "Przychodnia Specjalistyczna Medyk",
    address: "ul. Piotrkowska 89",
    city: "Łódź",
    postalCode: "90-423",
    openingHours: {
      weekdays: "7:30 - 19:00",
      saturday: "8:00 - 13:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 5,
    name: "Przychodnia Lekarska Premium",
    address: "ul. Świętojańska 34",
    city: "Gdańsk",
    postalCode: "80-840",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "10:00 - 13:00",
    },
  },
];

function PrzychodniaComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Lista Przychodni</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPrzychodnie.map((przychodnia) => (
          <div
            key={przychodnia.id}
            className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-4 text-xl font-semibold">{przychodnia.name}</h2>

            <div className="mb-4 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <div className="text-sm">
                <p>{przychodnia.address}</p>
                <p>
                  {przychodnia.postalCode} {przychodnia.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <div className="text-sm">
                <div className="mb-1">
                  <span className="font-medium">Pon-Pt:</span>{" "}
                  <span className="text-muted-foreground">
                    {przychodnia.openingHours.weekdays}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-medium">Sobota:</span>{" "}
                  <span className="text-muted-foreground">
                    {przychodnia.openingHours.saturday}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Niedziela:</span>{" "}
                  <span className="text-muted-foreground">
                    {przychodnia.openingHours.sunday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
