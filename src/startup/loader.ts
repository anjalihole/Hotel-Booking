import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Authenticator } from '../auth/authenticator';
import { Authorizer } from '../auth/authorizer';
import { Logger } from '../common/logger';
// import { MessagingService } from '../modules/communication/messaging.service/messaging.service';
// import { NotificationService } from '../modules/communication/notification.service/notification.service';
import { Injector } from './injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Loader {

    private static _authorizer: Authorizer = null;

    private static _authenticator: Authenticator = null;

    // private static _messagingService: MessagingService = null;

    // private static _notificationService: NotificationService = null;

    private static _container: DependencyContainer = container;

    public static get authenticator() {
        return Loader._authenticator;
    }

    public static get authorizer() {
        return Loader._authorizer;
    }

    // public static get messagingService() {
    //     return Loader._messagingService;
    // }

    // public static get notificationService() {
    //     return Loader._notificationService;
    // }

    public static get container() {
        return Loader._container;
    }

    public static init = async (): Promise<boolean> => {
        try {

            //Register injections here...
            Injector.registerInjections(container);

            Loader._authenticator = container.resolve(Authenticator);
            Loader._authorizer = container.resolve(Authorizer);
            // Loader._seeder = container.resolve(Seeder);

            // Loader._notificationService = container.resolve(NotificationService);
            // Loader._notificationService.init();

            // Loader._messagingService = container.resolve(MessagingService);
            // Loader._messagingService.init();

            return true;

        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };

}
