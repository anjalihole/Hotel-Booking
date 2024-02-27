/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import express from 'express';
import { Logger } from '../common/logger';
import { register as registerCustomerRoutes } from './customer/customer.routes';
import { register as registerHotelRoutes } from './Hotel/hotel.routes';

////////////////////////////////////////////////////////////////////////////////////

export class Router {
    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message: `Hotel-Booking API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerCustomerRoutes(this._app);
                registerHotelRoutes(this._app);

                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
