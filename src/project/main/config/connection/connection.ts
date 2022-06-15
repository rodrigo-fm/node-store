import { EnvironmentsEnum } from "../../../../shared/enums";

export const connect = async () => {
    switch(process.env.environment) {
        case EnvironmentsEnum.DEVELOPMENT:
            await import('./connection-development');
            break;
        case EnvironmentsEnum.HOMOLOGATION:
            await import('./connection-homologation');
            break;
        case EnvironmentsEnum.PRODUCTION:
            await import('./connection-production');
            break;
        default: break;
    }
}
