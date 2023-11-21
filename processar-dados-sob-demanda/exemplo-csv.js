import fs from "node:fs";
import csv from "csv-parser";
import { Transform, Writable } from "node:stream";

const readableStream = fs.createReadStream("teste.csv");
const transformStreamToObject = csv({ separator: ";" });
const transformStreamToString = new Transform({
  objectMode: true,
  transform(chunk, enconding, callback) {
    callback(null, JSON.stringify(chunk));
  },
});


const writableStream = new Writable({
  write(chunk, enconding, callback) {
    // o chunk seria a linha do csv sendo lida
    const string = chunk.toString();
    const data = JSON.parse(string);
    // console.log(data);
    callback()
  },
});

console.log('Iniciou', Date())
readableStream
  .pipe(transformStreamToObject)
  .pipe(transformStreamToString)
  .pipe(writableStream)
  .on('close', ()=> console.log('Finalizou', Date()));
