var test = require('tape');

var applyPatchOperations = require('..');

test('delete/add', function(t) {
  t.plan(1);

  var patchOperations = [
    {path: '/a', op: 'remove'},
    {path: '/b', op: 'add', value: '_b'},
  ];
  var result = applyPatchOperations({a: '_a'}, patchOperations)
  t.deepEqual(result, {b: '_b'});
});

test('replace', function(t) {
  t.plan(1);

  var patchOperations = [
    {path: '/a', op: 'replace', value: '_b'},
  ];
  var result = applyPatchOperations({a: '_a'}, patchOperations)
  t.deepEqual(result, {a: '_b'});
});

test('with numbers', function(t) {
  t.plan(1);

  var patchOperations = [
    {path: '/a', op: 'replace', value: '2'},
  ];
  var result = applyPatchOperations({a: 1}, patchOperations)
  t.deepEqual(result, {a: 2});
});

test('with booleans', function(t) {
  t.plan(1);

  var patchOperations = [
    {path: '/a', op: 'replace', value: 'true'},
  ];
  var result = applyPatchOperations({a: false}, patchOperations);
  t.deepEqual(result, {a: true});
});

test('with nested objects', function(t) {
  t.plan(1);

  var patchOperations = [
    {path: '/a/_a', op: 'replace', value: '_y'},
    {path: '/b/_b', op: 'replace', value: '3'},
  ];
  var result = applyPatchOperations({a: {_a: '_x'}, b: {_b: 2}}, patchOperations)
  t.deepEqual(result, {a: {_a: '_y'}, b: {_b: 3}});
});

test('mutate arguments only if opts.mutable is truthy', function(t) {
  t.plan(2);

  var obj = {a: "b"};
  applyPatchOperations(obj, [{path: '/a', op: 'remove'}]);
  t.deepEqual(obj, {a: "b"})

  var obj = {a: "b"};
  applyPatchOperations(obj, [{path: '/a', op: 'remove'}], {mutable: true});
  t.deepEqual(obj, {})
});
