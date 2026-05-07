import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/przychodnie")({
  component: PrzychodnieComponent,
});

interface Clinic {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  phone: string;
}

const mockClinics: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Centrum Zdrowia",
    address: "ul. Marszałkowska 45",
    city: "Warszawa",
    postalCode: "00-693",
    hours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "Zamknięte",
    },
    phone: "+48 22 123 45 67",
  },
  {
    id: 2,
    name: "Medica Plus",
    address: "ul. Piotrkowska 123",
    city: "Łódź",
    postalCode: "90-425",
    hours: {
      weekdays: "7:00 - 19:00",
      saturday: "8:00 - 14:00",
      sunday: "Zamknięte",
    },
    phone: "+48 42 234 56 78",
  },
  {
    id: 3,
    name: "Przychodnia Rodzinna Medicus",
    address: "ul. Floriańska 67",
    city: "Kraków",
    postalCode: "31-019",
    hours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 13:00",
      sunday: "Zamknięte",
    },
    phone: "+48 12 345 67 89",
  },
  {
    id: 4,
    name: "Przychodnia Zdrowie",
    address: "ul. Długa 89",
    city: "Wrocław",
    postalCode: "50-231",
    hours: {
      weekdays: "7:30 - 20:00",
      saturday: "8:00 - 16:00",
      sunday: "10:00 - 14:00",
    },
    phone: "+48 71 456 78 90",
  },
  {
    id: 5,
    name: "Centrum Medyczne Vita",
    address: "ul. Świętojańska 34",
    city: "Gdańsk",
    postalCode: "80-840",
    hours: {
      weekdays: "8:00 - 19:00",
      saturday: "9:00 - 14:00",
      sunday: "Zamknięte",
    },
    phone: "+48 58 567 89 01",
  },
];

function PrzychodnieComponent() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nasze Przychodnie</h1>
        <p className="text-muted-foreground">
          Znajdź najbliższą przychodnię i sprawdź godziny otwarcia
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {mockClinics.map((clinic) => (
          <Card key={clinic.id}>
            <CardHeader>
              <CardTitle>{clinic.name}</CardTitle>
              <CardDescription>{clinic.phone}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{clinic.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {clinic.postalCode} {clinic.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Poniedziałek - Piątek:
                    </span>
                    <span className="text-sm font-medium">
                      {clinic.hours.weekdays}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Sobota:
                    </span>
                    <span className="text-sm font-medium">
                      {clinic.hours.saturday}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Niedziela:
                    </span>
                    <span className="text-sm font-medium">
                      {clinic.hours.sunday}
                    </span>
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
