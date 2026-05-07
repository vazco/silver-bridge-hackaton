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
  component: PrzychodnnieComponent,
});

interface Clinic {
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

const mockClinics: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Medyczna Centrum",
    address: "ul. Marszałkowska 115",
    city: "Warszawa",
    postalCode: "00-102",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 2,
    name: "Przychodnia Rodzinna Zdrowie",
    address: "ul. Piotrkowska 87",
    city: "Łódź",
    postalCode: "90-423",
    openingHours: {
      weekdays: "7:00 - 19:00",
      saturday: "8:00 - 14:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 3,
    name: "Centrum Medyczne Vita",
    address: "ul. Długa 42",
    city: "Kraków",
    postalCode: "31-147",
    openingHours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 13:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 4,
    name: "Przychodnia Specjalistyczna Eskulap",
    address: "ul. Św. Marcin 29",
    city: "Poznań",
    postalCode: "61-806",
    openingHours: {
      weekdays: "7:30 - 19:30",
      saturday: "8:00 - 15:00",
      sunday: "10:00 - 14:00",
    },
  },
  {
    id: 5,
    name: "Przychodnia Lekarza Rodzinnego Salus",
    address: "ul. Gdańska 156",
    city: "Wrocław",
    postalCode: "50-514",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 16:00",
      sunday: "Zamknięte",
    },
  },
];

function PrzychodnnieComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lista Przychodni</h1>
        <p className="text-muted-foreground">
          Znajdź przychodnie w swojej okolicy
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClinics.map((clinic) => (
          <Card key={clinic.id}>
            <CardHeader>
              <CardTitle>{clinic.name}</CardTitle>
              <CardDescription>
                <div className="flex items-start gap-2 mt-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>{clinic.address}</div>
                    <div>
                      {clinic.postalCode} {clinic.city}
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="font-medium text-foreground">
                    Godziny otwarcia:
                  </div>
                  <div>
                    <span className="font-medium">Pn-Pt:</span>{" "}
                    {clinic.openingHours.weekdays}
                  </div>
                  <div>
                    <span className="font-medium">Sobota:</span>{" "}
                    {clinic.openingHours.saturday}
                  </div>
                  <div>
                    <span className="font-medium">Niedziela:</span>{" "}
                    {clinic.openingHours.sunday}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
