// interfaces/Movie.ts
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Director {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Movie {
  list_id: number;
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
  cast: CastMember[];
  director: Director;
  seen: boolean;
}
