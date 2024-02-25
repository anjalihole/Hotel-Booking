/* eslint-disable indent */
/* eslint-disable max-len */
import { PatientService } from '../../services/users/patient/patient.service';
import * as MessageTemplates from '../../modules/communication/message.template/message.templates.json';
import { Loader } from '../../startup/loader';
import { PatientDetailsDto } from '../../domain.types/users/patient/patient/patient.dto';
import { CustomTaskDomainModel } from '../../domain.types/users/custom.task/custom.task.domain.model';
import { UserTaskCategory } from '../../domain.types/users/user.task/user.task.types';
import { Logger } from '../../common/logger';
import { UserTaskService } from '../../services/users/user/user.task.service';
import { CommonActions } from '../common/common.actions';
import { EnrollmentDomainModel } from '../../domain.types/clinical/careplan/enrollment/enrollment.domain.model';
import { UserDeviceDetailsService } from '../../services/users/user/user.device.details.service';
import { KccqAssessmentUtils } from './quality.of.life/kccq.assessment.utils';
import { FileResourceService } from '../../services/general/file.resource.service';
import { PersonService } from '../../services/person/person.service';
import { UserService } from '../../services/users/user/user.service';

///////////////////////////////////////////////////////////////////////////////////////

export class AHAActions {

    _commonActions: CommonActions = new CommonActions();

    _patientService: PatientService = null;

    _personService: PersonService = null;

    _userTaskService: UserTaskService = null;

    _userDeviceDetailsService: UserDeviceDetailsService = null;

    _fileResourceService: FileResourceService = null;

    _userService: UserService = null;

    constructor() {
        this._patientService = Loader.container.resolve(PatientService);
        this._personService = Loader.container.resolve(PersonService);
        this._userTaskService = Loader.container.resolve(UserTaskService);
        this._userDeviceDetailsService = Loader.container.resolve(UserDeviceDetailsService);
        this._fileResourceService = Loader.container.resolve(FileResourceService);
        this._userService = Loader.container.resolve(UserService);

    }

    //#region Public

    public performActions_PostRegistration = async (patient: PatientDetailsDto, clientCode: string) => {
        try {
            var skipClientList = ["HCHLSTRL"];
            if (skipClientList.indexOf(clientCode) === -1) {
                // await this.createAHAHealthSurveyTask(patient);
            }
        }
        catch (error) {
            Logger.instance().log(`Error performing post registration custom actions.`);
        }
    };

