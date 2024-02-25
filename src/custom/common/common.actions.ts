import { Loader } from '../../startup/loader';
import { UserTaskDomainModel } from '../../domain.types/users/user.task/user.task.domain.model';
import { UserActionType } from '../../domain.types/users/user.task/user.task.types';
import { UserTaskService } from '../../services/users/user/user.task.service';
import { CustomTaskService } from '../../services/users/user/custom.task.service';
import { CustomTaskDomainModel } from '../../domain.types/users/custom.task/custom.task.domain.model';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class CommonActions {

    _customTaskService: CustomTaskService = null;

    _userTaskService: UserTaskService = null;

    constructor() {
        this._customTaskService = Loader.container.resolve(CustomTaskService);
        this._userTaskService = Loader.container.resolve(UserTaskService);
    }

    //#region Public

    createCustomTask = async (domainModel: CustomTaskDomainModel) => {
        const customTask = await this._customTaskService.create(domainModel);
        if (customTask == null) {
            throw new ApiError(400, 'Cannot create custom task!');
        }

        const userTaskModel: UserTaskDomainModel = {
            UserId             : customTask.UserId,
            ActionId           : customTask.id,
            ActionType         : UserActionType.Custom,
            Task               : customTask.Task,
            Description        : customTask.Description,
            ScheduledStartTime : customTask.ScheduledStartTime,
            ScheduledEndTime   : customTask.ScheduledEndTime ?? null,
            Category           : customTask.Category,
            Status             : customTask.Status
        };

        var userTask = await this._userTaskService.create(userTaskModel);
        userTask['Action'] = customTask;
        return userTask;
    };

}
