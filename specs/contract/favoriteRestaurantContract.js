/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */

import { it } from 'node:test';
import { async } from 'regenerator-runtime';

const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getResto(1))
      .toEqual({ id: 1 });
    expect(await favoriteRestaurant.getResto(2))
      .toEqual({ id: 2 });
    expect(await favoriteRestaurant.getResto(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putResto({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllResto())
      .toEqual([]);
  });

  it('can return all of the restaurant that have been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getAllResto())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteResto(1);

    expect(await favoriteRestaurant.getAllResto())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteResto(4);

    expect(await favoriteRestaurant.getAllResto())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteRestaurant.putResto({ id: 1, title: 'film a' });
    favoriteRestaurant.putResto({ id: 2, title: 'film b' });
    favoriteRestaurant.putResto({ id: 3, title: 'film abc' });
    favoriteRestaurant.putResto({ id: 4, title: 'ini mah film abcd' });

    expect(await favoriteRestaurant.searchRestaurants('film a')).toEqual([
      { id: 1, title: 'film a' },
      { id: 3, title: 'film abc' },
      { id: 4, title: 'ini mah film abcd' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
