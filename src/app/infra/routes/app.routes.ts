const movieRoot = 'movies'

export const appRoutes = {
  movies: {
    root: movieRoot,
    ratedVideos: `${movieRoot}/myRatedMovie`,
    movieById: `${movieRoot}/:id`
  }
}
