import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { Skeleton } from "@silver-bridge-hackaton/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Clock, MapPin } from "lucide-react";

import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/przychodnie")({
  component: PrzychodniaComponent,
});

function PrzychodniaComponent() {
  const clinicsQuery = useQuery(trpc.clinics.list.queryOptions());

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nasze Przychodnie</h1>
        <p className="text-muted-foreground">
          Znajdź najbliższą przychodnię i sprawdź godziny otwarcia
        </p>
      </header>

      {clinicsQuery.isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" role="status" aria-live="polite" aria-label="Ładowanie przychodni">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {clinicsQuery.isError && (
        <div
          className="flex items-center gap-3 p-6 border border-destructive/50 bg-destructive/10 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" aria-hidden="true" />
          <div>
            <h2 className="font-semibold text-destructive mb-1">
              Nie udało się załadować przychodni
            </h2>
            <p className="text-sm text-muted-foreground">
              {clinicsQuery.error?.message || "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."}
            </p>
          </div>
        </div>
      )}

      {clinicsQuery.isSuccess && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" role="list" aria-label="Lista przychodni">
          {clinicsQuery.data.map((clinic) => (
            <Card
              key={clinic.id}
              className="hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary"
              tabIndex={0}
              role="listitem"
              aria-label={`Przychodnia: ${clinic.name}`}
            >
              <CardHeader>
                <CardTitle>{clinic.name}</CardTitle>
                <CardDescription className="flex items-start gap-2 mt-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <address className="not-italic">
                    {clinic.address}
                    <br />
                    {clinic.postalCode} {clinic.city}
                    <br />
                    Tel: <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="hover:underline">{clinic.phone}</a>
                  </address>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>Godziny otwarcia:</span>
                  </div>
                  <dl className="space-y-1 pl-6">
                    {clinic.openingHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-muted-foreground"
                      >
                        <dt className="font-medium">{schedule.days}:</dt>
                        <dd>{schedule.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
