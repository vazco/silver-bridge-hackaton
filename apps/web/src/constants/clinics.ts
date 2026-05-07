export interface Clinic {
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
}

export const MOCK_CLINICS: Clinic[] = [
  {
    id: 1,
    name: "Przychodnia Medyczna Centrum",
    address: "ul. Marszałkowska 115",
    city: "Warszawa",
    postalCode: "00-102",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 15:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 2,
    name: "Przychodnia Rodzinna Zdrowie",
    address: "ul. Piotrkowska 87",
    city: "Łódź",
    postalCode: "90-423",
    openingHours: {
      weekdays: "7:00 - 19:00",
      saturday: "8:00 - 14:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 3,
    name: "Centrum Medyczne Vita",
    address: "ul. Długa 42",
    city: "Kraków",
    postalCode: "31-147",
    openingHours: {
      weekdays: "8:00 - 18:00",
      saturday: "9:00 - 13:00",
      sunday: "Zamknięte",
    },
  },
  {
    id: 4,
    name: "Przychodnia Specjalistyczna Eskulap",
    address: "ul. Św. Marcin 29",
    city: "Poznań",
    postalCode: "61-806",
    openingHours: {
      weekdays: "7:30 - 19:30",
      saturday: "8:00 - 15:00",
      sunday: "10:00 - 14:00",
    },
  },
  {
    id: 5,
    name: "Przychodnia Lekarza Rodzinnego Salus",
    address: "ul. Gdańska 156",
    city: "Wrocław",
    postalCode: "50-514",
    openingHours: {
      weekdays: "8:00 - 20:00",
      saturday: "9:00 - 16:00",
      sunday: "Zamknięte",
    },
  },
];

export const CLINIC_PAGE_TEXT = {
  pageTitle: "Lista Przychodni",
  pageDescription: "Znajdź przychodnie w swojej okolicy",
  openingHoursLabel: "Godziny otwarcia:",
  weekdaysLabel: "Pn-Pt:",
  saturdayLabel: "Sobota:",
  sundayLabel: "Niedziela:",
  noClinicsFallback: "Brak dostępnych przychodni.",
  loadingMessage: "Ładowanie przychodni...",
} as const;
