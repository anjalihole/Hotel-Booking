/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import express from 'express';
import { Logger } from '../common/logger';
import { register as registerUserRoutes } from './user/user.routes';
import { register as registerHotelRoutes } from './hotel/hotel.routes';
import { register as registerpaymentRoutes } from './payment/payment.routes';
import { register as registerroomRoutes } from './room/room.routes';

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

                registerUserRoutes(this._app);
                registerHotelRoutes(this._app);
                registerpaymentRoutes(this._app);
                registerroomRoutes(this._app);

                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
