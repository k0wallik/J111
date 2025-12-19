# Temex – Aplikacja czatowa

Projekt zaliczeniowy Node.js/Express – umożliwia użytkownikom rejestrację, logowanie, wysyłanie wiadomości, edycję profilu i punktowanie aktywności.  

---

##  Opis projektu
**Temex** to serwerowa aplikacja webowa zbudowana w **Node.js** i **Express**.  
Użytkownicy mogą rejestrować konta, logować się, przeglądać czat, dodawać, edytować i usuwać wiadomości. Punkty przydzielane są za aktywność.  
Dane użytkowników (w tym hasła) są bezpiecznie przechowywane w **MongoDB**.  
Front-end korzysta z **EJS** i własnego CSS. Projekt zawiera obsługę błędów, strony błędów oraz odpowiednie kody HTTP.

---

## Funkcjonalności

### Autoryzacja
- Rejestracja użytkownika z walidacją danych
- Logowanie i wylogowanie
- Sesje użytkownika z middleware chroniącym dostęp do czatu i leaderboardu

### Czat i wiadomości
- Wyświetlanie wszystkich wiadomości
- Dodawanie, edycja i usuwanie własnych wiadomości
- Filtrowanie wiadomości po użytkowniku
- Aktualizacja punktów za aktywność

### Profile
- Wyświetlanie profilu użytkownika
- Punkty przypisane do konta

### Leaderboard
- Sortowanie użytkowników po punktach (rosnąco/malejąco)
- Dynamiczne linki do profili `/user/:id`

### Obsługa błędów
- Własne strony błędów (403, 404, 500)
- Poprawne kody HTTP
- Odporność na typowe błędy użytkownika

---

## 🚀 Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/TwojeRepo/temex
cd temex
2. Wymagania
Node.js (v18+)
npm
MongoDB
Docker (opcjonalnie)
3. Instalacja zależności
npm install
4. Konfiguracja Docker (MongoDB)
docker run -d \
  --name temex-mongo \
  -p 27017:27017 \
  -v temex-mongo-data:/data/db \
  mongo:6.0
Połączenie w aplikacji w db.js:
const uri = 'mongodb://localhost:27017';
const dbName = 'temex-mongo';
5. Uruchomienie aplikacji
npm start
Dostęp pod: http://localhost:3000
🔗 Endpoints
Sekcja	Endpoint	Opis
Strona główna	GET /	Homepage
Logowanie	GET /auth/login	Formularz logowania
POST /auth/login	Logowanie użytkownika
Rejestracja	GET /auth/register	Formularz rejestracji
POST /auth/register	Tworzenie konta
Wylogowanie	GET /auth/logout	Wylogowanie
Czat	GET /chat	Wyświetlanie wiadomości
POST /chat/add	Dodawanie wiadomości
GET /chat/edit/:id	Formularz edycji wiadomości
POST /chat/edit/:id	Edycja wiadomości
POST /chat/delete/:id	Usuwanie wiadomości
Profile	GET /user/:id	Wyświetlenie profilu użytkownika
Leaderboard	GET /leaderboard	Lista użytkowników z punktami
🛠 Technologie
Język: JavaScript (Node.js)
Framework: Express
Silnik szablonów: EJS
Baza danych: MongoDB
Sesje i autoryzacja: express-session
Stylowanie: CSS
Docker: MongoDB w kontenerze
📦 Docker – konfiguracja MongoDB dla Temex
Nazwa bazy danych: temex-mongo
Szybki start
docker run -d \
  --name temex-mongo \
  -p 27017:27017 \
  -v temex-mongo-data:/data/db \
  mongo:6.0
Uruchamia MongoDB 6.0 w tle
Nadaje kontenerowi nazwę temex-mongo
Udostępnia MongoDB na porcie localhost:27017
Dane przechowywane są w wolumenie Docker temex-mongo-data
Dodatkowe polecenia
docker stop temex-mongo      # Zatrzymanie kontenera
docker start temex-mongo     # Ponowne uruchomienie
docker rm temex-mongo        # Usunięcie kontenera (dane zachowane)
docker volume rm temex-mongo-data # Usunięcie danych MongoDB na stałe
👤 Autor
Wiktor Kowalik
