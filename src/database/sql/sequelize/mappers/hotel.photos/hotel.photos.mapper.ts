/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
// import { HotelDto } from '../../../../../domain.types/hotel/hotel.dto';
import { HotelPhotosDto } from '../../../../../domain.types/hotel.photos/hotel.photos.dto';
import HotelPhotos from '../../models/hotel.photos/hotel.photos.model';

///////////////////////////////////////////////////////////////////////////////////

export class HotelPhotosMapper {
    static toDto = (hotelphotos: HotelPhotos): HotelPhotosDto => {
        if (hotelphotos == null) {
            return null;
        }
        const dto: HotelPhotosDto = {

            id: hotelphotos.id,
            FileResourceId: hotelphotos.FileResourceId,
            HotelId: hotelphotos.HotelId,
            RoomTypeId: hotelphotos.RoomTypeId,

        };
        return dto;
    };

    static toHotelPhotosDto = (hotelphotos: HotelPhotos): HotelPhotosDto => {
        if (hotelphotos == null) {
            return null;
        }
        const dto: HotelPhotosDto = {
            id: hotelphotos.id,
            FileResourceId: hotelphotos.FileResourceId,
            HotelId: hotelphotos.HotelId,
            RoomTypeId: hotelphotos.RoomTypeId,
             
        };
        return dto;
    };
}
