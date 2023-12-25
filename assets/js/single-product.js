import {products} from './products.js';
import {formatCurrency} from './money.js';
 
// Function to extract query parameters from URL
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const regex = /([^&=]+)=([^&]*)/g;
  let m;
  while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

// Fetch product details and render them
document.addEventListener('DOMContentLoaded', () => {
  const params = getQueryParams();
  const product = getProduct(params.productId);
  renderProductDetails(product);
  setupQuantityHandlers();
});

// Render product details
function renderProductDetails(product) {
  let productHTML = `<div class="col-lg-4">
  <div class="right-content">
      <h4>${product.brand}</h4>
      <h4 style="font-weight: normal;">${product.name}</h4>

      <!-- Add Rating Star Area-->
      <div class="product-ratting">
          <div class="ratting-icons">
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
          </div>
          <div class="ratting-caption">No Reviews</div>
        </div>
      <!-- End Rating Star Area-->  

      <span class="price">$229.99</span>
      <ul class="stars">
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>
      </ul>
      <span>TOUGH, FORGED CONSTRUCTION: Hard anodized ceramic nonstick pots and pans from KitchenAid are 8x harder than aluminum for lasting performance and feature a thick, forged base for fast and even heat conduction</span>
      <span>EASY-CLEAN CERAMIC: High performance ceramic nonstick is made without PFAS, BPA, Lead, or Cadmium* for safe, consistent food release and fast, easy cleanup (*Manufacturing process does not involve adding to the product any of these substances which may otherwise be present in the environment)</span>
      <span>KITCHEN TO TABLE DESIGN: Pots and pans are color-finished in a modern Matte Black hue for a standout, contemporary look from performance to presentation</span>
      <div class="quantity-content">
          <div class="left-content">
              <h6>No. of Orders</h6>
          </div>
          <div class="right-content">
              <div class="quantity buttons_added">
                  <input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode=""><input type="button" value="+" class="plus">
              </div>
          </div>
      </div>
      <div class="total">
          <h4>Total${product.price*2}</h4>
          <div class="main-border-button"><a href="#">Add To Cart</a></div>
      </div>

  </div>
</div>`

document.querySelector('.product-detail-container').innerHTML = productHTML; // Make sure this selector points to an existing element
setupQuantityHandlers(product)
}

// Setup quantity change handlers
function setupQuantityHandlers() {
  const quantityInput = document.querySelector('.input-text.qty');
  const totalDisplay = document.querySelector('.total h4');

  document.querySelector('.plus').addEventListener('click', () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateTotal();
  });

  document.querySelector('.minus').addEventListener('click', () => {
      if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
          updateTotal();
      }
  });

  function updateTotal() {
      // Assuming getProductPrice returns the price of the product
      const totalPrice = getProductPrice(product.id) * quantityInput.value;
      totalDisplay.innerText = `Total: $${totalPrice.toFixed(2)}`;
  }
}