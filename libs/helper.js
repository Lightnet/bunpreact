/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  Browser Client. Can't use node and bun since it on client side.

*/

export function isEmpty(str) {
  return (!str || str.length === 0 );
}

export function isObjEmpty(obj){
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}



