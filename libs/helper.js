// for client browser

export function isEmpty(str) {
  return (!str || str.length === 0 );
}

export function isObjEmpty(obj){
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}













