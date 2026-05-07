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
  phone: string;
}

export const mockClinics: Clinic[] = [
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
