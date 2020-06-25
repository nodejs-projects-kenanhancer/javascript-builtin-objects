const {expect, assert, should} = require('chai');

describe('Function Binding Test', () => {
    it('Test 1', () => {
        const person = {
            id: 1,
            firstName: 'Kenan',
            lastName: 'Hancer',
            getFullName() {
                expect(this).to.be.an('object').that.is.equal(person);

                return this.firstName + " " + this.lastName;
            }
        };

        function getFullName(callback) {
            expect(this).to.be.a('global');

            const result = callback();

            console.log(result);
        }

        function test() {
            expect(this).to.be.a('global');

            const cb = person.getFullName;

            getFullName(cb.bind(person));
        }

        expect(this).to.be.an('object');

        test();

        // setTimeout(person.getFullName, 1000);
    });

    it('Test 2', () => {
        const person = {
            id: 1,
            firstName: 'Kenan',
            lastName: 'Hancer',
            getFullName() {
                console.log("this value in getFullName function: " + this);
                return this.firstName + " " + this.lastName;
            }
        };

        function getFullNameProxy(callback) {
            console.log("this value in getFullNameProxy function: " + this);

            const result = callback();

            console.log(result);
        }

        function test() {
            console.log("this value in test function: " + this);

            const cb = person.getFullName;

            getFullNameProxy(cb.bind(person));
        }

        console.log("this value Outside of function: " + this);
        console.log(person.getFullName());
    });

    it('Test 3', () => {
        const person = {
            id: 1,
            firstName: 'Kenan',
            lastName: 'Hancer',
            getFullName() {
                console.log("this value in getFullName function: " + this);
                return this.firstName + " " + this.lastName;
            }
        };

        function getFullNameProxy(callback) {
            console.log("this value in getFullNameProxy function: " + this);

            const result = callback();

            console.log(result);
        }

        function test() {
            console.log("this value in test function: " + this);

            const cb = person.getFullName;

            getFullNameProxy(cb.bind(person));
        }

        console.log("this value Outside of function: " + this);
        test();
    });

    it('Test 4', () => {
        const person1 = {
            fullName: function () {
                return this.firstName + " " + this.lastName;
            }
        };

        const person2 = {
            firstName: "John",
            lastName: "Doe",
        };

        person1.fullName.call(person2);
    });

    it('Test 5', () => {
        class Car {
            constructor() {
                // Bind sayBye but not sayHi to show the difference
                this.sayBye = this.sayBye.bind(this);
            }

            sayHi() {
                console.log(`Hello from ${this.name}`);
            }

            sayBye() {
                console.log(`Bye from ${this.name}`);
            }

            get name() {
                return 'Ferrari';
            }
        }

        class Bird {
            get name() {
                return 'Tweety';
            }
        }


        const car = new Car();
        const bird = new Bird();


        car.sayHi();
        bird.sayHi = car.sayHi;
        bird.sayHi(); // Hello from Tweety

        bird.sayBye = car.sayBye;
        bird.sayBye();  // Bye from Ferrari
    });
});