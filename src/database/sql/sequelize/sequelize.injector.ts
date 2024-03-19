import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { UserRepo } from './repositories/User/user.repo';
import { HotelRepo } from './repositories/Hotel/hotel.repo';
import { PaymentRepo } from './repositories/Payment/payment.repo';
import { RoomRepo } from './repositories/Room/room.repo';

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
