/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-unresolved
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

const { describe, it, beforeEach } = require('node:test');

describe('searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('film a');

      expect(FavoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('film a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);

      const foundRestaurants = document.querySelectorAll('.restaurant-item');

      expect(foundRestaurants.length).toEqual(1);
    });

    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        const restaurantTitles = document.querySelectorAll('.movie__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);
      searchRestaurants('film a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('  ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('   ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('movies')
        .addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);
          done();
        });

      FavoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);
      searchRestaurants('film a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);

      searchRestaurants('film a');
    });
  });
});
