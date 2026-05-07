import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@silver-bridge-hackaton/ui/components/card";
import { Clock, MapPin } from "lucide-react";
import { memo } from "react";

import type { Clinic } from "@/data/mockClinics";

interface ClinicCardProps {
  clinic: Clinic;
}

export const ClinicCard = memo(({ clinic }: ClinicCardProps) => {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{clinic.name}</CardTitle>
        <CardDescription>
          <div className="flex items-start gap-2 mt-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
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
              <Clock className="h-4 w-4" aria-hidden="true" />
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
                className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label={`Zadzwoń do ${clinic.name}`}
              >
                {clinic.phone}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ClinicCard.displayName = "ClinicCard";
