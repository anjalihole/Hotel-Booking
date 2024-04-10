/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import express from 'express';
import { Logger } from '../common/logger';
import { register as registerUserRoutes } from './user/user.routes';
import { register as registerHotelRoutes } from './hotel/hotel.routes';
import { register as registerpaymentRoutes } from './payment/payment.routes';
import { register as registerroomRoutes } from './room/room.routes';
import { register as registeraddressRoutes } from './address/address.routes';
import { register as registeruserRoutes } from './user/user.routes';
import { register as registeraddressholderRoutes } from './address.holder/address.holder.routes';
import { register as registercustomerRoutes } from './customer/customer.routes';
import { register as registerHotelAmenitiesRoutes } from './hotel.amenities/hotel.amenities.routes';
import { register as registerReservationOrderRoutes } from './reservation.order/reservation.order.routes';
import { register as registerReservationOrderItemRoutes } from './reservation.order.item/reservation.order.item.routes';
import { register as registerRoleRoutes } from './role/role.routes';
import { register as registerRoomAmenitiesRoutes } from './room.amenities/room.amenities.routes';
import { register as registerRoomTypesRoutes } from './room.types/room.types.routes';
import { register as registerFileResourceRoutes } from './file.resource/file.resource.routes';
import { register as registerHotelPhotosRoutes } from './hotel.photos/hotel.photos.routes';
import { register as registerHotelReviewRoutes } from './hotel.review/hotel.review.routes';
import { register as registerUserRolesRoutes } from './user.roles/user.roles.routes';
import { register as registerPropertyRulesRoutes } from './property.rules/property.rules.routes';

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
                registeraddressRoutes(this._app);
                registeruserRoutes(this._app);
                registeraddressholderRoutes(this._app);
                registercustomerRoutes(this._app);
                registerHotelAmenitiesRoutes(this._app);
                registerReservationOrderRoutes(this._app);
                registerReservationOrderItemRoutes(this._app);
                registerRoleRoutes(this._app);
                registerRoomAmenitiesRoutes(this._app);
                registerRoomTypesRoutes(this._app);
                registerFileResourceRoutes(this._app);
                registerHotelPhotosRoutes(this._app);
                registerHotelReviewRoutes(this._app);
                registerUserRolesRoutes(this._app);
                registerPropertyRulesRoutes(this._app);
                
                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
