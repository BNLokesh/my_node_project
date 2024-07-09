// app.js
const express = require('express');
const { sequelize, Country, City, Airport } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

// Route to fetch airport data by IATA code
app.get('/airport', async (req, res) => {
  const { iata_code } = req.query;

  try {
    const airport = await Airport.findOne({
      where: { iata_code },
      include: [
        {
          model: City,
          as: 'city',
          include: [
            {
              model: Country,
              as: 'country'
            }
          ]
        }
      ]
    });

    if (!airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }

    // Prepare the response object
    let response = {
      id: airport.id,
      icao_code: airport.icao_code,
      iata_code: airport.iata_code,
      name: airport.name,
      type: airport.type,
      latitude_deg: airport.latitude_deg,
      longitude_deg: airport.longitude_deg,
      elevation_ft: airport.elevation_ft,
      address: {
        city: airport.city ? {
          id: airport.city.id,
          name: airport.city.name,
          country_id: airport.city.country_id,
          is_active: airport.city.is_active,
          lat: airport.city.lat,
          long: airport.city.long
        } : null,
        country: airport.city && airport.city.country ? {
          id: airport.city.country.id,
          name: airport.city.country.name,
          country_code_two: airport.city.country.country_code_two,
          country_code_three: airport.city.country.country_code_three,
          mobile_code: airport.city.country.mobile_code,
          continent_id: airport.city.country.continent_id
        } : null
      }
    };

    return res.json({ airport: response });
  } catch (err) {
    console.error('Error fetching airport:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

module.exports = app;
