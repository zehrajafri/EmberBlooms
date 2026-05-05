import React, { useState } from "react";
import "./App.css";

const menu = {
  drinks: [
    {
      name: "Caramel Latte",
      price: 180,
      desc: "Smooth espresso blended with velvety steamed milk and rich caramel for a warm, comforting coffee experience."
    },
    {
      name: "Hazelnut Cappuccino",
      price: 300,
      desc: "A creamy cappuccino infused with roasted hazelnut notes, topped with frothy milk for a nutty, aromatic delight."
    },
    {
      name: "Classic Espresso",
      price: 200,
      desc: "A bold, full-bodied espresso shot with deep flavor and a smooth golden crema for true coffee lovers."
    },
    {
      name: "Iced Vanilla Coffee",
      price: 220,
      desc: "Chilled coffee infused with sweet vanilla and milk, delivering a refreshing and smooth pick-me-up."
    },
    {
      name: "Hot Chocolate",
      price: 250,
      desc: "Rich, creamy melted chocolate blended with warm milk for a cozy, indulgent treat."
    }
  ],
  snacks: [
    {
      name: "Butter Croissant",
      price: 240,
      desc: "Golden, flaky layers of buttery pastry baked to perfection for a light and melt-in-your-mouth experience."
    },
    {
      name: "Chocolate Muffin",
      price: 200,
      desc: "Soft, moist muffin packed with rich chocolate chunks for a sweet and satisfying bite."
    },
    {
      name: "Grilled Cheese Sandwich",
      price: 200,
      desc: "Crispy golden bread filled with gooey melted cheese for a simple yet comforting classic."
    },
    {
      name: "Herby Veggie Wrap",
      price: 190,
      desc: "Fresh seasonal vegetables wrapped in a soft tortilla with a hint of herbs for a light, healthy bite."
    },
    {
      name: "Blueberry Cheesecake",
      price: 260,
      desc: "Creamy cheesecake topped with luscious blueberry compote for a perfect balance of sweet and tangy."
    }
  ]
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => setCart([...cart, item]);

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, i) => i !== indexToRemove));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const top =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleCheckout = () => {
    setCart([]);
    setOpenCart(false);
    setOrderPlaced(true);

    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Ember & Bloom</h2>

        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => handleScroll(e, "home")}>Home</a></li>
          <li><a href="#menu" onClick={(e) => handleScroll(e, "menu")}>Menu</a></li>
          <li><a href="#about" onClick={(e) => handleScroll(e, "about")}>About</a></li>
          <li><a href="#contact" onClick={(e) => handleScroll(e, "contact")}>Contact</a></li>
        </ul>

        <div className="cart-icon" onClick={() => setOpenCart(!openCart)}>
          🛒 {cart.length}
        </div>
      </nav>

      {/* Thank you popup */}
      {orderPlaced && (
        <div className="thankyou-popup">
           Thank you for placing your order with us!
        </div>
      )}

      {/* Cart */}
      {openCart && (
        <div className="cart-panel">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} className="cart-item">
                  <span>{item.name} - ₹{item.price}</span>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h4>Total: ₹{total}</h4>

              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* Hero */}
      <header id="home" className="hero">
        <h1>Ember & Bloom Café</h1><br />
        <p>A warm corner for coffee, comfort, and conversations.</p>
      </header>

      {/* Menu */}
      <section id="menu" className="menu-section">
        <h2>Menu</h2>

        <h3>Drinks</h3>
        <div className="menu-grid">
          {menu.drinks.map((item, i) => (
            <div key={i} className="card">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p className="desc">{item.desc}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <h3>Snacks</h3>
        <div className="menu-grid">
          {menu.snacks.map((item, i) => (
            <div key={i} className="card">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p className="desc">{item.desc}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>Ember & Bloom is a cozy café where warmth meets freshness</p>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Email: hello@emberbloom.com</p>
        <p>Phone: +91 98765 43210</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>©️ {new Date().getFullYear()} Ember & Bloom Café | Made with Love & Care | All rights reserved</p>
      </footer>

    </div>
  );
}