import { DataSource } from "typeorm";
import { EnvironmentsEnum } from "../../../../shared/enums";
import { devConnection } from "./connection-development";
// import { homologationConnection } from "./connection-homologation";
// import { productionConnection } from "./connection-production";

import 'dotenv/config';

export const connect = async (): Promise<DataSource> => {
    switch(process.env.environment) {
        case EnvironmentsEnum.DEVELOPMENT:
            return await devConnection();
        // case EnvironmentsEnum.HOMOLOGATION:
        //     return await homologationConnection();
        // case EnvironmentsEnum.PRODUCTION:
        //     return await productionConnection();
        default:
            console.log('invalid or no value for environemnt was provided at .env');
            break;
    }
}