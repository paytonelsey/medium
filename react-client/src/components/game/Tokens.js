export default class Tokens {

  constructor() {
    this.thr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    this.two = [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    this.one = [5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6];
  }

  getPileOne() {
    return this.one;
  }

  getPileTwo() {
    return this.two;
  }

  getPileThree() {
    return this.thr;
  }

  randomNumber(sizeOfPile: number) {
    return Math.floor(Math.random() * sizeOfPile);
  }

  getPoints(pileNumber: number): number {
    let points = 0;
    let index = 0;
    switch (pileNumber) {
        case 1:
            index = this.randomNumber(this.one.length);
            points = this.one[index];
            this.one.splice(index, 1);
            break;
        case 2:
            index = this.randomNumber(this.two.length);
            points = this.two[index];
            this.two.splice(index, 1);
            break;
        case 3:
        default:
            index = this.randomNumber(this.thr.length);
            points = this.thr[index];
            this.thr.splice(index, 1);
            break;
    }
    return points;
  }
}
