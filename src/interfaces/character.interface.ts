export interface ICharacter{
    id:number;
    name:string;
    status:string;
    species:string;
    type:string;
    gender:string;
    location:string;
    image:string;
    created:string;
    star:boolean;
}

export interface ICharacterComplete {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface Location {
    name: string;
    url:  string;
}

export interface IEpisode {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    Date;
}


export interface IFilterCharacter {
    status: string;
    species: string;
    gender: string;
    name: string;
    currentPage: number;
  }