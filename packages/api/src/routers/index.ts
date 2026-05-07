import { publicProcedure, router } from "../index";

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

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  clinics: router({
    list: publicProcedure.query(() => {
      return MOCK_CLINICS;
    }),
  }),
});
export type AppRouter = typeof appRouter;
