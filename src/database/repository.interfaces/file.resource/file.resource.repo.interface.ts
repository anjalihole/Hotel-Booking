/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
import { FileResourceSearchFilters, FileResourceSearchResults } from '../../../domain.types/file.resource/file.resource.search.types';
import { FileResourceDomainModel } from '/../src/domain.types/file.resource/file.resource.domain.model';
import { FileResourceDto } from '../../../domain.types/file.resource/file.resource.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IFileResourceRepo {
         create(fileresourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto>;

         getById(id: string): Promise<FileResourceDto>;

         getAllFileResource(): Promise<FileResourceDto[]>;

         update(id: string, FileResourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto>;

         search(filters: FileResourceSearchFilters): Promise<FileResourceSearchResults>;
         
         delete(id: string): Promise<boolean>;
 }
