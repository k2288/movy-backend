import { Inject, Injectable } from "@nestjs/common";
import { ITaskService } from "../interfaces/task-service.interface";
import { CronJob } from 'cron';
import { SchedulerRegistry } from "@nestjs/schedule";
import { ELASTIC_SERVICE, IElasticService } from "src/elastic/interfaces/elastic-service.interface";
@Injectable()
export class TaskService implements ITaskService{
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        @Inject(ELASTIC_SERVICE) private _elasticService: IElasticService,
    ){}

    async onApplicationBootstrap() {

        if (process.env.CRON_ENABLED === "true") {
            const tasks = await this.taskList();

            tasks?.forEach((element) => {
                if (element.isActive)
                    this.runTaskBaseOnName(element)
            });
        }
    }

    taskList() : [any] {
        throw new Error("Method not implemented.");
    }

    runTaskBaseOnName(element) {
        let job: CronJob
        switch (element.methodName) {

        }

        if(job){
            this.schedulerRegistry.addCronJob(element.methodName, job)
            // this._elasticService.logTaskInfo({
            //     type: "INIT_TASK",
            //     message: `Init ${element.methodName} crontab with value of ${element.cron} and isactive of ${element.isActive}, next run : ${job.nextDate()}`
            // })
            job.start();
        }
    }

    runJob(job) {
        if (!job.isActive) {
            // this._elasticService.logTaskInfo({
            //     type: "REMOVE_TASK",
            //     message: `Remove ${job.methodName} crontab `
            // })
            try {
                this.schedulerRegistry.deleteCronJob(job.methodName);
                this.schedulerRegistry.deleteCronJob(`${job.methodName}-2`);
            } catch (e) {
                //  this._elasticService.log_error({
                //     timestamp: new Date().toISOString(),
                //     message:e.message,
                //     path: "runJob : remove job" ,
                //     _e:e
                // })

            }

        } else {
            try {
                this.schedulerRegistry.deleteCronJob(job.methodName);
                this.schedulerRegistry.deleteCronJob(`${job.methodName}-2`);
            } catch (e) {
                // this._elasticService.log_error({
                //     timestamp: new Date().toISOString(),
                //     message:e.message,
                //     path: "runJob : remove job" ,
                //     _e:e
                // })

            }

            this.runTaskBaseOnName(job)
        }

        return;
    }
}