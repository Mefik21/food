'use strict';

class User {
    #surname
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.#surname = 'Karpenko';

    }

    get surname() {return this.#surname;}
    set surname(surname) {this.#surname = surname;}

    say() {
        console.log(`Your lastName ${this.#surname} and name ${this.name} and you have ${this.age}`);
    }
}

const sergey = new User('Sergey', 27);

console.log(sergey.surname);