import knex from "knex";
import { Transform, Writable } from "node:stream";

const knexInstance = knex({
  client: "mysql2",
  connection: {
    port: 3306,
    host: "localhost",
    user: "joao",
    password: "joao",
    database: "teste",
  },
});

const transformStreamToString = new Transform({
  objectMode: true,
  transform(chunk, enconding, callback) {
    callback(null, JSON.stringify(chunk));
  },
});

const writableStream = new Writable({
  write(chunk, enconding, callback) {
    const string = chunk.toString();
    const data = JSON.parse(string);
    callback();
  },
});

console.log("Iniciou a consulta ", new Date().toISOString());
const readableStream = knexInstance
  .select(knexInstance.raw("* FROM teste;"))
  .stream();

readableStream
  .pipe(transformStreamToString)
  .pipe(writableStream)
  .on("close", () =>
    console.log("Finalizou a consulta ", new Date().toISOString())
  );
