import { IUrlTrimService } from './urlTrimServiceBase';
import { urlTrimServiceInMemory } from './urlTrimServiceInMemory';
import { urlTrimServiceMongoDB } from './urlTrimServiceMongoDB';

export function urlTrimService(
    inMemory: boolean
): IUrlTrimService {
    if (inMemory) {
        return new urlTrimServiceInMemory();
    }
    return urlTrimServiceMongoDB;
}
