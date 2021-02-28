import { Movie } from "src/app/models/movie.entity"

export class GetAllMovies {
  static readonly type = '[movies] get all movies'
  constructor() { }
}

export class SetMovieSelected {
  static readonly type = '[movies] set  movie selected'
  constructor(public payload: Movie) {}
}
export class GetMovie {
  static readonly type = '[movies] get movie'
  constructor(public payload: string) {}
}

export class RateMovie {
  static readonly type = '[movies] rate movie'
  constructor(public id: number, public rate: number) {}
}

export class RemoveRateMovie {
  static readonly type = '[movies] remove rate movie'
  constructor(public id: number) {}
}

export class GetRatedMovies {
  static readonly type = '[movies] get rated movies'
  constructor() { }
}
