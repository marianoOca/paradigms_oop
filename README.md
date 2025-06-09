# 🧫 Slime Colony - JavaScript OOP Simulation

This project was developed as part of the **Programming Language Paradigms** course (2nd semester 2022, TP2). It models a colony of slimes using object-oriented programming in JavaScript.

## 📄 Project Overview

The simulation focuses on behaviors of slime creatures, which can attack, duel, heal, and even reproduce. The project emphasizes OOP principles and JavaScript prototype-based inheritance.

## 📁 Files

- `taller.js`: Main file containing all constructors, methods, and test cases.
- `TallerJS.html`: Test runner, open in a browser to execute test cases.

## 🚀 Key Features

- `Slime(ataque, defensa)`: Constructor for basic slimes with energy, attack, and defense attributes.
- `actualizarEnergia(incremento)`: Adjusts slime's energy within allowed bounds.
- `atacar(objetivo)`: Attacks another slime, gaining energy based on damage dealt.
- `duelo(oponente)`: One-on-one fight. Winner gains a level.
- `SlimeSanador(ataque, defensa, poder)`: Healing slime variant with additional method:
  - `curar(paciente)`: Heals based on healing power and level.
- `reproducirse()`: Slime reproduces if enough energy is available.
- `esDescendienteDe(otro)`: Checks ancestry.

## ✅ Testing

Each method includes test cases defined in `taller.js` under the `testEjercicio` functions. Output is styled using `res.write`.

To run the tests, open `TallerJS.html` in any web browser.

## 📚 References

- [MDN JavaScript Reference](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia)
- [W3Schools JavaScript Reference](https://www.w3schools.com/jsref/default.asp)
