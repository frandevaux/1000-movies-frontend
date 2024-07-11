// interfaces/Movie.ts
export interface User {
  name: string;
  email: string;
  seenMovies: { id: number; seen_date: Date }[];
}
