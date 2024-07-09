
---

# Hava-Havai Project

The Hava-Havai project manages airport data imported from an Excel spreadsheet into a SQLite database using Node.js and Sequelize ORM.

## Features

- **Import Data**: Imports airport, city, and country data from an Excel spreadsheet (`Database.xlsx`) into the SQLite database.
- **API Endpoints**: Provides API endpoints to fetch airport data based on IATA codes and includes related city and country information.
- **Database Structure**: Uses Sequelize ORM to define models for Countries, Cities, and Airports, with relationships established between them.

## Project Structure

The project structure is as follows:

- **`src/`**: Contains the application files.
  - **`app.js`**: Entry point for the Node.js application, Contains API routes for handling requests related to airports.
  - **`models/`**: Defines Sequelize models for Countries, Cities, and Airports.
- **`Database.xlsx`**: Excel spreadsheet containing initial data for import.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd hava-havai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up SQLite database:

   - Ensure `database.sqlite` is present or created using SQLite CLI commands.

4. Run the application:

   ```bash
   npm run dev
   ```

5. Access the application locally:

   Open http://localhost:3000 in your browser.

## API Endpoints

### Fetch Airport by IATA Code

- **GET `/airport?iata_code=<iata_code>`**

  Returns airport details including associated city and country information based on the provided IATA code.

  Example Response:
  ```json
  {
    "airport": {
      "id": 145,
      "icao_code": "VIAG",
      "iata_code": "AGR",
      "name": "Agra Airport / Agra Air Force Station",
      "type": "medium_airport",
      "latitude_deg": 27.157683,
      "longitude_deg": 77.960942,
      "elevation_ft": 551,
      "address": {
        "city": {
          "id": 436,
          "name": "Agra",
          "country": {
            "id": 76,
            "name": "India",
            "country_code_two": "IN",
            "country_code_three": "IND",
            "mobile_code": 91,
            "continent_id": 1
          }
        }
      }
    }
  }
  ```
