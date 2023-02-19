const assert = require('assert');
 
Feature('Unliking Restaurant');
 
Before(({ I }) => {
    I.amOnPage('/#/favorite');
});
 
Scenario('showing empty liked menu restaurant', ({ I }) => {
    I.dontSeeElement('.movie-item');
});
 
Scenario('Unliking one restaurant', async ({ I }) => {
    I.dontSeeElement('.movie-item');
    I.amOnPage('/');
    I.waitForElement('.movie-item');
    I.seeElement('.movie-item__content a');
 
    const firstRestaurant = locate('.movie-item__content a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
 
    I.waitForElement('#likeButton', 3);
    I.seeElement('#likeButton');
    I.click('#likeButton');
 
    I.amOnPage('/#/favorite');
    I.waitForElement('.movie-item');
    I.seeElement('.movie-item');
    const unlikedRestaurantsTitles = await I.grabTextFrom('.movie-item__content a');
 
    assert.strictEqual(firstRestaurantTitle, unlikedRestaurantsTitles);
 
    I.seeElement('.movie-item__content a');
    await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
 
    I.waitForElement('#likeButton', 3);
    I.seeElement('#likeButton');
    I.click('#likeButton');
 
    I.amOnPage('/#/favorite');
    I.dontSeeElement('.movie-item');
});