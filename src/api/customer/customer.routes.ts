/* eslint-disable linebreak-style */
import express from 'express';
import { CustomerController } from './customer.controller';
// import { Loader } from '../../startup/loader';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CustomerController();

    router.post('/', controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    router.get('/:id', controller.getById);
    router.get('/', controller.getAllCustomer);
    router.put('/:id', controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/api-customer', router);
};
