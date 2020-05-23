function Vehicle(make, model, year, color) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
}

var vehicle1 = new Vehicle("AUDI", "A8", "2011", "GREY");

console.log(Object.keys(vehicle1));

console.log(Object.values(vehicle1));

console.log(Object.entries(vehicle1));