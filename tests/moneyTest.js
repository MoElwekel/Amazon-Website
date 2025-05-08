import {formatCurrency} from '../scrips/utils/money.js';

console.log('Test Suite: FormatCurrency...');
//basic test case
console.log('convert cents to dollars');
if (formatCurrency(2095)==='20.95'){
  console.log('Test passed!');
}else{
  console.log('Test failed!');
}

// edge test cases
console.log('delling with 0');
if (formatCurrency(0) === '0.00'){
  console.log('Test passed!');
}else{
  console.log('Test failed!');
}

console.log('round to 2 decimal places');
if (formatCurrency(2000.5)  === '20.01'){
  console.log('Test passed!');
}else{
  console.log('Test failed!');
}

if (formatCurrency(2000.4)  === '20.00'){
  console.log('Test passed!');
}else{
  console.log('Test failed!');
}
 












