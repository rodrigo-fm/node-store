import { DataSource } from 'typeorm';

export const devConnection = async (): Promise<DataSource> => {
    try {
        const datasource =  new DataSource({
            type: 'mysql',
            host: 'localhost',
            // host: '172.18.0.2',
            port: 3306,
            username: 'root',
            password: 'root_password_docker',
            database: 'node_store_db',
            entities: [__dirname + '/4-infra/models/*.{js,ts}']
        })
    
        await datasource.initialize();
        console.log('development database connection initalized');
        return datasource;
    } catch(error) {
        console.log('error connection to database: ' + JSON.stringify(error));
    }
};