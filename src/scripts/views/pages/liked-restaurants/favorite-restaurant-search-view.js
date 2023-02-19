/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../templates/template-creator';

class FavoriteMovieSearchView {
  getTemplate() {
    return `
      <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Restaurant</h2>
        <div id="movies" class "movies">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="movie-item__not__found movies__not__found">Tidak ada restaurant untuk ditampilkan</div>';
  }
}

export default FavoriteMovieSearchView;
