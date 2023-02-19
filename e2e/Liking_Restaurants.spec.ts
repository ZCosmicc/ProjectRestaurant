const assert = require('assert'); 

Feature('Liking Restaurants');
 
Before(({ I }) => {
    I.amOnPage('/#/favorite')
})
 
Scenario('showing empty liked restaurants',  ({ I }) => {
    I.dontSeeElement('.movie-item');
});
 
Scenario('liking one restaurant', async ({ I }) => {
    I.dontSeeElement('.movie-item');
    I.amOnPage('/');
    I.waitForElement('.movie-item');
    I.seeElement('.movie-item__content a');
 
    const firstRestaurant = locate('.movie-item__content a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    
    I.click(firstRestaurant);
 
    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');
 
    I.amOnPage('/#/favorite');
    I.seeElement('.movie-item');
    const likedRestaurantTitle = await I.grabTextFrom('.movie-item__content a');
 
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});