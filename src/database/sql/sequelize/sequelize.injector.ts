import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { CustomerRepo } from './repositories/customer/customer.repo';
import { HotelRepo } from './repositories/hotel/hotel.repo';

////////////////////////////////////////////////////////////////////////////////

export class SequelizeInjector {

    static registerInjections(container: DependencyContainer) {

        container.register('IPrimaryDatabaseConnector', DatabaseConnector_Sequelize);

        container.register('ICustomerRepo', CustomerRepo);

        container.register('IHotelRepo', HotelRepo);

    }

}
