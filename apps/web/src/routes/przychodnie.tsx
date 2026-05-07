import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ClinicCard } from "@/components/clinic-card";
import { mockClinics } from "@/data/mockClinics";

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
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
