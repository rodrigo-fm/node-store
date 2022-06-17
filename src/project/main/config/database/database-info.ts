import { DataSource } from "typeorm";

export default class DatabaseInfo {
    private static instance: DatabaseInfo;
    public datasource: DataSource;

    private constructor() {}

    public static getInstance(): DatabaseInfo {
        if(DatabaseInfo.instance === undefined) {
            DatabaseInfo.instance = new DatabaseInfo();
        }
        return DatabaseInfo.instance;
    }
}