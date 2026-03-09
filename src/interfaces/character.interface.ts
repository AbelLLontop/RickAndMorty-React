export interface ILocation {
    name: string;
    url: string;
}

export interface ICharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: ILocation;
    location: ILocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
    isFavorite?: boolean;
}

export interface ICharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: ICharacter[];
}

export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export interface ICharacterFilter {
    status: string;
    species: string;
    gender: string;
    name: string;
    page: number;
}

export type TCharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type TCharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';