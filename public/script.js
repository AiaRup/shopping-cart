// declare variables
var shoppingCart = $('.shopping-cart');
var shoppingList = shoppingCart.find('.cart-list');

var shoppingApp = function() {
  // an array with all of our cart items
  var cart = [];

  var updateCart = function() {
    //Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    shoppingList.empty();
    var output = '';
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i += 1) {
      output += '<p>' + cart[i].name + ' - $' + cart[i].price + '</p>';
      totalPrice += cart[i].price;
    }
    shoppingList.append(output);
    shoppingCart.find('.total').text(totalPrice);
  };

  var addItem = function(item) {
    //Write this function. Remember this function has nothing to do with display.
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    cart.push(item);
  };

  var clearCart = function() {
    //Write a function that clears the cart ;-)
    cart = [];
    shoppingList.empty();
  };
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart
  };
};

var app = shoppingApp();

// update the cart as soon as the page loads!
app.updateCart();

/******** EVENT LISTENERS **********/
$('.view-cart').on('click', function() {
  //hide/show the shopping cart!
  shoppingCart.toggleClass('show');
});

$('.add-to-cart').on('click', function() {
  //get the "item" object from the page
  var itemHTML = $(this).closest('div.item');
  var item = {};
  item.name = itemHTML.data().name;
  item.price = itemHTML.data().price;

  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function() {
  app.clearCart();
  shoppingCart.find('.total').text('0');
  app.updateCart();
});
