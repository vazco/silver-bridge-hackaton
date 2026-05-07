import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

import { mockClinics, type Clinic } from "@/data/mockClinics";

export const Route = createFileRoute("/przychodnie")({
  component: PrzychodnieComponent,
  head: () => ({
    meta: [
      {
        title: "Nasze Przychodnie - Silver Bridge Hackaton",
      },
      {
        name: "description",
        content:
          "Znajdź najbliższą przychodnię. Lista naszych placówek z godzinami otwarcia i danymi kontaktowymi.",
      },
      {
        property: "og:title",
        content: "Nasze Przychodnie",
      },
      {
        property: "og:description",
        content: "Znajdź najbliższą przychodnię. Lista 5 placówek w całej Polsce.",
      },
    ],
  }),
});

function PrzychodnieComponent() {
  const {
    data: clinics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clinics"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return mockClinics;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Przychodnie</h1>
          <p className="text-muted-foreground">
            Lista dostępnych przychodni medycznych
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Ładowanie przychodni...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Przychodnie</h1>
          <p className="text-muted-foreground">
            Lista dostępnych przychodni medycznych
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-destructive">
            Błąd: {error instanceof Error ? error.message : "Nie udało się załadować przychodni"}
          </p>
        </div>
      </div>
    );
  }

  if (!clinics || clinics.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Przychodnie</h1>
          <p className="text-muted-foreground">
            Lista dostępnych przychodni medycznych
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">
            Brak dostępnych przychodni.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Przychodnie</h1>
        <p className="text-muted-foreground">
          Lista dostępnych przychodni medycznych
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clinics.map((clinic) => (
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
                      href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                      className="font-medium hover:underline"
                      aria-label={`Zadzwoń do ${clinic.name}`}
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
