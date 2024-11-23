# ToDo-applikation

Det här är min fullstack-applikation jag tidigare gjort i javascript men konverterat till TypeScript. Den hanterar en enkel ToDo-lista och är gjord för att visa hur frontend, backend och en databas kan samverka. Jag har använt React för frontend, Express för backend och PostgreSQL som databas.

---

## Funktioner

### Frontend

- Hämtar data från backend och visar en lista med ToDos.
- Möjlighet att lägga till, redigera, ta bort och markera uppgifter som klara.
- Byggt med React, och gränssnittet är stylat med Material UI.

### Backend

- En REST API byggt med Express.
- Hanterar CRUD-operationer:
  - **GET** för att läsa ToDos.
  - **POST** för att lägga till nya.
  - **PUT** för att uppdatera befintliga.
  - **DELETE** för att ta bort.
- Kommunicerar med PostgreSQL-databasen.

### Databas

- Tabellen `todos` har:
  - `id`: Primärnyckel.
  - `title`: Titel för uppgiften.
  - `description`: En valfri beskrivning.
  - `is_completed`: Boolean för status (klar/ej klar).

---

## Installation och körning

1. **Klona projektet**
   ```bash
   git clone <repository-url>
   cd backend
   ```
