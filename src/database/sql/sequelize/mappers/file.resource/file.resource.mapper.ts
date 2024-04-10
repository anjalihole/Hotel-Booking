/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable key-spacing */
// /* eslint-disable linebreak-style */
import { FileResourceDto } from '/../src/domain.types/file.resource/file.resource.dto';
import FileResource from '../../models/file.resource/file.resource.model';

///////////////////////////////////////////////////////////////////////////////////

export class FileResourceMapper {
    static toDto = (fileresource: FileResource): FileResourceDto => {
        if (fileresource == null) {
            return null;
        }
        const dto: FileResourceDto = {

            id: fileresource.id,
            Name: fileresource.Name,
            MineType: fileresource.MineType,
            StorageKey: fileresource.StorageKey,
            IsPublic: fileresource.IsPublic,
            Url:fileresource.Url,
        };
        return dto;
    };

    static toFileResourceDto = (fileresource: FileResource): FileResourceDto => {
        if (fileresource == null) {
            return null;
        }
        const dto: FileResourceDto = {

            id: fileresource.id,
            Name: fileresource.Name,
            MineType: fileresource.MineType,
            StorageKey: fileresource.StorageKey,
            IsPublic: fileresource.IsPublic,
            Url:fileresource.Url,
        };
        return dto;
    };
}
