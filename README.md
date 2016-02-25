# apply-patch-operations

applys [patchOperations](http://docs.aws.amazon.com/sdkforruby/api/Aws/APIGateway/Types/PatchOperation.html) to the object.

## Usage

example.js:

```javascript
var applyPatchOperations = require('aws-apply-patch-operations');

var obj = {
  a: {_a: '_x'},
  b: {_b: 2}
};

var operations = applyPatchOperations(obj, [
  { op: 'replace', path: '/a/_a', value: '_y' },
  { op: 'replace', path: '/b/_b', value: '3' }
]);
console.dir(operations);
```

```
$ node ./example.js
{ a: {_a: '_y'},
  b: {_b: 3} }
```

## Supported operations

- add
- remove
- replace

## API

```javascript
var applyPatchOperations = require('apply-patch-operations');
```

### applyPatchOperations(obj, patchOperations, opts)

- Arguments
  - obj - `Object`
  - patchOperations - `Array<map>`
    - path - `String`
    - op - `String` - `"add" | "remove" | "replace"`
    - value - `String`
  - opts - `map`
    - mutable - defaults to `false` - `Boolean`
- Return value
  - patchedObject - `Object`
