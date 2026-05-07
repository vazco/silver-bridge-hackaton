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
  component: PrzychodniaComponent,
});

interface Clinic {
  id: number;
  name: string;
  address: string;
  openingHours: string;
}

const mockClinics: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Centrum Zdrowia",
    address: "ul. Marszałkowska 45, 00-001 Warszawa",
    openingHours: "Poniedziałek - Piątek: 8:00 - 20:00, Sobota: 9:00 - 14:00",
  },
  {
    id: 2,
    name: "Medica Prima",
    address: "ul. Kościuszki 12, 31-002 Kraków",
    openingHours: "Poniedziałek - Piątek: 7:00 - 19:00, Sobota: 8:00 - 13:00",
  },
  {
    id: 3,
    name: "Przychodnia Rodzinna Vita",
    address: "ul. Piłsudskiego 88, 50-003 Wrocław",
    openingHours: "Poniedziałek - Piątek: 8:00 - 18:00, Sobota: 9:00 - 13:00",
  },
  {
    id: 4,
    name: "Centrum Medyczne Eskulap",
    address: "ul. Słowackiego 23, 60-004 Poznań",
    openingHours: "Poniedziałek - Piątek: 7:30 - 20:00, Sobota: 8:00 - 15:00",
  },
  {
    id: 5,
    name: "Poradnia Zdrowia Active Med",
    address: "ul. Gdańska 67, 80-005 Gdańsk",
    openingHours: "Poniedziałek - Piątek: 8:00 - 19:00, Sobota: 9:00 - 14:00",
  },
];

function PrzychodniaComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Lista Przychodni</h1>
        <p className="text-muted-foreground">
          Znajdź przychodnie w swoim mieście i sprawdź godziny otwarcia
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {mockClinics.map((clinic) => (
          <Card key={clinic.id}>
            <CardHeader>
              <CardTitle>{clinic.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Adres</p>
                  <p className="text-sm text-muted-foreground">{clinic.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Godziny otwarcia</p>
                  <p className="text-sm text-muted-foreground">{clinic.openingHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
