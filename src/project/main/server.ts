import { connect } from './config/connection/connection';

const port = 3000;

connect().then(async (datasource) => {
    const { setUpApp } = await import('./config/app');
    const app = await setUpApp(datasource);
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}).catch(console.error);