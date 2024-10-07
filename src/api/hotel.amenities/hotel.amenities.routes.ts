/* eslint-disable linebreak-style */
import express from 'express';
import { HotelAmenitiesController } from './hotel.amenities.controller';
import { Loader } from '../../startup/loader';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new HotelAmenitiesController();

    router.post('/', authenticator.authenticateClient, controller.create);
    router.get('/search',  authenticator.authenticateClient, controller.search);
    router.get('/:id',  authenticator.authenticateClient, controller.getById);
    router.put('/:id',  authenticator.authenticateClient, controller.update);
    router.delete('/:id',  authenticator.authenticateClient, controller.delete);

    app.use('/api/v1/hotelamenities', router);
};
