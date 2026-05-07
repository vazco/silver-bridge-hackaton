import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { Suspense } from "react";

import { ErrorBoundary } from "@/components/error-boundary";
import { CLINIC_PAGE_TEXT, MOCK_CLINICS, type Clinic } from "@/constants/clinics";

export const Route = createFileRoute("/przychodnie")({
  component: PrzychodnieComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    meta: [
      {
        title: "Lista Przychodni - Znajdź przychodnie w swojej okolicy",
      },
      {
        name: "description",
        content:
          "Przeglądaj listę przychodni medycznych w największych miastach Polski. Sprawdź adresy, godziny otwarcia i wybierz najbliższą przychodnie.",
      },
    ],
  }),
});

function PrzychodnieComponent() {
  return (
    <ErrorBoundary>
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{CLINIC_PAGE_TEXT.pageTitle}</h1>
          <p className="text-muted-foreground">{CLINIC_PAGE_TEXT.pageDescription}</p>
        </header>

        <Suspense fallback={<LoadingState />}>
          <ClinicsList clinics={MOCK_CLINICS} />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <p className="text-muted-foreground">{CLINIC_PAGE_TEXT.loadingMessage}</p>
    </div>
  );
}

function ClinicsList({ clinics }: { clinics: Clinic[] }) {
  if (!clinics || clinics.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <p className="text-muted-foreground">{CLINIC_PAGE_TEXT.noClinicsFallback}</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Lista przychodni"
    >
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Card role="listitem">
      <CardHeader>
        <CardTitle>{clinic.name}</CardTitle>
        <CardDescription>
          <address className="flex items-start gap-2 mt-2 not-italic">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <div>{clinic.address}</div>
              <div>
                {clinic.postalCode} {clinic.city}
              </div>
            </div>
          </address>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              {CLINIC_PAGE_TEXT.openingHoursLabel}
            </div>
            <div>
              <span className="font-medium">{CLINIC_PAGE_TEXT.weekdaysLabel}</span>{" "}
              {clinic.openingHours.weekdays}
            </div>
            <div>
              <span className="font-medium">{CLINIC_PAGE_TEXT.saturdayLabel}</span>{" "}
              {clinic.openingHours.saturday}
            </div>
            <div>
              <span className="font-medium">{CLINIC_PAGE_TEXT.sundayLabel}</span>{" "}
              {clinic.openingHours.sunday}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
