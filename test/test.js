const { expect, assert, should } = require('chai');

describe('Test', () => {
    it('Class Test 1', () => {
        let person = {
            firstName: "Kenan",
            lastName: "Hancer",
            getFullName() {
                return this.firstName + " " + this.lastName;
            },
            sayHello() {
                return "Hello " + this.getFullName();
            }
        };

        let employee = {
            setBase(base) {
                Object.assign(this, base);
            },
            sayGoodbye() {
                return "Goodbye " + this.getFullName();
            },
            sayEnglishHello() {
                return this.sayHello();
            }
        };

        employee.setBase(person);



        expect(person).to.be.an('object').that.is.not.empty;

        expect(person).to.have.property('firstName');

        expect(person).to.have.property('lastName');

        expect(person).to.have.property('getFullName').that.is.an('function');

        expect(person).to.have.property('sayHello').that.is.an('function');

        expect(person.getFullName()).to.be.equal('Kenan Hancer')

        expect(person.sayHello()).to.equal('Hello Kenan Hancer');




        expect(employee).to.be.an('object').that.is.not.empty;

        expect(employee).to.have.property('setBase').that.is.an('function');

        expect(employee).to.have.property('sayGoodbye').that.is.an('function');

        expect(employee).to.have.property('sayEnglishHello').that.is.an('function');

        expect(employee).to.have.property('sayHello').that.is.an('function');

        expect(employee).to.have.property('getFullName').that.is.an.instanceOf(Function);

        expect(employee.sayGoodbye()).to.equal('Goodbye Kenan Hancer');

        expect(employee.sayEnglishHello()).to.equal('Hello Kenan Hancer');
    });

    it('Class Test 2', () => {
        let person = {
            firstName: "Kenan",
            lastName: "Hancer",
            getFullName() {
                return this.firstName + " " + this.lastName;
            },
            sayHello() {
                return "Hello " + this.getFullName();
            }
        };

        let employee = {
            firstName: "Enes",
            lastName: "Hancer",
            salary: 2000,
            setBase(base) {
                this.__proto__ = Object.create(base);
            },
            sayGoodbye() {
                return "Goodbye " + this.getFullName();
            },
            sayEnglishHello() {
                return this.sayHello();
            }
        };

        employee.setBase(person);



        expect(person).to.be.an('object').that.is.not.empty;

        expect(person).to.have.property('firstName', 'Kenan').that.is.a('string');

        expect(person).to.have.property('lastName', 'Hancer').that.is.a('string');

        expect(person).to.have.property('getFullName').that.is.an.instanceOf(Function);

        expect(person).to.have.property('sayHello').that.is.a('function');

        expect(person.getFullName()).to.have.string('Kenan Hancer');

        expect(person.sayHello()).to.be.string('Hello Kenan Hancer');


        expect(employee).to.be.an('object').that.is.not.empty;

        expect(employee).to.have.property('firstName', 'Enes').that.is.a('string');

        expect(employee).to.have.property('lastName', 'Hancer').that.is.a('string');

        expect(employee).to.have.property('salary', 2000).that.is.a('number');

        expect(employee.sayGoodbye()).to.be.string('Goodbye Enes Hancer');
    });

    it('Class Test 3', () => {
        class Collection {
            constructor() {
                this.items = [];
                this.eventListeners = {
                    add: [],
                    remove: []
                };
            }

            addEventListener(eventName, callback) {
                if (eventName in this.eventListeners) {
                    this.eventListeners[eventName].push(callback);
                }
            }

            add(item) {
                const length = this.items.length;
                this.items.push(item);
                this.eventListeners['add'].forEach(eventListener => eventListener({ index: length, item }));
            }

            remove(index) {
                const item = this.items[index];
                this.items.splice(index, 1);
                this.eventListeners['remove'].forEach(eventListener => eventListener({ index, item }));
            }

            get length() {
                return this.items.length;
            }

            [Symbol.iterator]() {
                let index = -1;
                const data = this.items;

                return {
                    next: () => ({ value: data[++index], done: !(index in data) })
                };
            };
        }



        const collection = new Collection();

        collection.add('Apple');
        collection.add('Banana');

        collection.remove('Banana');

        expect(collection).to.be.an('object').that.is.not.empty;

        expect(collection).to.have.length(1);

        expect(collection).to.have.property('addEventListener').that.is.a('function');

        expect(collection).to.have.property('add').that.is.a('function');

        expect(collection).to.have.property('remove').that.is.an.instanceOf(Function);
    });

    it('Class Test 4', () => {
        class Collection {
            constructor() {
                this.items = [];
                this.eventListeners = {
                    add: [],
                    remove: []
                };
            }

            addEventListener(eventName, callback) {
                if (eventName in this.eventListeners) {
                    this.eventListeners[eventName].push(callback);
                }
            }

            add(item) {
                const length = this.items.length;
                this.items.push(item);
                this.eventListeners['add'].forEach(eventListener => eventListener({ index: length, item }));
            }

            remove(index) {
                const item = this.items[index];
                this.items.splice(index, 1);
                this.eventListeners['remove'].forEach(eventListener => eventListener({ index, item }));
            }

            get length() {
                return this.items.length;
            }

            [Symbol.iterator]() {
                let index = -1;
                const data = this.items;

                return {
                    next: () => ({ value: data[++index], done: !(index in data) })
                };
            };
        }

        // onAdd, onRemove functions are recreated with `bind()` function.
        // so `this` context is captured. Because, `bind() can inject context.
        class Dictionary {
            constructor() {
                this.collection = new Collection();
                this.collection.addEventListener('add', this.onAdd.bind(this));
                this.collection.addEventListener('remove', this.onRemove.bind(this));
            }

            onAdd(data) {

                this.log(data);
            }

            onRemove(data) {

                this.log(data);
            }

            log(data) {
                // console.log(data);
            }

            add(key, value) {
                this.collection.add({ key, value });
            }

            remove(key) {
                let index = -1, i = 0;

                for (const item of this.collection) {
                    if (item.key === key) {
                        index = i;
                        break;
                    }
                    i++;
                }

                this.collection.remove(index);
            }

            getLength() {
                return this.collection.length;
            }

            get length() {
                return this.collection.length;
            }
        }

        const dictionary = new Dictionary();

        dictionary.add('firstName', 'Kenan');
        dictionary.add('lastName', 'Hancer');

        dictionary.remove('firstName');




        expect(dictionary).to.be.an('object').that.is.not.empty;

        expect(dictionary).to.have.length(1);

        dictionary.add('age', 37);

        expect(dictionary).to.have.length(2);


    });

    it('Class Test 5', () => {
        class Collection {
            constructor() {
                this.items = [];
                this.eventListeners = {
                    add: [],
                    remove: []
                };
            }

            addEventListener(eventName, callback) {
                if (eventName in this.eventListeners) {
                    this.eventListeners[eventName].push(callback);
                }
            }

            add(item) {
                const length = this.items.length;
                this.items.push(item);
                this.eventListeners['add'].forEach(eventListener => eventListener({ index: length, item }));
            }

            remove(index) {
                const item = this.items[index];
                this.items.splice(index, 1);
                this.eventListeners['remove'].forEach(eventListener => eventListener({ index, item }));
            }

            get length() {
                return this.items.length;
            }

            [Symbol.iterator]() {
                let index = -1;
                const data = this.items;

                return {
                    next: () => ({ value: data[++index], done: !(index in data) })
                };
            };
        }

        // onAdd, onRemove functions are called in arrow function.
        // so `this` context is captured. Because, arrow functions can capture context.
        class Dictionary {
            constructor() {
                this.initialize();
            }

            initialize() {
                this.collection = new Collection();
                this.collection.addEventListener('add', (data) => this.onAdd(data));
                this.collection.addEventListener('remove', (data) => this.onRemove(data));
            }

            onAdd(data) {

                this.log(data);
            }

            onRemove(data) {

                this.log(data);
            }

            log(data) {
                // console.log(data);
            }

            add(key, value) {
                this.collection.add({ key, value });
            }

            remove(key) {
                let index = -1, i = 0;

                for (const item of this.collection) {
                    if (item.key === key) {
                        index = i;
                        break;
                    }
                    i++;
                }

                this.collection.remove(index);
            }
        }

        const dictionary = new Dictionary();

        dictionary.add('firstName', 'Kenan');
        dictionary.add('lastName', 'Hancer');

        dictionary.remove('firstName');
    });

    it('Class Test 6', () => {
        class Collection {
            constructor() {
                this.items = [];
                this.eventListeners = {
                    add: [],
                    remove: []
                };
            }

            addEventListener(eventName, callback) {
                if (eventName in this.eventListeners) {
                    this.eventListeners[eventName].push(callback);
                }
            }

            add(item) {
                const length = this.items.length;
                this.items.push(item);
                this.eventListeners['add'].forEach(eventListener => eventListener({ index: length, item }));
            }

            remove(index) {
                const item = this.items[index];
                this.items.splice(index, 1);
                this.eventListeners['remove'].forEach(eventListener => eventListener({ index, item }));
            }

            get length() {
                return this.items.length;
            }

            [Symbol.iterator]() {
                let index = -1;
                const data = this.items;

                return {
                    next: () => ({ value: data[++index], done: !(index in data) })
                };
            };
        }


        // onAdd, onRemove functions are defined as class property and arrow function.
        // so `this` context is captured. Because, arrow functions can capture context.
        class Dictionary {
            constructor() {
                this.initialize();
            }

            initialize() {
                this.collection = new Collection();
                this.collection.addEventListener('add', this.onAdd);
                this.collection.addEventListener('remove', this.onRemove);
            }

            onAdd = (data) => {

                this.log(data);
            }

            onRemove = (data) => {

                this.log(data);
            }

            log(data) {
                console.log(data);
            }

            add(key, value) {
                this.collection.add({ key, value });
            }

            remove(key) {
                let index = -1, i = 0;

                for (const item of this.collection) {
                    if (item.key === key) {
                        index = i;
                        break;
                    }
                    i++;
                }

                this.collection.remove(index);
            }
        }

        const dictionary = new Dictionary();

        dictionary.add('firstName', 'Kenan');
        dictionary.add('lastName', 'Hancer');

        dictionary.remove('firstName');
    });

    it('Class Test 7', () => {
        class Collection {
            constructor() {
                this.items = [];
                this.eventListeners = {
                    add: [],
                    remove: []
                };
            }

            addEventListener(eventName, callback) {
                if (eventName in this.eventListeners) {
                    this.eventListeners[eventName].push(callback);
                }
            }

            add(item) {
                const length = this.items.length;
                this.items.push(item);
                this.eventListeners['add'].forEach(eventListener => eventListener({ index: length, item }));
            }

            remove(index) {
                const item = this.items[index];
                this.items.splice(index, 1);
                this.eventListeners['remove'].forEach(eventListener => eventListener({ index, item }));
            }

            get length() {
                return this.items.length;
            }

            [Symbol.iterator]() {
                let index = -1;
                const data = this.items;

                return {
                    next: () => ({ value: data[++index], done: !(index in data) })
                };
            };
        }

        // onAdd, onRemove functions are defined in constructor as an arrow function.
        // so `this` context is captured. Because, arrow functions can capture context.
        class Dictionary {
            constructor() {
                this.onAdd = (data) => {
                    this.log(data);
                };

                this.onRemove = (data) => {
                    this.log(data);
                };

                this.initialize();
            }

            initialize() {
                this.collection = new Collection();
                this.collection.addEventListener('add', this.onAdd);
                this.collection.addEventListener('remove', this.onRemove);
            }

            // onAdd(data) {
            //
            //     this.log(data);
            // }

            // onRemove = (data) => {
            //
            //     this.log(data);
            // }

            log(data) {
                console.log(data);
            }

            add(key, value) {
                this.collection.add({ key, value });
            }

            remove(key) {
                let index = -1, i = 0;

                for (const item of this.collection) {
                    if (item.key === key) {
                        index = i;
                        break;
                    }
                    i++;
                }

                this.collection.remove(index);
            }
        }

        const dictionary = new Dictionary();

        dictionary.add('firstName', 'Kenan');
        dictionary.add('lastName', 'Hancer');

        dictionary.remove('firstName');
    });
});