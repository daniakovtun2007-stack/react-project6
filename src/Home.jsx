import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Бездротові навушники Pro',
    category: 'Аудіо',
    price: 2999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Високоякісний звук з активним шумозаглушенням.'
  },
  {
    id: 2,
    name: 'Смарт-годинник Sport',
    category: 'Гаджети',
    price: 4500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Відстеження активності, пульсу та сну 24/7.'
  },
  {
    id: 3,
    name: 'Механічна клавіатура RGB',
    category: 'Комп’ютери',
    price: 3200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Тактильні перемикачі та підсвічування, що налаштовується.'
  },
  {
    id: 4,
    name: 'Бездротова миша Ultra',
    category: 'Комп’ютери',
    price: 1800,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    description: 'Ергономічний дизайн та висока точність сенсора.'
  }
];

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);

  const shopRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    } else {
      setUserEmail('daniakovtun2007@gmail.com');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Дякуємо за покупку! Ваше замовлення успішно оформлено.');
    setActiveOrdersCount((prev) => prev + 1);
    setCart([]);
    setIsCartOpen(false);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const categories = ['Усі', ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Усі' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">MyDashboard</span>
        </div>

        <div className="user-profile">
          <button className="cart-header-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Кошик <span className="cart-badge">{totalItemsCount}</span>
          </button>
          <span className="user-email">{userEmail}</span>
          <button onClick={handleLogout} className="logout-button">
            Вийти
          </button>
        </div>
      </header>

      <main className="home-content">
        <section className="welcome-card">
          <h1>Вітаємо в особистому кабінеті!</h1>
          <p>
            Ви успішно авторизувалися в системі. Тут ви можете керувати своїм
            акаунтом та здійснювати покупки в нашому каталозі.
          </p>
          <button className="primary-action-btn" onClick={scrollToShop}>
            Перейти до покупок 👇
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🛍️</div>
            <div className="stat-info">
              <h3>{activeOrdersCount}</h3>
              <p>Активних замовлень</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💎</div>
            <div className="stat-info">
              <h3>250</h3>
              <p>Бонусних балів</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Нових сповіщення</p>
            </div>
          </div>
        </section>

        <section className="shop-section" ref={shopRef}>
          <div className="shop-header">
            <h2>Каталог товарів</h2>
            <input
              type="text"
              placeholder="Пошук товарів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shop-search-input"
            />
          </div>

          <div className="categories-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-bottom">
                    <span className="product-price">{product.price} ₴</span>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                      + Додати
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h2>Ваш кошик</h2>
              <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart-msg">Ваш кошик порожній</p>
            ) : (
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price} ₴</p>
                    </div>
                    <div className="cart-quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="cart-modal-footer">
                <div className="total-row">
                  <span>Загальна сума:</span>
                  <strong>{totalPrice} ₴</strong>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Оформити замовлення
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;