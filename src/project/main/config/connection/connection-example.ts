import { DataSource } from 'typeorm';

export const MySQLDatasource = new DataSource({
    type: 'mysql',
    host: '',
    port: 0,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/4-infra/models/*.{js,ts}']
});

MySQLDatasource.initialize()
    .then(() => console.log('Database connected'))
    .catch(console.error);