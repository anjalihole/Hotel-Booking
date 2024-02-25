/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import express from 'express';
import { Logger } from '../common/logger';
import { register as registerAddressRoutes } from './general/address/address.routes';
import { register as registerCustomerRoutes } from './customer/customer.routes';
import { register as registerKnowledgeNuggetRoutes } from './educational/knowledge.nugget/knowledge.nugget.routes';
import { register as registerFileResourceRoutes } from './general/file.resource/file.resource.routes';
import { register as registerOrganizationRoutes } from './general/organization/organization.routes';
import { register as registerFoodComponentMonitoringRoutes } from './wellness/food.component.monitoring/food.component.monitoring.routes';
import { register as registerNoticeRoutes } from './general/notice/notice.routes';
import { register as registerLearningPathRoutes } from './educational/learning/learning.path/learning.path.routes';
import { register as registerCourseRoutes } from './educational/learning/course/course.routes';
import { register as registerCourseModuleRoutes } from './educational/learning/course.module/course.module.routes';
import { register as registerCourseContentRoutes } from './educational/learning/course.content/course.content.routes';
import { register as registerUserLearningRoutes } from './educational/learning/user.learning/user.learning.routes';
import { register as registerNotificationRoutes } from './general/notification/notification.routes';
import { register as registerRssfeedRoutes } from './general/rss.feed/rss.feed.routes';
import { register as registerStatisticsRoutes } from './statistics/app.statistics/statistics.routes';
import { register as registerReminderRoutes } from './general/reminder/reminder.routes';
import { register as registerTenantRoutes } from './tenant/tenant.routes';
import { register as registerCustomQueryRoutes } from './statistics/custom.query/custom.query.routes';
import { register as registerHealthSystemRoutes } from './hospitals/health.system/health.system.routes';
import { register as registerHospitalRoutes } from './hospitals/hospital/hospital.routes';
import { register as registerDailyStatisticsRoutes } from './statistics/daily.statistics/daily.statistics.routes';

////////////////////////////////////////////////////////////////////////////////////

export class Router {
    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message: `REANCare API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerAddressRoutes(this._app);
                registerCustomerRoutes(this._app);
                registerOrganizationRoutes(this._app);
                registerKnowledgeNuggetRoutes(this._app);
                registerFileResourceRoutes(this._app);
                registerFoodComponentMonitoringRoutes(this._app);
                registerNoticeRoutes(this._app);
                registerLearningPathRoutes(this._app);
                registerCourseRoutes(this._app);
                registerCourseModuleRoutes(this._app);
                registerCourseContentRoutes(this._app);
                registerUserLearningRoutes(this._app);
                registerNotificationRoutes(this._app);
                registerRssfeedRoutes(this._app);
                registerStatisticsRoutes(this._app);
                registerReminderRoutes(this._app);
                registerTenantRoutes(this._app);
                registerCustomQueryRoutes(this._app);
                registerHealthSystemRoutes(this._app);
                registerHospitalRoutes(this._app);
                registerDailyStatisticsRoutes(this._app);

                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
