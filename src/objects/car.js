export default class Car {
  createCar(obj){
    var dowo = Object.assign({
      x:0,
      y:0,
      width: 96,
      height: 32,
      speed: 9,
      mass: 2
    },obj);
    return dowo;
  }
}
