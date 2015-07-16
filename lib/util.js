/**
 * Merges the properties of two objects into one
 * @private
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
export function mergeOptions(obj1, obj2){
  var ret = {};
  for (let attrname in obj1) { ret[attrname] = obj1[attrname]; }
  for (let attrname in obj2) { ret[attrname] = obj2[attrname]; }
  return ret;
}

/**
 * @private
 * @param  {object}
 * @param  {Function}
 * @return {object} Object with properties (something, probably a JSDoc way to do this)
 */
export function generateOptionsAndCallback(options, callback){
  let ret = {};

  if(typeof options === 'object'){
    ret.options = options;
    if(callback){
      ret.callback = callback;
    }
  }
  else{
    if(typeof options === 'function'){
      ret.callback = options;
    }
    ret.options = {};
  }
  return ret;
}