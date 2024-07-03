document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const cartList = document.getElementById("cartList");
    const totalPriceDiv = document.getElementById("totalPrice");
    const checkoutButton = document.getElementById("checkoutButton");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Function to render products
    const renderProducts = () => {
      if (productList) {
        productList.innerHTML = ""; // Clear the existing products
        products = products.filter((product) => product.quantity > 0); // Remove out-of-stock products from array
        products.forEach((product, index) => {
          const productDiv = document.createElement("div");
          productDiv.className = "product";
          productDiv.innerHTML = `
                      <h3>${product.name}</h3>
                      <p>Price: Rs/${product.price}</p>
                      <p>Existing Quantity: ${product.quantity}</p>
                      <label for="quantity${index}">Quantity:</label>
                      <input type="number" id="quantity${index}" min="1" value="1">
                      <button onclick="addToCart(${index})">Buy</button>
                      <p>${product.description}</p>
                  `;
          productList.appendChild(productDiv);
        });
      }
    };
  
    // Function to render cart items and calculate total price
    const renderCart = () => {
      if (cartList && totalPriceDiv) {
        cartList.innerHTML = ""; // Clear the existing cart items
        let totalPrice = 0;
  
        cart.forEach((item, index) => {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.className = "cart-item";
          const itemPrice = item.price * item.quantity; // Calculate total price for this item
          totalPrice += itemPrice; // Add to the overall total price
          cartItemDiv.innerHTML = `
                      <h3>${item.name}</h3>
                      <p>Price: Rs/ ${item.price}</p>
                      <p>Quantity: ${item.quantity}</p>
                      <p>Total: Rs/ ${itemPrice}</p>
                      <p>${item.description}</p>
                      <button onclick="deleteFromCart(${index})" class="delete-btn">X</button>
                  `;
          cartList.appendChild(cartItemDiv);
        });
  
        // Display the total price
        totalPriceDiv.innerHTML = `<h3>Total Price: Rs/ ${totalPrice}</h3>`;
      }
    };
  
    // Function to update product quantity in the store
    const updateProductQuantity = (index, quantity) => {
      products[index].quantity -= quantity;
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(); // Re-render products after update
    };
  
    // Handle form submission to add a new product
    if (productForm) {
      productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const quantity = document.getElementById("productQuantity").value;
        const description = document.getElementById("productDescription").value;
        const product = { name, price, quantity, description };
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added successfully!");
        productForm.reset();
        renderProducts(); // Re-render products
      });
    }
  
    // Function to add a product to the cart
    window.addToCart = (index) => {
      const selectedQuantity = parseInt(
        document.getElementById(`quantity${index}`).value,
        10
      );
      if (selectedQuantity <= products[index].quantity) {
        const productToAdd = { ...products[index], quantity: selectedQuantity };
        cart.push(productToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateProductQuantity(index, selectedQuantity); // Update product quantity in the store
        alert("Product added to cart!");
        renderCart(); // Re-render cart
      } else {
        alert(
          `Not enough stock available. Available quantity: ${products[index].quantity}`
        );
      }
    };
  
    // Function to delete a product from the cart
    window.deleteFromCart = (index) => {
      const item = cart[index];
      const originalIndex = products.findIndex((prod) => prod.name === item.name);
      products[originalIndex].quantity += item.quantity;
      cart.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product removed from cart!");
      renderProducts(); // Re-render products after updating quantity
      renderCart(); // Re-render cart
    };
  
    // Function to handle checkout
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        if (cart.length > 0) {
          alert("You Successfully shopped!");
          cart = []; // Empty the cart
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart(); // Re-render cart (empty)
        } else {
          alert("Your cart is empty. Add some products before checkout.");
        }
      });
    }
  
    // Initial rendering of products and cart items
    renderProducts();
    renderCart();
  });
  