class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  honk() {
    return "Beep";
  }
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

let myFirstCar = new Car("Toyota", "Corolla", 2005);

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine() {
    return "VROOM!!!";
  }
}

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

class Garage extends Vehicle {
  constructor(capacity, vehicles = [], make, model, year) {
    super(make, model, year);
    this.vehicles = vehicles;
    this.capacity = capacity;
  }
  add(vehicle) {
    if(!(vehicle.make && vehicle.model && vehicle.year)){
        throw new Error('Please provide the make, model and year.')
    }
    if (!(vehicle instanceof Vehicle)) {
      throw new Error("Only vehicles are allowed in here!");
    }

    if (this.vehicles.length >= this.capacity) {
      throw new Error("Sorry, we're full.");
    }

    this.vehicles.push(vehicle);
    return "Vehicle added!";
  }
}
let garage = new Garage(2);
