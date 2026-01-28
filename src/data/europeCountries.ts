import type { Country } from '../types/game';

export const europeCountries: Country[] = [
  {
    id: 'portugal',
    name: 'Portugal',
    capital: 'Lisbon',
    borders: ['spain'],
    coordinates: [39.3999, -8.2245]
  },
  {
    id: 'spain',
    name: 'Spain',
    capital: 'Madrid',
    borders: ['portugal', 'france', 'andorra'],
    coordinates: [40.4168, -3.7038]
  },
  {
    id: 'france',
    name: 'France',
    capital: 'Paris',
    borders: ['spain', 'andorra', 'monaco', 'italy', 'switzerland', 'germany', 'luxembourg', 'belgium'],
    coordinates: [46.2276, 2.2137]
  },
  {
    id: 'andorra',
    name: 'Andorra',
    capital: 'Andorra la Vella',
    borders: ['spain', 'france'],
    coordinates: [42.5063, 1.5218]
  },
  {
    id: 'monaco',
    name: 'Monaco',
    capital: 'Monaco',
    borders: ['france'],
    coordinates: [43.7384, 7.4246]
  },
  {
    id: 'italy',
    name: 'Italy',
    capital: 'Rome',
    borders: ['france', 'switzerland', 'austria', 'slovenia', 'san_marino', 'vatican'],
    coordinates: [41.8719, 12.5674]
  },
  {
    id: 'san_marino',
    name: 'San Marino',
    capital: 'San Marino',
    borders: ['italy'],
    coordinates: [43.9424, 12.4578]
  },
  {
    id: 'vatican',
    name: 'Vatican City',
    capital: 'Vatican City',
    borders: ['italy'],
    coordinates: [41.9029, 12.4534]
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    capital: 'Bern',
    borders: ['france', 'italy', 'austria', 'liechtenstein', 'germany'],
    coordinates: [46.8182, 8.2275]
  },
  {
    id: 'liechtenstein',
    name: 'Liechtenstein',
    capital: 'Vaduz',
    borders: ['switzerland', 'austria'],
    coordinates: [47.1660, 9.5554]
  },
  {
    id: 'austria',
    name: 'Austria',
    capital: 'Vienna',
    borders: ['switzerland', 'liechtenstein', 'germany', 'czechia', 'slovakia', 'hungary', 'slovenia', 'italy'],
    coordinates: [47.5162, 14.5501]
  },
  {
    id: 'germany',
    name: 'Germany',
    capital: 'Berlin',
    borders: ['france', 'luxembourg', 'belgium', 'netherlands', 'denmark', 'poland', 'czechia', 'austria', 'switzerland'],
    coordinates: [51.1657, 10.4515]
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    capital: 'Luxembourg City',
    borders: ['france', 'belgium', 'germany'],
    coordinates: [49.8153, 6.1296]
  },
  {
    id: 'belgium',
    name: 'Belgium',
    capital: 'Brussels',
    borders: ['france', 'luxembourg', 'germany', 'netherlands'],
    coordinates: [50.5039, 4.4699]
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    capital: 'Amsterdam',
    borders: ['belgium', 'germany'],
    coordinates: [52.1326, 5.2913]
  },
  {
    id: 'denmark',
    name: 'Denmark',
    capital: 'Copenhagen',
    borders: ['germany'],
    coordinates: [56.2639, 9.5018]
  },
  {
    id: 'poland',
    name: 'Poland',
    capital: 'Warsaw',
    borders: ['germany', 'czechia', 'slovakia', 'ukraine', 'belarus', 'lithuania'],
    coordinates: [51.9194, 19.1451]
  },
  {
    id: 'czechia',
    name: 'Czechia',
    capital: 'Prague',
    borders: ['germany', 'poland', 'slovakia', 'austria'],
    coordinates: [49.8175, 15.4730]
  },
  {
    id: 'slovakia',
    name: 'Slovakia',
    capital: 'Bratislava',
    borders: ['czechia', 'poland', 'ukraine', 'hungary', 'austria'],
    coordinates: [48.6690, 19.6990]
  },
  {
    id: 'hungary',
    name: 'Hungary',
    capital: 'Budapest',
    borders: ['austria', 'slovakia', 'ukraine', 'romania', 'serbia', 'croatia', 'slovenia'],
    coordinates: [47.1625, 19.5033]
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
    capital: 'Ljubljana',
    borders: ['italy', 'austria', 'hungary', 'croatia'],
    coordinates: [46.1512, 14.9955]
  },
  {
    id: 'croatia',
    name: 'Croatia',
    capital: 'Zagreb',
    borders: ['slovenia', 'hungary', 'serbia', 'bosnia', 'montenegro'],
    coordinates: [45.1000, 15.2000]
  },
  {
    id: 'bosnia',
    name: 'Bosnia and Herzegovina',
    capital: 'Sarajevo',
    borders: ['croatia', 'serbia', 'montenegro'],
    coordinates: [43.9159, 17.6791]
  },
  {
    id: 'serbia',
    name: 'Serbia',
    capital: 'Belgrade',
    borders: ['hungary', 'romania', 'bulgaria', 'north_macedonia', 'kosovo', 'montenegro', 'bosnia', 'croatia'],
    coordinates: [44.0165, 21.0059]
  },
  {
    id: 'montenegro',
    name: 'Montenegro',
    capital: 'Podgorica',
    borders: ['croatia', 'bosnia', 'serbia', 'kosovo', 'albania'],
    coordinates: [42.7087, 19.3744]
  },
  {
    id: 'kosovo',
    name: 'Kosovo',
    capital: 'Pristina',
    borders: ['serbia', 'montenegro', 'albania', 'north_macedonia'],
    coordinates: [42.6026, 20.9030]
  },
  {
    id: 'albania',
    name: 'Albania',
    capital: 'Tirana',
    borders: ['montenegro', 'kosovo', 'north_macedonia', 'greece'],
    coordinates: [41.1533, 20.1683]
  },
  {
    id: 'north_macedonia',
    name: 'North Macedonia',
    capital: 'Skopje',
    borders: ['serbia', 'kosovo', 'albania', 'greece', 'bulgaria'],
    coordinates: [41.5124, 21.7453]
  },
  {
    id: 'greece',
    name: 'Greece',
    capital: 'Athens',
    borders: ['albania', 'north_macedonia', 'bulgaria', 'turkey'],
    coordinates: [39.0742, 21.8243]
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    capital: 'Sofia',
    borders: ['romania', 'serbia', 'north_macedonia', 'greece', 'turkey'],
    coordinates: [42.7339, 25.4858]
  },
  {
    id: 'romania',
    name: 'Romania',
    capital: 'Bucharest',
    borders: ['hungary', 'ukraine', 'moldova', 'bulgaria', 'serbia'],
    coordinates: [45.9432, 24.9668]
  },
  {
    id: 'moldova',
    name: 'Moldova',
    capital: 'Chișinău',
    borders: ['romania', 'ukraine'],
    coordinates: [47.4116, 28.3699]
  },
  {
    id: 'ukraine',
    name: 'Ukraine',
    capital: 'Kyiv',
    borders: ['poland', 'slovakia', 'hungary', 'romania', 'moldova', 'belarus'],
    coordinates: [48.3794, 31.1656]
  },
  {
    id: 'belarus',
    name: 'Belarus',
    capital: 'Minsk',
    borders: ['poland', 'lithuania', 'latvia', 'ukraine'],
    coordinates: [53.7098, 27.9534]
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
    capital: 'Vilnius',
    borders: ['poland', 'belarus', 'latvia'],
    coordinates: [55.1694, 23.8813]
  },
  {
    id: 'latvia',
    name: 'Latvia',
    capital: 'Riga',
    borders: ['lithuania', 'belarus', 'estonia'],
    coordinates: [56.8796, 24.6032]
  },
  {
    id: 'estonia',
    name: 'Estonia',
    capital: 'Tallinn',
    borders: ['latvia'],
    coordinates: [58.5953, 25.0136]
  },
  {
    id: 'finland',
    name: 'Finland',
    capital: 'Helsinki',
    borders: ['sweden', 'norway'],
    coordinates: [61.9241, 25.7482]
  },
  {
    id: 'sweden',
    name: 'Sweden',
    capital: 'Stockholm',
    borders: ['norway', 'finland'],
    coordinates: [60.1282, 18.6435]
  },
  {
    id: 'norway',
    name: 'Norway',
    capital: 'Oslo',
    borders: ['sweden', 'finland'],
    coordinates: [60.4720, 8.4689]
  },
  {
    id: 'iceland',
    name: 'Iceland',
    capital: 'Reykjavik',
    borders: [],
    coordinates: [64.9631, -19.0208]
  },
  {
    id: 'ireland',
    name: 'Ireland',
    capital: 'Dublin',
    borders: ['united_kingdom'],
    coordinates: [53.1424, -7.6921]
  },
  {
    id: 'united_kingdom',
    name: 'United Kingdom',
    capital: 'London',
    borders: ['ireland'],
    coordinates: [55.3781, -3.4360]
  },
  {
    id: 'turkey',
    name: 'Turkey',
    capital: 'Ankara',
    borders: ['greece', 'bulgaria'],
    coordinates: [38.9637, 35.2433]
  }
];

// Helper function to get country by ID
export const getCountryById = (id: string): Country | undefined => {
  return europeCountries.find(c => c.id === id);
};

// Helper function to get all border country names
export const getBorderCountries = (countryId: string): Country[] => {
  const country = getCountryById(countryId);
  if (!country) return [];
  return country.borders
    .map(borderId => getCountryById(borderId))
    .filter((c): c is Country => c !== undefined);
};

// Get total number of countries
export const TOTAL_COUNTRIES = europeCountries.length;
