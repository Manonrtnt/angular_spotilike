export interface Album {
    _id: string;
    titre: string;
    pochette: string;
    date_sortie: string;
    morceaux: Morceau[];
    artiste: Artiste;
    liked?: boolean;
}

export interface Morceau {
    _id : string
    titre: string;
    duree: string;
    artiste: Artiste;
    genre: Genre[];
    album: Album;
}

export interface Artiste {
    _id: string;
    name: string;
    avatar: string;
    biographie: string;
}


export interface Genre {
    _id: string;
    titre: string;
    description: string;
}
