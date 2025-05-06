const express = require('express')

const HttpError = require('../models/error-model')
const app = express()

const axios = require('axios')

async function getCoordinate(address){
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: address,
              format: 'json',
              limit: 1
            },
            headers: {
              'User-Agent': 'YourAppName/1.0 (makram.dev@pk.see.biz)'
            }
          });
      
          if (response.data.length === 0) {
           throw new HttpError('Location not found',422);
          }
      
          const { lat, lon, display_name } = response.data[0];
          return { lat, lon };
        } catch (err) {
          console.error('Geocoding error:', err.message);
          throw err;
        }
      }



module.exports = getCoordinate