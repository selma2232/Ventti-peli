

import {Maa} from "./maa.js";
import {Kortti} from "./kortti.js";

export class Pakka{

  
  constructor() {
    this.kortit=[];
  }

  
  lisaaKortti(uusiKortti){
    this.kortit.push(uusiKortti);
  }

 
  otaKortti() {
    return this.kortit.pop();
  }

  sekoita() {
    if(this.kortit.length<2) {
      return;
    }
    else {
      for(let i=0; i<this.kortit.length; i++){
        let indA=Math.floor(Math.random()*this.kortit.length);
        let indB=Math.floor(Math.random()*this.kortit.length);
        [this.kortit[indA], this.kortit[indB]]=[this.kortit[indB],this.kortit[indA]];
      }
    }
  }

  static luoPakka() {
    let apupakka=new Pakka();
    for(let i=1; i<=13; i++) {
      apupakka.lisaaKortti(new Kortti(Maa.HERTTA, i));
      apupakka.lisaaKortti(new Kortti(Maa.RUUTU, i));
      apupakka.lisaaKortti(new Kortti(Maa.PATA, i));
      apupakka.lisaaKortti(new Kortti(Maa.RISTI,i));
    }
    return apupakka;
  }

 
  toString() {
    return this.kortit.map(Kortti=>Kortti.toString()).join(', ');
  }
};
