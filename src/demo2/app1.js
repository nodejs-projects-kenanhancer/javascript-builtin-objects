var personEntryArray = [['personId', '1'], ['firstName', 'kenan'], ['lastName', 'hancer'], ['mail', 'kh@kh.com']];

var person1 = Object.fromEntries(personEntryArray);

console.log(person1);


var personMap = new Map(personEntryArray);
var person2 = Object.fromEntries(personMap);

console.log(person2);

var person3 = Object.fromEntries([['personId', '2'], ['firstName', 'Hakan'], ['lastName', 'celik'], ['mail', 'hc@hc.com']]);

console.log(person3);

var person4 = Object.fromEntries(new Map([['personId', '3'], ['firstName', 'gamze'], ['lastName', 'boz'], ['mail', 'gb@gb.com']]));

console.log(person4);

var person5 = Object.fromEntries(Object.entries(person4).map(([key,value])=>[key, value + " **"]));

console.log(person5);