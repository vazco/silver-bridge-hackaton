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
  city: string;
  postalCode: string;
  phone: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
}

const MOCK_CLINICS: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Medyczna Centrum",
    address: "ul. Marszałkowska 45",
    city: "Warszawa",
    postalCode: "00-693",
    phone: "+48 22 123 45 67",
    openingHours: [
      { days: "Poniedziałek - Piątek", hours: "8:00 - 20:00" },
      { days: "Sobota", hours: "9:00 - 15:00" },
      { days: "Niedziela", hours: "Nieczynne" },
    ],
  },
  {
    id: 2,
    name: "Przychodnia Rodzinna Zdrowie",
    address: "ul. Długa 12",
    city: "Kraków",
    postalCode: "31-147",
    phone: "+48 12 987 65 43",
    openingHours: [
      { days: "Poniedziałek - Piątek", hours: "7:30 - 19:00" },
      { days: "Sobota", hours: "8:00 - 14:00" },
      { days: "Niedziela", hours: "Nieczynne" },
    ],
  },
  {
    id: 3,
    name: "Przychodnia Śródmieście",
    address: "ul. Piotrkowska 78",
    city: "Łódź",
    postalCode: "90-103",
    phone: "+48 42 555 44 33",
    openingHours: [
      { days: "Poniedziałek - Czwartek", hours: "8:00 - 18:00" },
      { days: "Piątek", hours: "8:00 - 16:00" },
      { days: "Sobota - Niedziela", hours: "Nieczynne" },
    ],
  },
  {
    id: 4,
    name: "Przychodnia Medica Plus",
    address: "ul. Świętojańska 23",
    city: "Gdańsk",
    postalCode: "80-840",
    phone: "+48 58 321 09 87",
    openingHours: [
      { days: "Poniedziałek - Piątek", hours: "7:00 - 21:00" },
      { days: "Sobota", hours: "9:00 - 17:00" },
      { days: "Niedziela", hours: "10:00 - 14:00" },
    ],
  },
  {
    id: 5,
    name: "Przychodnia Vita Health",
    address: "ul. Główna 56",
    city: "Wrocław",
    postalCode: "50-043",
    phone: "+48 71 678 90 12",
    openingHours: [
      { days: "Poniedziałek - Piątek", hours: "8:00 - 19:00" },
      { days: "Sobota", hours: "9:00 - 13:00" },
      { days: "Niedziela", hours: "Nieczynne" },
    ],
  },
];

function PrzychodniaComponent() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nasze Przychodnie</h1>
        <p className="text-muted-foreground">
          Znajdź najbliższą przychodnię i sprawdź godziny otwarcia
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {MOCK_CLINICS.map((clinic) => (
          <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{clinic.name}</CardTitle>
              <CardDescription className="flex items-start gap-2 mt-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {clinic.address}
                  <br />
                  {clinic.postalCode} {clinic.city}
                  <br />
                  Tel: {clinic.phone}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  <span>Godziny otwarcia:</span>
                </div>
                <div className="space-y-1 pl-6">
                  {clinic.openingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-muted-foreground"
                    >
                      <span className="font-medium">{schedule.days}:</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
