var personEntryArray = [['personId', '1'], ['firstName', 'kenan'], ['lastName', 'hancer'], ['mail', 'kh@kh.com']];

console.log(Object.fromEntries(personEntryArray));

console.log(Object.fromEntries(new Map(personEntryArray)));

console.log(Object.fromEntries([['personId', '2'], ['firstName', 'Hakan'], ['lastName', 'celik'], ['mail', 'hc@hc.com']]));

console.log(Object.fromEntries(new Map([['personId', '3'], ['firstName', 'gamze'], ['lastName', 'boz'], ['mail', 'gb@gb.com']])));

console.log(Object.fromEntries(personEntryArray.map(([key, value]) => [key, value + " **"])));