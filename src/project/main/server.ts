import { connect } from './config/connection/connection';

connect().then(() => {
    console.log('connected!');
});