/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { FileResourceDomainModel } from '../../domain.types/file.resource/file.resource.domain.model';
import { FileResourceDto } from '../../domain.types/file.resource/file.resource.dto';
import { IFileResourceRepo } from '../../database/repository.interfaces/file.resource/file.resource.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { FileResourceSearchFilters,FileResourceSearchResults} from '../../domain.types/file.resource/file.resource.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class FileResourceService {
    constructor(@inject('IFileResourceRepo') private _fileresourceRepo: IFileResourceRepo) {}

    create = async (fileresourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto> => {
        
        return await this._fileresourceRepo.create(fileresourceDomainModel);
    };

    getById = async (id: string): Promise<FileResourceDto> => {
        return await this._fileresourceRepo.getById(id);
    };

    getAllFileResource = async (): Promise<FileResourceDto[]> => {
        return await this._fileresourceRepo.getAllFileResource();
    };

    update = async (id: string, fileresourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto> => {
        return await this._fileresourceRepo.update(id, fileresourceDomainModel);
    };

    public search = async (filters: FileResourceSearchFilters): Promise<FileResourceSearchResults> => {
        return await this._fileresourceRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._fileresourceRepo.delete(id);
    };
}
