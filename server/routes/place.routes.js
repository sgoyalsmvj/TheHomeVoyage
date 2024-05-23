const express = require('express');
const placeRouter = express.Router();
const Place = require('../models/Place.js');
const { getAllPlaces, getPlace, addPlace, editPlace, deletePlace, userPlaces } = require('../controllers/place.controllers.js');
const { authenticateUser } = require('../middlewares/auth.middleware.js');


placeRouter.get('/places',getAllPlaces);
placeRouter.get('/places/:id',getPlace);

placeRouter.post('/places',authenticateUser, addPlace);
placeRouter.put('/places/:id',authenticateUser, editPlace);
placeRouter.delete('/places/:id',authenticateUser, deletePlace);
placeRouter.get('/user-places',authenticateUser, userPlaces);


module.exports = placeRouter;