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
  component: PrzychodnieComponent,
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
  phone: string;
}

const mockClinics: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Centrum Zdrowia",
    address: "ul. Marszałkowska 42",
    city: "Warszawa",
    postalCode: "00-548",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "Zamknięte",
    },
    phone: "+48 22 123 45 67",
  },
  {
    id: 2,
    name: "Przychodnia Medica Plus",
    address: "ul. Piotrkowska 156",
    city: "Łódź",
    postalCode: "90-226",
    openingHours: {
      weekdays: "7:00 - 19:00",
      saturday: "8:00 - 14:00",
      sunday: "Zamknięte",
    },
    phone: "+48 42 234 56 78",
  },
  {
    id: 3,
    name: "Przychodnia Rodzinna Vita",
    address: "ul. Floriańska 28",
    city: "Kraków",
    postalCode: "31-019",
    openingHours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 13:00",
      sunday: "Zamknięte",
    },
    phone: "+48 12 345 67 89",
  },
  {
    id: 4,
    name: "Centrum Medyczne Zdrowie+",
    address: "ul. Długa 89",
    city: "Gdańsk",
    postalCode: "80-831",
    openingHours: {
      weekdays: "7:30 - 20:00",
      saturday: "8:00 - 16:00",
      sunday: "10:00 - 14:00",
    },
    phone: "+48 58 456 78 90",
  },
  {
    id: 5,
    name: "Przychodnia Nova Med",
    address: "ul. Świdnicka 53",
    city: "Wrocław",
    postalCode: "50-030",
    openingHours: {
      weekdays: "8:00 - 19:00",
      saturday: "9:00 - 15:00",
      sunday: "Zamknięte",
    },
    phone: "+48 71 567 89 01",
  },
];

function PrzychodnieComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Przychodnie</h1>
        <p className="text-muted-foreground">
          Lista dostępnych przychodni medycznych
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClinics.map((clinic) => (
          <Card key={clinic.id} className="flex flex-col">
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

            <CardContent className="flex-1">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Godziny otwarcia</span>
                  </div>
                  <div className="ml-6 space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Pn - Pt:</span>
                      <span className="font-medium text-foreground">
                        {clinic.openingHours.weekdays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sobota:</span>
                      <span className="font-medium text-foreground">
                        {clinic.openingHours.saturday}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niedziela:</span>
                      <span className="font-medium text-foreground">
                        {clinic.openingHours.sunday}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Telefon: </span>
                    <a
                      href={`tel:${clinic.phone}`}
                      className="font-medium hover:underline"
                    >
                      {clinic.phone}
                    </a>
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
