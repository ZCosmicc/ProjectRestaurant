import CONFIG from '../../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <h2 class="movie__title">${restaurant.name}</h2>
    <img class="movie__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="movie__info">
        <h3>Information</h3>
        <h4>Description</h4>
        <p>${restaurant.description}</p>
        <h4>City</h4>
        <p>${restaurant.city}</p>
        <h4>Address</h4>
        <p>${restaurant.address}</p>
        <h4>Rating</h4>
        <p>${restaurant.rating}⭐️</p>
        <h4>Foods Menu</h4>
        <p>${restaurant.menus.foods.map((food) => food.name).join(' | ')}</p>
        <h4>Drinks Menu</h4>
        <p>${restaurant.menus.drinks.map((drink) => drink.name).join(' | ')}</p>
        <h4>Customer Reviews</h4>
        <p>${restaurant.customerReviews.map((customer) => `
            <div class="customer-wrap">
                <p class="reviewer-name">${customer.name}</p>
                <p class="reviewer">${customer.date}</p>
                <p class="reviewer">${customer.review}</p>
            </div>
        `).join('')}
    </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="movie-item">
        <div class="movie-item__header">
            <img class="movie-item__header__poster lazyload" alt="${restaurant.name || '-'}"
                data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : ''}">
            <div class="movie-item__header__rating">
                <p>⭐️<span class="movie-item__header__rating__score">${restaurant.rating || '-'}</span></p>
            </div>
        </div>
        <div class="movie-item__content">
            <h3><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
            <h4>${restaurant.city}</h4>
            <p>${restaurant.description || '-'}</p>
        </div>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
