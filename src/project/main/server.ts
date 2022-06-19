import { DataSource } from 'typeorm';
import { connect } from './config/connection/connection';
import DatabaseInfo from './config/database/database-info';

const port = 3000;

connect().then(async (datasource: DataSource) => {

    const database = DatabaseInfo.getInstance();
    database.datasource = datasource;

    const { setUpApp } = await import('./config/app');
    const app = await setUpApp();
    
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}).catch(console.error);