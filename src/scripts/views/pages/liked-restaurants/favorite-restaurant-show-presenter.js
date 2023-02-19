/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class FavoriteMovieShowPresenter {
  constructor({ view, showFavoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurants = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteMovieShowPresenter;
