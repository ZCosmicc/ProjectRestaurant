import DicodingAPI from '../../data/dicodingapi-source';
import { createRestaurantItemTemplate } from './templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="content">
            <div class="hero">
                <div class="hero-inner">
                    <h1 class="hero-title">Krusty Krab Catalogue</h1>
                    <p class="hero-tagline">Kami tidak pernah meragukan pelanggan, walau permintaan nya aneh-aneh</p>
                </div>
            </div>
            <h2 class="content__heading">Restaurant Available</h2>
            <div id="restaurants" class="restaurants">
            </div>
        </div>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingAPI.Home();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
