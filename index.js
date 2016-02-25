var copy = require('deep-copy');
var pointer = require('json-pointer');

module.exports = function(obj, patchOperations, opts) {
  if (!opts) opts = {};
  if (!opts.mutable) {
    obj = copy(obj);
  }

  patchOperations.forEach(function(patchOp) {
    switch(patchOp.op) {
    case 'add':
      pointer.set(obj, patchOp.path, maybeJSON(patchOp.value));
      break;
    case 'replace':
      pointer.set(obj, patchOp.path, maybeJSON(patchOp.value));
      break;
    case 'remove':
      pointer.remove(obj, patchOp.path);
      break;
    default:
      throw new Error("operation " + patchOp.op + " is not supported");
    }
  });

  return obj;
};

function maybeJSON(v) {
  try {
    return JSON.parse(v);
  } catch(e) {
    return v;
  }
}
