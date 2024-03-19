import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { UserRepo } from './repositories/user/user.repo';
import { HotelRepo } from './repositories/hotel/hotel.repo';
import { PaymentRepo } from './repositories/payment/payment.repo';
import { RoomRepo } from './repositories/room/room.repo';

////////////////////////////////////////////////////////////////////////////////

export class SequelizeInjector {

    static registerInjections(container: DependencyContainer) {

        container.register('IPrimaryDatabaseConnector', DatabaseConnector_Sequelize);

        container.register('IUserRepo', UserRepo);

        container.register('IHotelRepo', HotelRepo);
        container.register('IPaymentRepo', PaymentRepo);
        container.register('IRoomRepo', RoomRepo);
    }

}
