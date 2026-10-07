# React Shop Dashboard

Це React-додаток з авторизацією, особистим кабінетом, каталогом товарів, кошиком і перемикачем світлої/темної теми.

## Технології

- React
- Vite
- React Router
- Bootstrap 5

## Вимоги

- Node.js 18+
- npm

## Встановлення

```bash
npm install
```

## Запуск у розробці

```bash
npm run dev
```

Після запуску відкрийте адресу, яка покажеться в терміналі, зазвичай:

```bash
http://localhost:5173/
```

## Збірка для продакшну

```bash
npm run build
```

Результат збірки буде в папці:

```bash
dist/
```

## Деплой на Netlify

### Варіант 1: через Netlify CLI

1. Встановіть CLI, якщо його ще немає:

```bash
npm install -D netlify-cli
```

2. Авторизуйтесь у Netlify:

```bash
npx netlify login
```

3. Зробіть продакшн-деплой:

```bash
npx netlify deploy --prod --dir=dist
```

### Варіант 2: через токен

```bash
set NETLIFY_AUTH_TOKEN=your_token_here
npx netlify deploy --prod --dir=dist
```

Для macOS/Linux:

```bash
export NETLIFY_AUTH_TOKEN=your_token_here
npx netlify deploy --prod --dir=dist
```

### Варіант 3: якщо проект ще не прив’язаний до Netlify

```bash
npx netlify link
npx netlify deploy --prod --dir=dist
```

## Обліковий запис для входу

- Email: `demo@example.com`
- Password: `demo-password`

Авторизація реалізована лише на стороні клієнта для демонстрації та не призначена для реальних облікових записів.

## Функціонал

- Авторизація
- Пам’ятання email через checkbox
- Перемикання light/dark mode
- Каталог товарів з пошуком та фільтрацією по категоріях
- Кошик із зміною кількості товарів
- Оформлення замовлення
- Зберігання кошика і даних теми у localStorage

## Корисні команди

```bash
npm run dev
npm run build
npx netlify deploy --prod --dir=dist
```
