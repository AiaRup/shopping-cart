// declare variables
var shoppingCart = $('.shopping-cart');
var shoppingList = shoppingCart.find('.cart-list');
var STORAGE_ID = 'shoppingCart';

var shoppingApp = function () {
  // an array with all of our cart items
  var cart = [];

  // This will stringify and save our entire cart array.
  var _saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  };

  // This will get our cart array out of local storage and convert them back to JS objects
  // or, if none exists, it will simply return an empty array.
  var _getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  };

  var updateCart = function () {
    shoppingList.empty();
    var output = '';
    var totalPrice = 0;
    var button =
      '<button type="button" class="btn btn-danger btn-xs remove">Remove</button>';

    for (var i = 0; i < cart.length; i += 1) {
      if (cart[i].amount === 1) {
        output += '<p class="cart-item">' + cart[i].name +
          ' - $' + cart[i].price + ' ' + button + '</p>';
        totalPrice += cart[i].price;
      } else {
        output += '<p class="cart-item">' + cart[i].name +
          ' (' + cart[i].amount + ') - $' + cart[i].price + ' ' + button + '</p>';
        totalPrice += cart[i].price * cart[i].amount;
      }
    }
    shoppingList.append(output);
    $('.total').text(totalPrice);
  };

  var addItem = function (item) {
    for (var i = 0; i < cart.length; i += 1) {
      if (item.name === cart[i].name) {
        cart[i].amount++;
        // update cart in local storage
        _saveToLocalStorage();
        return;
      }
    }
    cart.push(item);
    // update cart in local storage
    _saveToLocalStorage();
  };

  var clearCart = function () {
    cart = [];
    // update cart in local storage
    _saveToLocalStorage();
    shoppingList.empty();
    $('.total').text('0');
  };

  var removeItem = function (itemIndex) {
    for (var i = 0; i < cart.length; i += 1) {
      if (i === itemIndex) {
        cart[i].amount === 1 ? cart.splice(i, 1) : cart[i].amount--;
      }
    }
    // update cart in local storage
    _saveToLocalStorage();
    updateCart();
  };

  // update cart from local storage
  cart = _getFromLocalStorage();

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItem: removeItem
  };
};

var app = shoppingApp();

// update the cart as soon as the page loads!
app.updateCart();

/******** EVENT LISTENERS **********/
// When burger-menu/shopping cart is clicked
$('.view-cart, navbar-toggle.collapsed, navbar-toggle').on('click', function () {
  //hide/show the shopping cart!
  shoppingCart.toggleClass('show');
});

$('.add-to-cart').on('click', function () {
  //get the "item" object from the page
  var itemHTML = $(this).closest('div.item');
  var item = {};
  item.name = itemHTML.data().name;
  item.price = itemHTML.data().price;
  item.amount = 1;

  app.addItem(item);
  //update shopping cart on page
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

$('.shopping-cart').on('click', '.remove', function () {
  var item = $(this).closest('.cart-item');
  // remove item from cart
  app.removeItem(item.index());
  //update shopping cart on page
  app.updateCart();
});

// when the web page is max-width 740px
$('.navbar-toggle.collapsed').on('click', function () {
  $('.view-cart').css('display', 'none');
  $('.nav.navbar-nav.navbar-right').css('display', 'none');
  $('.shopping-cart').toggleClass('show');
});