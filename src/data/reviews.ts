export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  source: "Google";
  date: string;
};

/**
 * Prawdziwe opinie Google. Pusta tablica ukrywa sekcję na stronie.
 * Nie dodawaj opinii, których nie ma w profilu firmy.
 */
export const reviews: Review[] = [];