    public scheduledMonthlyRecurrentTasks = async () => {
        try {
            const patientUserIds = await this._patientService.getAllPatientUserIds();
            Logger.instance().log(`[KCCQTask] Patients being processed for custom task: ${JSON.stringify(patientUserIds.length)}`);
            for await (var patientUserId of patientUserIds) {
                var userDevices = await this._userDeviceDetailsService.getByUserId(patientUserId);
                var userAppRegistrations = [];
                userDevices.forEach(userDevice => {
                    userAppRegistrations.push(userDevice.AppName);
                });

                if (userAppRegistrations.length > 0 && KccqAssessmentUtils.eligibleForKCCQTask(userAppRegistrations)) {
                    Logger.instance().log(`Creating quality of life questionnaire task for patient:${patientUserId}`);
                } else {
                    Logger.instance().log(`Skip creating task for patient:${patientUserId}`);
                }
            }
        }
        catch (error) {
            Logger.instance().log(`[KCCQTask] Error performing post registration custom actions.`);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public performActions_PostCareplanEnrollment = async (model: EnrollmentDomainModel) => {
        try {
            //Please move post enrollment actions here...
            Logger.instance().log(`Performing post careplan enrollment actions ...`);
        }
        catch (error) {
            Logger.instance().log(`Error performing post registration custom actions.`);
        }
    };

    //#endregion

    //#region Privates

    private checkIfFileResourceExists = async (url) => {
        if (!url) {
            return false;
        }
        try {
            let tempTokens = url.split('file-resources/');
            const second = tempTokens.length > 0 ? tempTokens[1] : null;
            if (second == null) {
                return false;
            }
            tempTokens = second.split('/');
            const fileResourceId = tempTokens.length > 0 ? tempTokens[0] : null;
            if (!fileResourceId) {
                return false;
            }
            const fileResource = await this._fileResourceService.getById(fileResourceId);
            if (!fileResource) {
                return false;
            }
        }
        catch (error) {
            Logger.instance().log(error.message);
            return false;
        }

        return true;
    };

    private createAHAHealthSurveyTask = async (patient: PatientDetailsDto) => {

        //Add AHA specific tasks, events and handlers here...
        const userId = patient.User.id;

        //Adding survey task for AHA patients
        const domainModel: CustomTaskDomainModel = {
            UserId      : userId,
            Task        : "Survey",
            Description : "Take a survey to help us understand you better!",
            Category    : UserTaskCategory.Custom,
            Details     : {
                Link : "https://americanheart.co1.qualtrics.com/jfe/form/SV_b1anZr9DUmEOsce",
            },
            ScheduledStartTime : new Date(),
            ScheduledEndTime   : new Date("2022-10-31 23:59:59")
        };

        const task = await this._commonActions.createCustomTask(domainModel);
        if (task == null) {
            Logger.instance().log('Unable to create AHA survey task!');
        }

    };

    private createHsPatientSurveyTask = async (patient: PatientDetailsDto) => {

        const userId = patient.User.id;

        const domainModel: CustomTaskDomainModel = {
            UserId      : userId,
            Task        : "Patient Satisfaction Survey",
            Description : "Take a survey to help us understand you better!",
            Category    : UserTaskCategory.Custom,
            Details     : {
                Link : "https://tinyurl.com/HSHCholesterol",
            },
            ScheduledStartTime : new Date(),
            ScheduledEndTime   : new Date("2023-12-31 23:59:59")
        };

        const task = await this._commonActions.createCustomTask(domainModel);
        if (task == null) {
            Logger.instance().log('Unable to create patient satisfaction survey task!');
        }

    };

    private eligibleForMedicalProfileTask = (clientCode) => {

        const eligibleClientCodes = [
            'REANPTNT',
            'REANDCTR',
            'REANPTNTAHA'
        ];

        return eligibleClientCodes.indexOf(clientCode) >= 0;
    };

    private eligibleForCareplanRegistartionReminder = (userAppRegistrations) => {

        const eligibleForCareplanRegistartionReminder =
        userAppRegistrations.indexOf('Heart &amp; Stroke Helper™') >= 0 ||
        userAppRegistrations.indexOf('REAN HealthGuru') >= 0 ||
        userAppRegistrations.indexOf('HF Helper') >= 0;

        return eligibleForCareplanRegistartionReminder;
    };

    private eligibleForStrokeSurvey = (userAppRegistrations) => {

        const eligibleForStrokeSurvey =
        userAppRegistrations.indexOf('Heart &amp; Stroke Helper™') >= 0 ||
        (process.env.NODE_ENV === 'development' && userAppRegistrations.indexOf('REAN HealthGuru') >= 0 ) ||
        (process.env.NODE_ENV === 'uat' && userAppRegistrations.indexOf('REAN HealthGuru') >= 0 );
        return eligibleForStrokeSurvey;
    };

    private sendCareplanRegistrationReminder = async (userDeviceTokens) => {

        var title = MessageTemplates['CareplanRegistrationReminder'].Title;
        var body = MessageTemplates['CareplanRegistrationReminder'].Body;

        Logger.instance().log(`Notification Title: ${title}`);
        Logger.instance().log(`Notification Body: ${body}`);

        Logger.instance().log(`Notification template: ${JSON.stringify(MessageTemplates['CareplanRegistrationReminder'])}`);

        var message = Loader.notificationService.formatNotificationMessage(
            MessageTemplates['CareplanRegistrationReminder'].NotificationType, title, body
        );
        for await (var deviceToken of userDeviceTokens) {
            await Loader.notificationService.sendNotificationToDevice(deviceToken, message);
        }

    };

    private sendStrokeSurveyNotification = async (userDeviceTokens) => {

        var title = MessageTemplates['StrokeSurveyNotification'].Title;
        var body = MessageTemplates['StrokeSurveyNotification'].Body;
        var url = MessageTemplates['StrokeSurveyNotification'].Url;

        Logger.instance().log(`Notification Title: ${title}`);
        Logger.instance().log(`Notification Body: ${body}`);
        Logger.instance().log(`Notification URL: ${url}`);

        Logger.instance().log(`Notification template: ${JSON.stringify(MessageTemplates['StrokeSurveyNotification'])}`);

        var message = Loader.notificationService.formatNotificationMessage(
            MessageTemplates['StrokeSurveyNotification'].NotificationType, title, body, url
        );
        Logger.instance().log(`[StrokeCron] Notification Paylod: ${JSON.stringify(message)}`);
        for await (var deviceToken of userDeviceTokens) {
            await Loader.notificationService.sendNotificationToDevice(deviceToken, message);
        }

    };

    //#endregion

}
