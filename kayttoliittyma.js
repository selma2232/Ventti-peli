

'use strict';

import { Pakka } from "./pakka.js";
import { Kasi } from "./kasi.js";


(function () {
  let btnNosta, btnJaa, btnUusi;
  let tulosEl;

  let pelaajaSlots = [];
  let jakajaSlots = [];

  let pakka;
  let pelaajaKasi;
  let jakajaKasi;
  let peliKaynnissa = false;

  document.addEventListener('DOMContentLoaded', alusta);

  function alusta() {

    btnNosta = document.getElementById("ota-kortti");
    btnJaa = document.getElementById("jaa");
    btnUusi = document.getElementById("uusi-peli");
    tulosEl = document.getElementById("tulos");

    pelaajaSlots = [
      document.getElementById("pelaaja1"),
      document.getElementById("pelaaja2"),
      document.getElementById("pelaaja3"),
      document.getElementById("pelaaja4"),
      document.getElementById("pelaaja5"),
    ];

    jakajaSlots = [
      document.getElementById("jakaja1"),
      document.getElementById("jakaja2"),
      document.getElementById("jakaja3"),
      document.getElementById("jakaja4"),
      document.getElementById("jakaja5"),
    ];

    btnNosta.addEventListener("click", nostaKortti);
    btnJaa.addEventListener("click", jataVuoro);
    btnUusi.addEventListener("click", uusiPeli);

   
    btnNosta.disabled = true;
    btnJaa.disabled = true;
  }

  function uusiPeli() {
   
    pakka = Pakka.luoPakka();
    pakka.sekoita();
    pelaajaKasi = new Kasi();
    jakajaKasi = new Kasi();
    peliKaynnissa = true;


    tyhjennaKortit();
    tulosEl.textContent = "";

    btnNosta.disabled = false;
    btnJaa.disabled = false;

    jaaPelaajalleKortti();
    jaaPelaajalleKortti();


    const ekaJakajaKortti = pakka.otaKortti();
    jakajaKasi.lisaaKortti(ekaJakajaKortti);
    naytaKortti(ekaJakajaKortti, jakajaSlots[0]);

    tarkistaPelaaja();
  }

  function tyhjennaKortit() {
    [...pelaajaSlots, ...jakajaSlots].forEach(el => {
      el.className = "kortti";
      el.innerHTML = "";
    });
  }

  function naytaKortti(kortti, el) {
    if (!el) return;

    const variLuokka = kortti.maa.vari === "punainen" ? "punainen" : "musta";
    el.className = `kortti ${variLuokka}`;
    el.innerHTML = `
      <span>${kortti.arvosymboli}</span>
      <span class="symboli">${kortti.maa.symboli}</span>
      <span class="tokanumero">${kortti.arvosymboli}</span>
    `;
  }

  function jaaPelaajalleKortti() {
    if (!peliKaynnissa || pelaajaKasi.kortteja >= 5) return;
    const kortti = pakka.otaKortti();
    pelaajaKasi.lisaaKortti(kortti);
    const slot = pelaajaSlots[pelaajaKasi.kortteja - 1];
    naytaKortti(kortti, slot);
  }

  function nostaKortti() {
    if (!peliKaynnissa) return;
    jaaPelaajalleKortti();
    tarkistaPelaaja();
  }

  function tarkistaPelaaja() {
    const summa = pelaajaKasi.summa;

    if (summa === 21) {
      tulosEl.textContent = "Voitit pelin";
      lopetaPeli();
    } else if (summa > 21) {
      tulosEl.textContent = "Hävisit pelin";
      lopetaPeli();
    } else if (pelaajaKasi.kortteja === 5 && summa < 21) {
      tulosEl.textContent = "Voitit pelin (5 korttia alle 21)";
      lopetaPeli();
    }
  }

  function jataVuoro() {
    if (!peliKaynnissa) return;

    btnNosta.disabled = true;
    btnJaa.disabled = true;


    while (
      jakajaKasi.summa < pelaajaKasi.summa &&
      jakajaKasi.summa <= 21 &&
      jakajaKasi.kortteja < 5
    ) {
      const kortti = pakka.otaKortti();
      jakajaKasi.lisaaKortti(kortti);
      const slot = jakajaSlots[jakajaKasi.kortteja - 1];
      naytaKortti(kortti, slot);
    }

    const p = pelaajaKasi.summa;
    const j = jakajaKasi.summa;

    let viesti;
    if (j > 21) {
      viesti = "Voitit pelin (jakaja yli 21)";
    } else if (j > p) {
      viesti = "Hävisit pelin";
    } else if (j < p) {
      viesti = "Voitit pelin";
    } else {
      viesti = "Tasapeli";
    }

    tulosEl.textContent = viesti;
    lopetaPeli();
  }

  function lopetaPeli() {
    peliKaynnissa = false;
    btnNosta.disabled = true;
    btnJaa.disabled = true;
  }
})();
