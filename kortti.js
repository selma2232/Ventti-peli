export class Kortti {

 
  constructor(maa, arvo) {
    this.maa = maa;
    this.arvo = arvo;
  }

  /
  get arvosymboli() {
    switch(this.arvo) {
        case 1:
            return "A";
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13:
            return "K";
        default:
            return this.arvo;
    }
  }


  toString() {
    return `${this.maa.symboli} ${this.arvo}`;
  }
};
