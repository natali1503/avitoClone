## Оглавление

- [Описание проекта](#описание-проекта)
- [Технологии](#технологии)
- [Тесты](#тесты)
- [Установка и запуск](#установка-и-запуск)
- [Функциональность](#функциональность)
- [Дополнения в бэкенде](#дополнения-в-бэкенде)
- [Нереализованные пункты задания](#нереализованные-пункты-задания)

---

## Описание проекта

**avitoClone** создано в рамках [задания](https://github.com/avito-tech/tech-internship/blob/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-winter-2025/Frontend-trainee-assignment-winter-2025.md).

Проект представляет собой клон Авито с возможностью размещения, редактирования и просмотра объявлений в трёх категориях:

- Недвижимость
- Авто
- Услуги

---

## Технологии

Проект написан на **TypeScript** с использованием **React** и **Redux Toolkit**.

| Библиотека                          | Описание                                                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **MUI**                             | UI-библиотека компонентов для стилизации интерфейса.                                                              |
| **reduxjs/toolkit**                 | Управление глобальным состоянием приложения, работа с асинхронными запросами (`createSlice`, `createAsyncThunk`). |
| **axios**                           | Отправка HTTP-запросов, работа с API, обработка ответов и заголовков.                                             |
| **react-router-dom**                | Реализация маршрутизации (переход между страницами).                                                              |
| **react-hook-form**                 | Упрощает работу с формами (создание и редактирование объявлений).                                                 |
| **jest**, **React Testing Library** | Для тестирования компонентов и функций                                                                            |

---

## Тесты

Тестирование охватывает следующие сценарии:

- [Создание объявления](https://github.com/natali1503/avitoClone/blob/main/client/__test__/creatingAd.test.js).
- [Отображение детального объявления](https://github.com/natali1503/avitoClone/blob/main/client/__test__/displayDetailsAd.test.js).
- [Отображение всех объявлений](https://github.com/natali1503/avitoClone/blob/main/client/__test__/displayListItems.test.js).
- [Фильтрация объявлений](https://github.com/natali1503/avitoClone/blob/main/client/__test__/filtration.test.js).

---

## Установка и запуск

### Запуск в docker контейнере

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/natali1503/avitoClone.git
   ```
2. Перейдите в каталог проекта:
   ```sh
   cd avitoClone
   ```
3. Запустите проект с помощью Docker:
   ```sh
   docker-compose up --build
   ```
4. Откройте в браузере:
   ```sh
   http://localhost:80
   ```

### Запуск локально

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/natali1503/avitoClone.git
   ```
2. Перейдите в каталог client и запустите приложение:

   ```sh
   cd avitoClone/client
   npm run dev
   ```

3. Перейдите в каталог server и запустите приложение:

   ```sh
   cd avitoClone/server
   npm run start
   ```

4. Откройте в браузере:
   ```sh
   http://localhost:5173/
   ```

---

## Функциональность

### **1. Размещение объявлений**

- Форма с несколькими шагами для создания объявления.
- Поддержка трёх категорий (Недвижимость, Авто, Услуги).
- Все изменения в объявлении сохраняются в черновик и восстанавливаются при перезагрузке страницы.

### **2. Список объявлений**

- Отображение всех размещённых объявлений.
- Пагинация (максимум 5 объявлений на странице).
- Фильтрация по категории и названию.
- Фильтрация по обязательным полям внутри категории.

### **3. Просмотр объявлений**

- Детальная карточка объявления с возможностью редактирования и удаления.

### **4. Редактирование объявлений**

- Без смены категории → Обновление данных через PUT-запрос.
- Со сменой категории → Создаётся новое объявление, а старое удаляется.
  В бэкенде [PUT](https://github.com/natali1503/avitoClone/blob/10b7b6051bf36e6fa1cd2035b448567b24b2eb37/server/app.js#L85) /items/:id не удаляет поля, если они отсутствуют в новом req.body.
  Это означает, что при смене категории старые поля из предыдущей категории сохраняются, даже если они не актуальны.
- Все изменения в объявлении сохраняются в черновик и восстанавливаются при перезагрузке страницы.

### **5. Общее**

Для всех запросов реализовано прерывание (отмена/прекращение) запросов при переходе со страницы на страницу.

## Дополнения в бэкенде

- В [бэкенде](https://github.com/natali1503/avitoClone/blob/10b7b6051bf36e6fa1cd2035b448567b24b2eb37/server/app.js#L11) был увеличен размер JSON-тела до 50MB. Для поддержки загрузки изображений, закодированных в Base64.

---

## Нереализованные пункты задания

**Авторизация пользователей**

- Не реализовано, так как на бэкенде не предусмотрены эндпоинты для аутентификации.
- В будущем можно добавить JWT-токены и OAuth для авторизации.
