import { createKnex } from "./knex";

import * as fs from "fs";
import { config } from "dotenv";
import * as path from "path";

config();

const knex = createKnex();
const sqlInitializationFilePath = path.resolve(__dirname, "scripts/db.sql");

fs.readFile(sqlInitializationFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  console.log("Executando o script: ");
  console.log(data);

  knex.raw(data)
    .then(() => console.log("Execução finalizada"))
    .catch(console.error)
    .finally(process.exit)
});