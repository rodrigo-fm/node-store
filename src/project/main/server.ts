import { DataSource } from 'typeorm';
import { connect } from './config/connection/connection';
import DatabaseInfoSingleton from './singletons/database-info-singleton';

const port = 3000;

connect().then(async (datasource: DataSource) => {

    const database = DatabaseInfoSingleton.getInstance();
    database.datasource = datasource;

    const { setUpApp } = await import('./config/app');
    const app = await setUpApp();
    
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}).catch(console.error);