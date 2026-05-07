import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
    name: "Przychodnia Medyczna Centrum",
    address: "ul. Marszałkowska 45",
    city: "Warszawa",
    postalCode: "00-693",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "Nieczynne",
    },
    phone: "+48 22 123 45 67",
  },
  {
    id: 2,
    name: "Przychodnia Rodzinna Zdrowie",
    address: "ul. Piotrkowska 128",
    city: "Łódź",
    postalCode: "90-006",
    openingHours: {
      weekdays: "7:00 - 19:00",
      saturday: "8:00 - 14:00",
      sunday: "Nieczynne",
    },
    phone: "+48 42 234 56 78",
  },
  {
    id: 3,
    name: "Przychodnia Vita Med",
    address: "ul. Floriańska 31",
    city: "Kraków",
    postalCode: "31-019",
    openingHours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 13:00",
      sunday: "Nieczynne",
    },
    phone: "+48 12 345 67 89",
  },
  {
    id: 4,
    name: "Centrum Medyczne Eskulap",
    address: "ul. Świętojańska 56",
    city: "Gdańsk",
    postalCode: "80-840",
    openingHours: {
      weekdays: "7:30 - 20:00",
      saturday: "8:00 - 16:00",
      sunday: "10:00 - 14:00",
    },
    phone: "+48 58 456 78 90",
  },
  {
    id: 5,
    name: "Przychodnia Rodzinna Zdrowy Start",
    address: "ul. Św. Marcin 80",
    city: "Poznań",
    postalCode: "61-809",
    openingHours: {
      weekdays: "8:00 - 19:00",
      saturday: "9:00 - 14:00",
      sunday: "Nieczynne",
    },
    phone: "+48 61 567 89 01",
  },
];

function PrzychodnieComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nasze Przychodnie</h1>
        <p className="text-muted-foreground">
          Znajdź najbliższą przychodnię w Twojej okolicy
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {mockClinics.map((clinic) => (
          <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{clinic.name}</CardTitle>
              <CardDescription className="flex items-start gap-2 mt-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {clinic.address}
                  <br />
                  {clinic.postalCode} {clinic.city}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium text-sm">Godziny otwarcia:</span>
                </div>
                <div className="ml-6 space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Poniedziałek - Piątek:</span>
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
                <span className="text-sm text-muted-foreground">Telefon: </span>
                <a
                  href={`tel:${clinic.phone}`}
                  className="text-sm font-medium hover:underline"
                >
                  {clinic.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
