/* eslint-disable linebreak-style */
import express from 'express';
import { ReservationController } from './reservation.controller';
// import { Loader } from '../../startup/loader';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ReservationController();

    router.post('/', controller.create);
    // router.get('/search',controller.search);
    // router.get('/:id', controller.getById);
    // router.get('/', controller.getAllReservation);
    // router.put('/:id', controller.update);
    // router.delete('/:id',controller.delete);

    app.use('/api/v1/api-reservation', router);
};
