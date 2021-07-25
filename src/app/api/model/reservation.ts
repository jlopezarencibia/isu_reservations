export class Reservation {
    id? = -1;
    location = '';
    date = '';
    ranking = 0;
    favorite = false;
    image = '';

    constructor(location: string, date: string, ranking: number, favorite: boolean, image: string, id?: number) {
        this.location = location;
        this.date = date;
        this.ranking = ranking;
        this.favorite = favorite;
        this.image = image;
        this.id = id ?? -1;
    }
}
