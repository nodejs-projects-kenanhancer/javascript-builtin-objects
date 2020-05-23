// Creating object with object literals

var person1 = {
    personId: '1',
    firstName: 'kenan',
    lastName: 'hancer',
    gender: 'MALE',
    mail: 'kh@kh.com',
    phone: '111111'
};

// Using array destructuring `[key, value]`
for (var [key, value] of Object.entries(person1)) {
    console.log(`${key}: ${value}`);
}

console.log();

// Using array destructuring `[key, value]`
Object.entries(person1).forEach(([key, value]) => console.log(`${key}: ${value}`));

console.log();

// Converting an Object to a Map
var map = new Map(Object.entries(person1));

console.log(map);
console.log(map.size);
console.log(map.has('lastName'));
console.log(map.get('lastName'));

console.log();

var set = new Set(Object.values(person1));

console.log(set);
console.log(set.size);
console.log(set.has('kenan'));

console.log();

var map2 = Object.entries(person1).reduce((map, [key, value]) => map.set(key, value), new Map());

console.log(map2);

console.log();

var person2Entries = new Map([
    ["personId", "1"],
    ["firstName", "kenan"],
    ["lastName", "hancer"],
    ["mail", "kh@kh.com"]
]);

var person2 = Object.fromEntries(person2Entries);

console.log(person2);
