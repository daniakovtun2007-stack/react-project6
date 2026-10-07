import { useEffect, useMemo, useRef, useState } from 'react';
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

function Home({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [userEmail] = useState(localStorage.getItem('saved_email') || 'demo@example.com');

  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(() => {
    const savedValue = Number(localStorage.getItem('active_orders_count') || '0');
    return Number.isFinite(savedValue) ? savedValue : 0;
  });

  const shopRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('active_orders_count', String(activeOrdersCount));
  }, [activeOrdersCount]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
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
    setActiveOrdersCount((prev) => prev + 1);
    setCart([]);
    setIsCartOpen(false);
    window.alert('Дякуємо за покупку! Ваше замовлення успішно оформлено.');
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const categories = useMemo(() => ['Усі', ...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Усі' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container bg-light min-vh-100">
      <header className="home-header bg-white border-bottom shadow-sm sticky-top">
        <div className="container-fluid px-3 px-lg-4">
          <div className="d-flex align-items-center justify-content-between py-3 gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="logo-icon">🚀</span>
              <span className="logo-text text-primary fw-bold">MyDashboard</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-primary position-relative" onClick={() => setIsCartOpen(true)}>
                🛒 Кошик
                <span className="badge text-bg-light ms-2">{totalItemsCount}</span>
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm home-theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
              <span className="user-email text-secondary d-none d-md-inline">{userEmail}</span>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                Вийти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <section className="welcome-panel card border-0 shadow-sm mb-4">
          <div className="card-body p-4 p-lg-5 text-center text-white">
            <p className="text-uppercase small fw-semibold mb-2 text-white-50">Особистий кабінет</p>
            <h1 className="display-6 fw-bold mb-3">Вітаємо в особистому кабінеті!</h1>
            <p className="mx-auto mb-4 text-white-50" style={{ maxWidth: '42rem' }}>
              Ви успішно авторизувалися в системі. Тут ви можете керувати своїм акаунтом та
              здійснювати покупки в нашому каталозі.
            </p>
            <button className="btn btn-light btn-lg fw-semibold px-4" onClick={scrollToShop}>
              Перейти до покупок 👇
            </button>
          </div>
        </section>

        <section className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon">🛍️</div>
                <div>
                  <h3 className="mb-0 fw-bold">{activeOrdersCount}</h3>
                  <p className="mb-0 text-secondary">Активних замовлень</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon">💎</div>
                <div>
                  <h3 className="mb-0 fw-bold">250</h3>
                  <p className="mb-0 text-secondary">Бонусних балів</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon">🔔</div>
                <div>
                  <h3 className="mb-0 fw-bold">2</h3>
                  <p className="mb-0 text-secondary">Нових сповіщення</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card border-0 shadow-sm p-3 p-lg-4" ref={shopRef}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h2 className="mb-0 fw-bold">Каталог товарів</h2>
            <div className="input-group search-field" style={{ maxWidth: '22rem' }}>
              <span className="input-group-text bg-white">🔎</span>
              <input
                type="text"
                className="form-control"
                placeholder="Пошук товарів..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-group flex-wrap gap-2 mb-4" role="group" aria-label="Категорії товарів">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'} rounded-pill`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              За вашим запитом нічого не знайдено. Спробуйте іншу назву або категорію.
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-xl-4">
                  <div className="card product-card h-100 border-0 shadow-sm">
                    <img src={product.image} alt={product.name} className="card-img-top product-image" />
                    <div className="card-body d-flex flex-column">
                      <span className="text-primary small fw-semibold mb-2">{product.category}</span>
                      <h3 className="h5 fw-bold mb-2">{product.name}</h3>
                      <p className="text-secondary flex-grow-1">{product.description}</p>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <span className="fw-bold fs-5 text-dark">{product.price} ₴</span>
                        <button className="btn btn-primary" onClick={() => addToCart(product)}>
                          + Додати
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {isCartOpen && (
        <div className="modal-backdrop fade show" onClick={() => setIsCartOpen(false)} />
      )}

      {isCartOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h2 className="modal-title h4 mb-0">Ваш кошик</h2>
                <button type="button" className="btn-close" onClick={() => setIsCartOpen(false)} aria-label="Закрити" />
              </div>

              <div className="modal-body">
                {cart.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="display-6 mb-3">🛒</div>
                    <p className="mb-0 text-secondary">Ваш кошик порожній</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {cart.map((item) => (
                      <div key={item.id} className="list-group-item px-0 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="cart-item-img rounded" />
                          <div className="flex-grow-1 min-width-0">
                            <h4 className="h6 mb-1 text-truncate">{item.name}</h4>
                            <p className="mb-0 text-secondary">{item.price} ₴</p>
                          </div>
                          <div className="btn-group btn-group-sm" role="group" aria-label="Кількість товарів">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>
                              −
                            </button>
                            <button type="button" className="btn btn-outline-secondary disabled" aria-disabled="true">
                              {item.quantity}
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>
                              +
                            </button>
                          </div>
                          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="modal-footer flex-column align-items-stretch">
                  <div className="d-flex justify-content-between align-items-center mb-2 fw-semibold">
                    <span>Загальна сума:</span>
                    <span>{totalPrice} ₴</span>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg" onClick={handleCheckout}>
                    Оформити замовлення
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;