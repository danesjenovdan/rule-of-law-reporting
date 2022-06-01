function has(obj, value) {
  return Object.prototype.hasOwnProperty.call(obj, value);
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isLogicalKeyValue(key, value) {
  return ['or', 'and'].includes(key) && isObject(value);
}

function isOperatorObject(value) {
  return (
    isObject(value) &&
    Object.keys(value).length === 2 &&
    has(value, 'value') &&
    has(value, 'op')
  );
}

export function objectToWhereString(obj, logicalOperator = 'and', depth = 0) {
  if (!isObject(obj)) {
    return '';
  }

  const keys = Object.keys(obj);
  if (keys.length === 1) {
    const key = keys[0];
    const value = obj[key];
    if (isLogicalKeyValue(key, value)) {
      return objectToWhereString(value, key, depth);
    }
  }

  const items = Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined) {
        return '';
      }

      if (isLogicalKeyValue(key, value)) {
        return objectToWhereString(value, key, depth + 1);
      }

      if (Array.isArray(value)) {
        return `(${key},in,${value.join(',')})`;
      }

      let comparisonOperator = 'eq';
      let stringValue = String(value);

      if (isOperatorObject(value)) {
        const { op: operator, value: actualValue } = value;
        comparisonOperator = operator;
        stringValue = String(actualValue);
      }

      if (stringValue === 'null') {
        comparisonOperator = 'is';
      }

      return `(${key},${comparisonOperator},${stringValue})`;
    })
    .filter(Boolean);

  const string = items.join(`~${logicalOperator}`);

  if (depth > 0 && items.length > 1) {
    return `(${string})`;
  }

  return string;
}

// function testWhereString(obj, expected) {
//   console.log('---');
//   const val = objectToWhereString(obj);
//   console.log(val === expected ? 'Passed' : `${':'.repeat(180)} Failed`);
//   if (val !== expected) {
//     console.log('obj', obj);
//     console.log('str', `__${val}__`);
//   }
// }

// testWhereString(undefined, '');
// testWhereString({}, '');
// testWhereString({ foo: 'bar', x: 1 }, '(foo,eq,bar)~and(x,eq,1)');
// testWhereString({ and: {} }, '');
// testWhereString({ and: 'xxx' }, '(and,eq,xxx)');
// testWhereString(
//   {
//     and: { foo: 'bar', x: 1, bool: true, 'lng key spc': undefined },
//     or: { y: 2, z: 0, xxx: null, created_at: { op: 'gt', value: 123456789 } },
//   },
//   '((foo,eq,bar)~and(x,eq,1)~and(bool,eq,true))~and((y,eq,2)~or(z,eq,0)~or(xxx,is,null)~or(created_at,gt,123456789))'
// );
// testWhereString(
//   {
//     or: { y: 2, z: 0, xxx: null, created_at: { op: 'gt', value: 123456789 } },
//     and: { foo: 'bar', x: 1, bool: true, 'lng key spc': undefined },
//   },
//   '((y,eq,2)~or(z,eq,0)~or(xxx,is,null)~or(created_at,gt,123456789))~and((foo,eq,bar)~and(x,eq,1)~and(bool,eq,true))'
// );
// testWhereString(
//   {
//     and: {
//       foo: 'bar',
//       x: 1,
//       or: { zzz: ['yer', 'not'], uuu: 'what' },
//     },
//   },
//   '(foo,eq,bar)~and(x,eq,1)~and((zzz,in,yer,not)~or(uuu,eq,what))'
// );
// testWhereString(
//   {
//     foo: 'bar',
//     x: 1,
//     or: { zzz: ['yer', 'not'], uuu: 'what' },
//   },
//   '(foo,eq,bar)~and(x,eq,1)~and((zzz,in,yer,not)~or(uuu,eq,what))'
// );
// testWhereString(
//   { or: { y: 2, z: 0, xxx: null } },
//   '(y,eq,2)~or(z,eq,0)~or(xxx,is,null)'
// );
// testWhereString(
//   { and: { y: 2, z: 0, xxx: null } },
//   '(y,eq,2)~and(z,eq,0)~and(xxx,is,null)'
// );
// testWhereString(
//   { y: 2, z: 0, xxx: null },
//   '(y,eq,2)~and(z,eq,0)~and(xxx,is,null)'
// );
// testWhereString(
//   { y: 2, z: 0, xxx: null, and: {} },
//   '(y,eq,2)~and(z,eq,0)~and(xxx,is,null)'
// );
// testWhereString(
//   { y: 2, z: 0, xxx: null, or: { and: {} } },
//   '(y,eq,2)~and(z,eq,0)~and(xxx,is,null)'
// );
// testWhereString(
//   { x: 1, y: 2, or: { z: 3, w: 4, and: { a: 5, b: 6, and: { c: 7 } } } },
//   '(x,eq,1)~and(y,eq,2)~and((z,eq,3)~or(w,eq,4)~or((a,eq,5)~and(b,eq,6)~and(c,eq,7)))'
// );
// testWhereString(
//   { x: 1, or: { and: { or: { c: 7 } } } },
//   '(x,eq,1)~and(c,eq,7)'
// );
// testWhereString(
//   { or: { x: 1, or: { and: { or: { c: 7 } } } } },
//   '(x,eq,1)~or(c,eq,7)'
// );
// testWhereString(
//   { or: { x: 1, and: { and: { and: { c: 7, d: 8 } } } } },
//   '(x,eq,1)~or((c,eq,7)~and(d,eq,8))'
// );
