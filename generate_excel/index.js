const json2xls = require('json2xls');
const fs = require('fs')
const json = [{
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    date: new Date().toDateString('dd/MM/yyyy')
},
{
    foo: 'bar 2',
    qux: 'moo 2',
    poo: 1234,
    date: new Date('2021-05-20').toDateString()
}]

const xls = json2xls(json);

fs.writeFileSync('data.xlsx', xls, 'binary');