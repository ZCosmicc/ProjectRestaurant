import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from './templates/template-creator';

const Favorite = {
  async render() {
    return `
        <h2 class="favorite__heading">Favorite</h2>
        <div id="restaurants" class="restaurants"></div>
        <div id="likeButtonContainer"></div>`;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllResto();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
