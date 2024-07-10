import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { UserRepo } from './repositories/user/user.repo';
import { HotelRepo } from './repositories/hotel/hotel.repo';
import { PaymentRepo } from './repositories/payment/payment.repo';
import { RoomRepo } from './repositories/room/room.repo';
import { AddressRepo } from './repositories/address/address.repo';
import { AddressHolderRepo } from './repositories/address.holder/address.holder.repo';
import { CustomerRepo } from './repositories/customer/customer.repo';
import { HotelAmenitiesRepo } from './repositories/hotel.amenities/hotel.amenities.repo';
import { ReservationOrderRepo } from './repositories/reservation.order/reservation.order.repo';
import { ReservationOrderItemRepo } from './repositories/reservation.order.item/reservation.order.item.repo';
import { RoleRepo } from './repositories/role/role.repo';
import { RoomTypesRepo } from './repositories/room.types/room.types.repo';
import { FileResourceRepo } from './repositories/file.resource/file.resource.repo';
import { HotelPhotosRepo } from './repositories/hotel.photos/hotel.photos.repo';
import { HotelReviewRepo } from './repositories/hotel.review/hotel.review.repo';
import { UserRolesRepo } from './repositories/user.roles/user.roles.repo';
import { PropertyRulesRepo } from './repositories/property.rules/property.rules.repo';
import { RoomAmenitiesRepo } from './repositories/room.amenities/room.amenities.repo';

////////////////////////////////////////////////////////////////////////////////

export class SequelizeInjector {

    static registerInjections(container: DependencyContainer) {

        container.register('IPrimaryDatabaseConnector', DatabaseConnector_Sequelize);

        container.register('IUserRepo', UserRepo);

        container.register('IHotelRepo', HotelRepo);

        container.register('IPaymentRepo', PaymentRepo);

        container.register('IRoomRepo', RoomRepo);

        container.register('IAddressRepo', AddressRepo);

        container.register('IAddressHolderRepo', AddressHolderRepo);

        container.register('ICustomerRepo', CustomerRepo);

        container.register('IHotelAmenitiesRepo', HotelAmenitiesRepo);

        container.register('IReservationOrderRepo', ReservationOrderRepo);

        container.register('IReservationOrderItemRepo', ReservationOrderItemRepo);

        container.register('IRoleRepo', RoleRepo);

        container.register('IRoomTypesRepo', RoomTypesRepo);

        container.register('IFileResourceRepo', FileResourceRepo);

        container.register('IHotelPhotosRepo', HotelPhotosRepo);

        container.register('IHotelReviewRepo', HotelReviewRepo);

        container.register('IUserRolesRepo', UserRolesRepo);

        container.register('IPropertyRulesRepo', PropertyRulesRepo);

        container.register('IRoomAmenitiesRepo', RoomAmenitiesRepo);

    }

}
