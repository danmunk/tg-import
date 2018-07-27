const fs = require('fs');


const file = fs.readFileSync('./run-report.txt')

var array = fs.readFileSync('./run-report.txt').toString().split("\n");

for(i of array) {
  if (i.startsWith('/')) {
    console.log(i);
  }
}