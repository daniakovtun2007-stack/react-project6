const translations = {
  uk: {
    languageButton: 'EN',
    languageLabel: 'Switch language to English',
    themeDark: 'Увімкнути темну тему',
    themeLight: 'Увімкнути світлу тему',
    dark: 'Dark',
    light: 'Light',
    closeNotification: 'Закрити сповіщення',
    login: {
      welcome: 'Вітаємо!',
      intro: 'Будь ласка, увійдіть у свій акаунт',
      email: 'Емейл',
      password: 'Пароль',
      passwordPlaceholder: 'Введіть пароль',
      rememberMe: "Запам'ятати мене",
      submit: 'Увійти',
      showPassword: 'Показати пароль',
      hidePassword: 'Сховати пароль',
      error: 'Неправильний емейл або пароль! Спробуйте ще раз.',
      invalidInput: 'Введіть коректний email і пароль.',
      serverNotConfigured: 'Сервер входу не налаштований. Додайте APP_AUTH_EMAIL, APP_AUTH_PASSWORD і JWT_SECRET_BASE64 у змінні середовища Netlify та повторно опублікуйте сайт.',
      serverError: 'Не вдалося з’єднатися із сервером. Спробуйте пізніше.',
      sessionError: 'Сесію завершено або сервер недоступний. Увійдіть знову.',
      submitting: 'Вхід...'
    },
    home: {
      cart: 'Кошик',
      logout: 'Вийти',
      account: 'Особистий кабінет',
      welcome: 'Вітаємо в особистому кабінеті!',
      intro: 'Ви успішно авторизувалися в системі. Тут ви можете керувати своїм акаунтом та здійснювати покупки в нашому каталозі.',
      shopLink: 'Перейти до покупок',
      activeOrders: 'Активних замовлень',
      bonusPoints: 'Бонусних балів',
      newNotifications: 'Нових сповіщення',
      catalog: 'Каталог товарів',
      searchPlaceholder: 'Пошук товарів...',
      categoryLabel: 'Категорії товарів',
      noResults: 'За вашим запитом нічого не знайдено. Спробуйте іншу назву або категорію.',
      add: '+ Додати',
      cartTitle: 'Ваш кошик',
      close: 'Закрити',
      emptyCart: 'Ваш кошик порожній',
      removeItem: 'Видалити товар із кошика',
      quantityLabel: 'Кількість товарів',
      total: 'Загальна сума:',
      checkout: 'Оформити замовлення',
      checkoutSuccess: 'Дякуємо за покупку! Ваше замовлення успішно оформлено.',
      sessionError: 'Не вдалося перевірити сесію. Перевірте підключення до сервера.',
      categories: {
        all: 'Усі',
        audio: 'Аудіо',
        gadgets: 'Гаджети',
        computers: 'Комп’ютери'
      },
      products: {
        1: {
          name: 'Бездротові навушники Pro',
          description: 'Високоякісний звук з активним шумозаглушенням.'
        },
        2: {
          name: 'Смарт-годинник Sport',
          description: 'Відстеження активності, пульсу та сну 24/7.'
        },
        3: {
          name: 'Механічна клавіатура RGB',
          description: 'Тактильні перемикачі та підсвічування, що налаштовується.'
        },
        4: {
          name: 'Бездротова миша Ultra',
          description: 'Ергономічний дизайн та висока точність сенсора.'
        }
      }
    }
  },
  en: {
    languageButton: 'УКР',
    languageLabel: 'Перемкнути мову на українську',
    themeDark: 'Enable dark theme',
    themeLight: 'Enable light theme',
    dark: 'Dark',
    light: 'Light',
    closeNotification: 'Close notification',
    login: {
      welcome: 'Welcome!',
      intro: 'Please sign in to your account',
      email: 'Email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      submit: 'Sign in',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      error: 'Incorrect email or password. Please try again.',
      invalidInput: 'Enter a valid email and password.',
      serverNotConfigured: 'The authentication service is not configured. Set APP_AUTH_EMAIL, APP_AUTH_PASSWORD, and JWT_SECRET_BASE64 in Netlify environment variables, then redeploy the site.',
      serverError: 'Could not connect to the server. Please try again later.',
      sessionError: 'Your session has expired or the server is unavailable. Please sign in again.',
      submitting: 'Signing in...'
    },
    home: {
      cart: 'Cart',
      logout: 'Sign out',
      account: 'My account',
      welcome: 'Welcome to your account!',
      intro: 'You are signed in. Here you can manage your account and shop our catalog.',
      shopLink: 'Start shopping',
      activeOrders: 'Active orders',
      bonusPoints: 'Bonus points',
      newNotifications: 'New notifications',
      catalog: 'Product catalog',
      searchPlaceholder: 'Search products...',
      categoryLabel: 'Product categories',
      noResults: 'No products found. Try another name or category.',
      add: '+ Add',
      cartTitle: 'Your cart',
      close: 'Close',
      emptyCart: 'Your cart is empty',
      removeItem: 'Remove item from cart',
      quantityLabel: 'Product quantity',
      total: 'Total:',
      checkout: 'Place order',
      checkoutSuccess: 'Thank you for your purchase! Your order has been placed successfully.',
      sessionError: 'Could not verify your session. Check the server connection.',
      categories: {
        all: 'All',
        audio: 'Audio',
        gadgets: 'Gadgets',
        computers: 'Computers'
      },
      products: {
        1: {
          name: 'Pro Wireless Headphones',
          description: 'High-quality sound with active noise cancellation.'
        },
        2: {
          name: 'Sport Smartwatch',
          description: 'Track your activity, heart rate, and sleep 24/7.'
        },
        3: {
          name: 'RGB Mechanical Keyboard',
          description: 'Tactile switches and customizable backlighting.'
        },
        4: {
          name: 'Ultra Wireless Mouse',
          description: 'Ergonomic design and high-precision sensor.'
        }
      }
    }
  }
};

export default translations;
