# React Shop Dashboard

Це React-додаток з авторизацією, особистим кабінетом, каталогом товарів, кошиком і перемикачем світлої/темної теми.

## Технології

- React
- Vite
- React Router
- Bootstrap 5
- Java 17, Spring Boot, Spring Security, JWT

## Вимоги

- Node.js 18+
- npm
- JDK 17+ та Maven 3.9+ для backend

## Встановлення

```bash
npm install
```

## Запуск у розробці

Запустіть Spring Boot backend у IntelliJ IDEA (інструкція нижче), потім у корені проєкту:

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

Backend використовує один локальний обліковий запис, заданий змінними середовища `APP_AUTH_EMAIL` і `APP_AUTH_PASSWORD`. Пароль у backend зберігається лише у вигляді BCrypt-хешу в пам’яті; облікові дані не зберігаються в коді.

## Запуск Spring Boot backend в IntelliJ IDEA

1. Відкрийте `backend/pom.xml` в IntelliJ IDEA та виберіть JDK 17 або новіший.
2. У **Run → Edit Configurations** створіть конфігурацію Spring Boot для класу `com.example.reactproject6.ReactProject6ApiApplication`.
3. Додайте в **Environment variables**:
   - `APP_AUTH_EMAIL` — email для входу;
   - `APP_AUTH_PASSWORD` — пароль для входу;
   - `JWT_SECRET_BASE64` — випадковий Base64-ключ щонайменше з 32 байтів;
   - за потреби `FRONTEND_ORIGIN` — origin фронтенду (типово `http://localhost:5173`).
4. Запустіть backend, потім запустіть React через `npm run dev`.

Для запуску backend із PowerShell замініть значення-заповнювачі власними локальними даними:

```powershell
$env:APP_AUTH_EMAIL = "you@example.com"
$env:APP_AUTH_PASSWORD = "choose-a-local-password"
$key = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($key)
$env:JWT_SECRET_BASE64 = [Convert]::ToBase64String($key)
$rng.Dispose()
Set-Location backend
mvn spring-boot:run
```

Backend надає `POST /api/auth/login` для входу та захищений `GET /api/auth/me` для перевірки JWT. Термін дії access token — 15 хвилин; фронтенд тримає його лише в пам’яті вкладки. Користувач наразі один і зберігається в пам’яті, база даних та реєстрація не налаштовані.

Для production на Netlify `netlify/functions/auth.js` обробляє ті самі API endpoints через Netlify Functions, тому окремий Spring-сервер не потрібен. У **Site configuration → Environment variables** додайте `APP_AUTH_EMAIL`, `APP_AUTH_PASSWORD` і `JWT_SECRET_BASE64` та надайте їм scope **Functions**. Згенеруйте новий секрет не коротший за 32 байти; ніколи не додавайте ці значення до репозиторію. Після збереження змінних запустіть новий deploy сайту. У production `VITE_API_BASE_URL` залиште порожнім, щоб запити йшли на той самий Netlify-домен.

Spring Boot backend залишається варіантом для локальної розробки з IntelliJ IDEA: Vite проксіює `/api` на `http://localhost:8080`. Для іншого хостингу Spring backend потрібно окремо розгорнути й задати `VITE_API_BASE_URL` під час frontend build.

## Функціонал

- Авторизація
- JWT-авторизація через Spring Security backend
- Пам’ятання email через checkbox
- Українська та англійська мови зі збереженням вибору
- Перемикання light/dark mode
- Каталог товарів з пошуком та фільтрацією по категоріях
- Кошик із зміною кількості товарів
- Оформлення замовлення
- Зберігання кошика, теми та вибраної мови у localStorage

## Корисні команди

```bash
npm run dev
npm run build
npx netlify deploy --prod --dir=dist
```
