# Docker – konfiguracja MongoDB dla Temex

**Nazwa bazy danych używana w aplikacji:** `temex-mongo`

---

## ⚡ Szybki start (zalecany)

Uruchom poniższe polecenie w terminalu (Docker Desktop CLI lub dowolnym terminalu z Docker):

```bash
docker run -d \
  --name temex-mongo \
  -p 27017:27017 \
  -v temex-mongo-data:/data/db \
  mongo:6.0
Opis działania:
Uruchamia MongoDB 6.0 w tle
Nadaje kontenerowi nazwę temex-mongo
Udostępnia MongoDB na porcie localhost:27017
Dane przechowywane są w wolumenie Docker temex-mongo-data
⚙️ Konfiguracja aplikacji
W projekcie połączenie z bazą danych znajduje się w pliku db.js:
const uri = 'mongodb://localhost:27017';
const dbName = 'temex-mongo';
W razie potrzeby możesz zmienić URI lub nazwę bazy w db.js.
🛠 Dodatkowe polecenia Docker
Zatrzymanie kontenera:
docker stop temex-mongo
Ponowne uruchomienie kontenera:
docker start temex-mongo
Usunięcie kontenera (dane zostają zachowane):
docker rm temex-mongo
Usunięcie danych MongoDB na stałe:
docker volume rm temex-mongo-data
Dzięki temu prostemu setupowi, baza danych MongoDB dla Temex będzie gotowa do użycia w Twojej lokalnej instalacji projektu. Możesz teraz uruchomić aplikację i korzystać ze wszystkich funkcjonalności wymagających bazy.