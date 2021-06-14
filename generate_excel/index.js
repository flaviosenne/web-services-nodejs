var json2xls = require('json2xls');
var fs = require('fs')
var json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    date: new Date().toDateString('dd/MM/yyyy')
}

var xls = json2xls(json);

fs.writeFileSync('data.xlsx', xls, 'binary');