import type { Question, QuestionType } from '../types/game';
import { getCountryById } from '../data/europeCountries';

// Question templates for each type
const questionTemplates: Record<QuestionType, (countryName: string, capital: string) => string> = {
  flag: () => 'Which country does this flag belong to?',
  capital_photo: (_, capital) => `This is a photo of ${capital}. Which country is it the capital of?`,
  landmark: () => 'In which country can you find this famous landmark?',
  river: () => 'Which country is this river located in?',
  geography: () => 'Which country matches this geographical description?'
};

// Sample flag URLs (using flagcdn.com - free flag API)
const getFlagUrl = (countryId: string): string => {
  const countryCodeMap: Record<string, string> = {
    portugal: 'pt', spain: 'es', france: 'fr', andorra: 'ad', monaco: 'mc',
    italy: 'it', san_marino: 'sm', vatican: 'va', switzerland: 'ch',
    liechtenstein: 'li', austria: 'at', germany: 'de', luxembourg: 'lu',
    belgium: 'be', netherlands: 'nl', denmark: 'dk', poland: 'pl',
    czechia: 'cz', slovakia: 'sk', hungary: 'hu', slovenia: 'si',
    croatia: 'hr', bosnia: 'ba', serbia: 'rs', montenegro: 'me',
    kosovo: 'xk', albania: 'al', north_macedonia: 'mk', greece: 'gr',
    bulgaria: 'bg', romania: 'ro', moldova: 'md', ukraine: 'ua',
    belarus: 'by', lithuania: 'lt', latvia: 'lv', estonia: 'ee',
    finland: 'fi', sweden: 'se', norway: 'no', iceland: 'is',
    ireland: 'ie', united_kingdom: 'gb', turkey: 'tr'
  };
  
  const code = countryCodeMap[countryId] || 'eu';
  return `https://flagcdn.com/w320/${code}.png`;
};

// Sample landmark/capital images (placeholder - you'll replace with real API)
const getLandmarkUrl = (countryId: string): string => {
  // Using placeholder images for now
  // In production, integrate with Unsplash/Pexels/Wikimedia API
  const landmarkMap: Record<string, string> = {
    france: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    italy: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    spain: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400',
    germany: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400',
    united_kingdom: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
    greece: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400',
    netherlands: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400',
    austria: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400',
    portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400',
    czechia: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400',
    hungary: 'https://images.unsplash.com/photo-1541343672885-9be56236302a?w=400',
    poland: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400',
    sweden: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400',
    norway: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400',
    denmark: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400',
    ireland: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400',
    switzerland: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400',
    belgium: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=400',
    croatia: 'https://images.unsplash.com/photo-1555990538-1e7e5e3e6f8a?w=400',
    romania: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=400'
  };
  
  return landmarkMap[countryId] || `https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=400`;
};

const getCapitalPhotoUrl = (countryId: string): string => {
  // Reusing landmark URLs for now - can be expanded
  return getLandmarkUrl(countryId);
};

// Geography hints/descriptions
const geographyHints: Record<string, string> = {
  portugal: 'This country is located on the Iberian Peninsula and has a long Atlantic coastline.',
  spain: 'This country shares the Iberian Peninsula and has both Mediterranean and Atlantic coasts.',
  france: 'This hexagon-shaped country has coasts on both the Atlantic and Mediterranean.',
  italy: 'This boot-shaped country is surrounded by the Mediterranean, Adriatic, and Tyrrhenian seas.',
  germany: 'This central European country has the largest economy in the EU.',
  greece: 'This country is known as the birthplace of democracy and the Olympic Games.',
  united_kingdom: 'This island nation consists of England, Scotland, Wales, and Northern Ireland.',
  netherlands: 'This low-lying country is famous for windmills, tulips, and canals.',
  switzerland: 'This landlocked country is known for its Alps, neutrality, and banking.',
  austria: 'This landlocked country was once the center of the Habsburg Empire.',
  poland: 'This country borders both Germany and Ukraine.',
  sweden: 'This Scandinavian country is known for IKEA and the Nobel Prize.',
  norway: 'This country has the longest coastline in Europe with famous fjords.',
  finland: 'This Nordic country is known as the land of a thousand lakes.',
  iceland: 'This island nation is known for geysers, volcanoes, and the Northern Lights.'
};

const getGeographyHint = (countryId: string): string => {
  return geographyHints[countryId] || 'This European country has a rich history and culture.';
};

// Generate a random question for a country
export const generateQuestion = (countryId: string): Question => {
  const country = getCountryById(countryId);
  if (!country) {
    throw new Error(`Country not found: ${countryId}`);
  }

  // Randomly select question type (weighted towards flags and landmarks)
  const types: QuestionType[] = ['flag', 'flag', 'landmark', 'landmark', 'capital_photo', 'geography'];
  const type = types[Math.floor(Math.random() * types.length)];

  let imageUrl: string | undefined;
  let questionText: string;

  switch (type) {
    case 'flag':
      imageUrl = getFlagUrl(countryId);
      questionText = questionTemplates.flag(country.name, country.capital);
      break;
    case 'landmark':
      imageUrl = getLandmarkUrl(countryId);
      questionText = questionTemplates.landmark(country.name, country.capital);
      break;
    case 'capital_photo':
      imageUrl = getCapitalPhotoUrl(countryId);
      questionText = questionTemplates.capital_photo(country.name, country.capital);
      break;
    case 'geography':
      questionText = getGeographyHint(countryId);
      break;
    default:
      imageUrl = getFlagUrl(countryId);
      questionText = questionTemplates.flag(country.name, country.capital);
  }

  return {
    id: `${countryId}-${type}-${Date.now()}`,
    countryId,
    type,
    question: questionText,
    imageUrl
  };
};
