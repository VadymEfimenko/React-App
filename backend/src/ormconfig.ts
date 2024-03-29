import {ConnectionOptions} from "typeorm";

const config : ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port : 5432,
    username: "postgres",
    password: "1234",
    database: "radency",
    entities: [
        __dirname + '/**/*.entity{.ts,.js}'
    ],
    synchronize: true,
}

export default config;