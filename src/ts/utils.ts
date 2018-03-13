
export class Utils {

  static millisecondToSecond( millisecond:number ): number {
    return millisecond * 0.001;
  }
  
  static secondToMilliecond( second:number ): number {
    return second / 1000;
  }
  
  static framePerSecond(millisecond:number): number {
    return Math.round(1000 / millisecond);
  }

}
