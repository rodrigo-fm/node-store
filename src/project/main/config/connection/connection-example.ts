import { DataSource } from 'typeorm';

export const connectionExample = async (): Promise<DataSource> => {
    try {
        const datasource =  new DataSource({
            type: 'mysql',
            host: '',
            port: 0,
            username: '',
            password: '',
            database: '',
            entities: [__dirname + '/4-infra/models/*.{js,ts}']
        })
    
        await datasource.initialize();
        console.log('database connection initalized');
        return datasource;
    } catch(error) {
        console.log('error connection to database: ' + JSON.stringify(error));
    }
};