import { DataSource } from "typeorm";
import { Customer } from "./entities/customer.js";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "mydb",
  synchronize: true,
  logging: false,
  entities: [Customer],
});

export default dataSource;
