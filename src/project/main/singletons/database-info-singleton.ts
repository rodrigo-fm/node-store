import { DataSource } from "typeorm";

export default class DatabaseInfoSingleton {
    private static instance: DatabaseInfoSingleton;
    public datasource: DataSource;

    private constructor() {}

    public static getInstance(): DatabaseInfoSingleton {
        if(DatabaseInfoSingleton.instance === undefined) {
            DatabaseInfoSingleton.instance = new DatabaseInfoSingleton();
        }
        return DatabaseInfoSingleton.instance;
    }
}