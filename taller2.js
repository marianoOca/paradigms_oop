// Ejercicio 1
function ejercicio1() {
  Malambo = {nombre:'Malambo', peso: 500, directiva: 'limpiar'}
}

// Ejercicio 2
function ejercicio2() {
  nuevoRobot = function(nombre, peso, directiva){
    res = Object.create(Malambo)
    res.nombre = nombre
    res.peso = peso
    res.directiva = directiva
    return res
  };

  Chacarera = nuevoRobot('Chacarera', 1500, 'cortar el pasto');
}

// Ejercicio 3
function ejercicio3() {
  Malambo.presentarse = function(){
    return `Hola, soy ${this.nombre} y me encanta ${this.directiva}.`
  }
  Malambo.limpiar = function() {
    this.peso +=1;
    return 'limpiar'
  }
}

// Ejercicio 4
/* Corrección:- Están definiendo la función presentarse en cada robot creado con
Robot. Al ser una funcionalidad común a todos los robots, esto no es
buena idea, ya que si se la deseara modificar habría que hacerlo en cada
uno de ellos.*/
function ejercicio4() {
  Robot = function(nombre, peso, directiva, funcionDirectiva){
    this.nombre = nombre
    this.peso = peso
    this.directiva = directiva
    this[directiva] = funcionDirectiva
    // this.presentarse = Malambo.presentarse
    // entonces dónde ponemos presentarse??? Lo armamos usando nuevoRobot y luego le agregamos presentarse?
  }

  Robot.prototype.presentarse = Malambo.presentarse

}

// Ejercicio 5
function ejercicio5() {
  Milonga = new Robot(
    'Milonga',
    1200,
    'mensajear',
    function(remitente,destinatario,mensaje){
      if (mensaje in destinatario){
        respuesta = destinatario[mensaje]()
        if (respuesta in remitente){
          return remitente[respuesta]()
        }
        return respuesta
      }
      return mensaje
    }
  );
}

// Ejercicio 6
/* Corrección:- Los robots creados con RobotMensajero no heredan las
funcionalidades comunes a todos los robots, lo cual significa que si se
quiere agregar una función nueva a todos los robots (como en el
ejercicio 7) hay que hacerlo por separado para los robots mensajeros. */
function ejercicio6() {
  RobotMensajero = function(nombre, peso, directiva, funcionDirectiva){
    Robot.call(this, nombre, peso, directiva, funcionDirectiva)
  } //cómo que no? si se crean a base de Robot???
  Object.setPrototypeOf(RobotMensajero.prototype, Robot.prototype)
  RobotMensajero.prototype.mensajear = Milonga.mensajear
}

// Ejercicio 7
/* Corrección:- De acuerdo a lo anterior, no debería ser necesario setear
explícitamente reprogramar y solicitarAyuda más de una vez.*/
function ejercicio7() {
  Robot.prototype.reprogramar = function(directiva, funcionDirectiva){
    viejaDirectiva = this.directiva
    delete this[viejaDirectiva]
    if(viejaDirectiva == directiva){
      directiva = '...'
    } else {
      this[directiva] = funcionDirectiva
    }
    this.directiva = directiva
  }
  Robot.prototype.solicitarAyuda = function(robot){
    if('ayudante' in this){
      this.ayudante.solicitarAyuda(robot)
    } else {
      robot.reprogramar(this.directiva, this[this.directiva])
      this.ayudante = robot 
    }
  }
  // RobotMensajero.prototype.reprogramar = Robot.prototype.reprogramar
  // RobotMensajero.prototype.solicitarAyuda = Robot.prototype.solicitarAyuda
  Object.setPrototypeOf(Malambo,Robot.prototype)

}

// Editen esta función para que devuelva lo que quieran mostrar en la salida.
function calcularResultado() {
  let res = "";
  res += "<b>Ejercicio 1</b>\n" + crearTest(1, testEjercicio1)();
  res += "\n";
  res += "<b>Ejercicio 2</b>\n" + crearTest(2, testEjercicio2)();
  res += "\n";
  res += "<b>Ejercicio 3</b>\n" + crearTest(3, testEjercicio3)();
  res += "\n";
  res += "<b>Ejercicio 4</b>\n" + crearTest(4, testEjercicio4)();
  res += "\n";
  res += "<b>Ejercicio 5</b>\n" + crearTest(5, testEjercicio5)();
  res += "\n";
  res += "<b>Ejercicio 6</b>\n" + crearTest(6, testEjercicio6)();
  res += "\n";
  res += "<b>Ejercicio 7</b>\n" + crearTest(7, testEjercicio7)();
  return res;
}

// Agreguen aquí los tests representados como funciones que toman un objeto res como argumento.
  // Pueden llamar a res.write para escribir en la salida
  // Pueden llamar a res.test para
    // probar que una condición se cumple (pasándole la condición como único argumento)
    // o para probar que dos valores son iguales (pasándole dos argumentos)

// Test Ejercicio 1
function testEjercicio1(res) {
  res.write("Nombre de Malambo: " + Malambo.nombre);
  res.test(Malambo.nombre, "Malambo");
  res.write("Peso de Malambo: " + Malambo.peso);
  res.test(Malambo.peso, 500);

  res.write("Directiva de Malambo: " + Malambo.directiva);
  res.test(Malambo.directiva, "limpiar");
}

// Test Ejercicio 2
function testEjercicio2(res) {
  res.write("Nombre de Chacarera: " + Chacarera.nombre);
  res.test(Chacarera.nombre, "Chacarera");
  res.write("Peso de Chacarera: " + Chacarera.peso);
  res.test(Chacarera.peso, 1500);
  res.test(!Chacarera.isPrototypeOf(Malambo));
  res.test(Malambo.isPrototypeOf(Chacarera));

  res.write("Directiva de Chacarera: " + Chacarera.directiva);
  res.test(Chacarera.directiva, "cortar el pasto");
}

// Test Ejercicio 3
function testEjercicio3(res) {
  res.write("Presentación de Malambo: " + Malambo.presentarse());
  res.test(Malambo.presentarse(), "Hola, soy Malambo y me encanta limpiar.");
  res.write("Presentación de Chacarera: " + Chacarera.presentarse());
  res.test(Chacarera.presentarse(), "Hola, soy Chacarera y me encanta cortar el pasto.");

  res.write("--");
  let peso_malambo = Malambo.peso;
  res.write("Peso de Malambo antes de limpiar: " + peso_malambo);
  res.test(Malambo.limpiar(), "limpiar");
  peso_malambo ++;
  res.write("Peso de Malambo después de limpiar: " + peso_malambo);
  res.test(Malambo.peso, peso_malambo);

  do {
    res.test(Malambo.limpiar(), "limpiar");
    peso_malambo ++;
  } while (peso_malambo < 524);
  res.write("Peso de Malambo después de limpiar todo el día: " + peso_malambo);
  res.test(Malambo.peso, peso_malambo);
}

// Test Ejercicio 4
function testEjercicio4(res) {
  let C = new Robot("C", 100, "..", function(){return null});
  res.test(C.presentarse(), "Hola, soy C y me encanta ...");
  res.test(Robot.prototype.isPrototypeOf(C));
  res.test(!Malambo.isPrototypeOf(C));

  let malambo_sabe_limpiar = "limpiar" in Malambo
  let chacarera_sabe_limpiar = "limpiar" in Chacarera
  let A = nuevoRobot("A", 250, ".");
  let A_sabe_limpiar = "limpiar" in A;
  let B = new Robot("B", 250, ".", function(){return null});
  let B_sabe_limpiar = "limpiar" in B;
  res.write("Malambo" + si_o_no(malambo_sabe_limpiar) + "sabe limpiar.");
  res.write("Chacarera" + si_o_no(chacarera_sabe_limpiar) + "sabe limpiar.");
  res.write("Si creo un nuevo muñeco con la función original, este" + si_o_no(A_sabe_limpiar) + "sabe limpiar.");
  res.write("Si creo un nuevo muñeco con la función constructora, este" + si_o_no(B_sabe_limpiar) + "sabe limpiar.");
  res.test(malambo_sabe_limpiar);
  res.test(chacarera_sabe_limpiar);
  res.test(A_sabe_limpiar);
  res.test(!B_sabe_limpiar);
}

// Test Ejercicio 5
function testEjercicio5(res) {
  res.write("Nombre de Milonga: " + Milonga.nombre);
  res.test(Milonga.nombre, "Milonga");
  res.write("Peso de Milonga: " + Milonga.peso);
  res.test(Milonga.peso, 1200);
  res.write("Directiva de Milonga: " + Milonga.directiva);
  res.test(Milonga.directiva, "mensajear");
  res.write("Presentación de Milonga: " + Milonga.presentarse());
  res.test(Milonga.presentarse(), "Hola, soy Milonga y me encanta mensajear.");
  
  res.write("--");
  res.write("Peso de Malambo: " + Malambo.peso);
  res.write("Peso de Chacarera: " + Chacarera.peso);
  
  let peso_malambo = Malambo.peso;
  let peso_chacarera = Chacarera.peso;
  let resultado_1 = Milonga.mensajear(Malambo,Chacarera,"limpiar")
  res.write("Resultado Malambo -> limpiar -> Chacarera: " + resultado_1);
  res.test(resultado_1, "limpiar");
  peso_malambo++;
  peso_chacarera++;
  res.write("Peso de Malambo: " + Malambo.peso);
  res.write("Peso de Chacarera: " + Chacarera.peso);
  res.test(Malambo.peso, peso_malambo);
  res.test(Chacarera.peso, peso_chacarera);

  res.write("--");
  let Corta = new Robot("Corta", 100, "cortar el pasto", function(){return "cortadisimo el pasto";})
  let resultado_5 = Milonga.mensajear(Malambo,Corta,"cortar el pasto")
  res.write("Resultado Malambo -> cortar el pasto -> Corta: " + resultado_5);
  res.test(resultado_5, "cortadisimo el pasto");

  let resultado_6 = Milonga.mensajear(Chacarera,Malambo,"cortar el pasto")
  res.write("Resultado Chacarera -> cortar el pasto -> Malambo: " + resultado_6);
  res.test(resultado_6, "cortar el pasto");

  
  res.write("--");
  let A = new Robot("A", 1, "fA", function(){return "fB";})
  let B = new Robot("B", 1, "fB", function(){return "fC";})
  let resultado_2 = Milonga.mensajear(A, B, "fA")
  res.write("Resultado A -> fA -> B: " + resultado_2);
  let resultado_3 = Milonga.mensajear(A, B, "fB")
  res.write("Resultado A -> fB -> B: " + resultado_3);
  let resultado_4 = Milonga.mensajear(B, A, "fA")
  res.write("Resultado B -> fA -> A: " + resultado_4);
  res.test(resultado_2, "fA");
  res.test(resultado_3, "fC");
  res.test(resultado_4, "fC");
}

// Test Ejercicio 6
function testEjercicio6(res) {
  let Mensabot = new RobotMensajero("Mensabot", 1200, "pintar", function(){this.peso--; return "pintusky"});
  res.test(Mensabot.presentarse(), "Hola, soy Mensabot y me encanta pintar.");
  res.test(!Milonga.isPrototypeOf(Mensabot));
  res.test(RobotMensajero.prototype.isPrototypeOf(Mensabot));
  
  let peso_malambo = Malambo.peso;
  let peso_chacarera = Chacarera.peso;
  let peso_mensabot = Mensabot.peso;

  let resultado_1 = Mensabot.mensajear(Malambo,Chacarera,"limpiar")
  res.write("Resultado Malambo -> limpiar -> Chacarera: " + resultado_1);
  res.test(resultado_1, "limpiar");
  peso_malambo++;
  peso_chacarera++;

  let resultado_2 = Mensabot.mensajear(Mensabot,Mensabot,"limpiar")
  res.write("Resultado Mensabot -> limpiar -> Mensabot: " + resultado_2);
  res.test(resultado_2, "limpiar");

  let resultado_3 = Mensabot.mensajear(Mensabot,Mensabot,"pintar")
  res.write("Resultado Mensabot -> pintar -> Mensabot: " + resultado_3);
  res.test(resultado_3, "pintusky");
  peso_mensabot--;
  res.test(Mensabot.peso, peso_mensabot);

  res.write("Peso de Malambo: " + Malambo.peso);
  res.write("Peso de Chacarera: " + Chacarera.peso);
  res.write("Peso de Mensabot: " + Mensabot.peso);
  res.test(Malambo.peso, peso_malambo);
  res.test(Chacarera.peso, peso_chacarera);
  res.test(Mensabot.hasOwnProperty("mensajear"), false);
}

// Test Ejercicio 7
function testEjercicio7(res) {
  let A = new Robot("A", 0.2, "a", function(){return "a"});
  let B = new Robot("B", 0.3, "b", function(){return "b"});
  let C = new Robot("C", 0.3, "c", function(){return "c"});

  res.test("a" in A);
  res.write("Directiva de A antes de cambiar su directiva a \"a\": " + A.directiva);
  A.reprogramar("a");
  res.test(A.directiva, "...");
  res.assert(!("a" in A), "A no debería tener el método \"a\" después de reprogramar.");
  res.write("Directiva de A después de cambiar su directiva a \"a\": " + A.directiva);

  res.write("Directiva de A antes de ayudar a B: " + A.directiva);
  res.write("Ayudante de B antes de pedir ayuda a A: " + nombre(B.ayudante));
  res.assert(!("b" in A), "A no debería tener el método \"b\" después de reprogramar.");
  B.solicitarAyuda(A);
  res.assert("b" in A, "A debería tener el método \"b\" después de de que B le pide ayuda.");
  res.test(A.b(), "b");
  res.write("Directiva de A después de ayudar a B: " + A.directiva);
  res.write("Ayudante de B después de pedir ayuda a A: " + nombre(B.ayudante));

  res.write("--");

  res.write("Directiva de C antes de ayudar a B: " + C.directiva);
  res.write("Ayudante de B antes de pedir ayuda a C: " + nombre(B.ayudante));
  res.write("Ayudante de A antes de que B le pida ayuda a C: " + nombre(A.ayudante));
  res.test(B.ayudante, A);
  res.test(!("ayudante" in A));
  res.test(A.directiva, "b");
  B.solicitarAyuda(C);
  res.write("Directiva de C después de ayudar a B: " + C.directiva);
  res.write("Ayudante de B después de pedir ayuda a C: " + nombre(B.ayudante));
  res.write("Ayudante de A después de que B le pida ayuda a C: " + nombre(A.ayudante));
  res.test(B.ayudante, A);
  res.test(A.ayudante, C);
  res.assert(!("ayudante" in C),"C no debería tener ayudante.");
  res.test(A.directiva, "b");
  res.test(C.directiva, "b");

  res.write("--");

  let malambo_sabe_pedir_ayuda = "solicitarAyuda" in Malambo
  let malambo_sabe_presentarse = "presentarse" in Malambo
  let chacarera_sabe_limpiar = "limpiar" in Chacarera
  let chacarera_sabe_pedir_ayuda = "solicitarAyuda" in Chacarera
  let chacarera_sabe_presentarse = "presentarse" in Chacarera
  let milonga_sabe_pedir_ayuda = "solicitarAyuda" in Milonga
  let milonga_sabe_presentarse = "presentarse" in Milonga
  
  res.write("Malambo" + si_o_no(malambo_sabe_pedir_ayuda) + "sabe pedir ayuda.");
  res.write("Malambo" + si_o_no(malambo_sabe_presentarse) + "sabe presentarse.");
  res.write("Chacarera" + si_o_no(chacarera_sabe_limpiar) + "sabe limpiar.");
  res.write("Chacarera" + si_o_no(chacarera_sabe_pedir_ayuda) + "sabe pedir ayuda.");
  res.write("Chacarera" + si_o_no(chacarera_sabe_presentarse) + "sabe presentarse.");
  res.write("Milonga" + si_o_no(milonga_sabe_pedir_ayuda) + "sabe pedir ayuda.");
  res.write("Milonga" + si_o_no(milonga_sabe_presentarse) + "sabe presentarse.");
  
  res.test(malambo_sabe_pedir_ayuda);
  res.test(malambo_sabe_presentarse);
  res.test(chacarera_sabe_limpiar);
  res.test(chacarera_sabe_pedir_ayuda);
  res.test(chacarera_sabe_presentarse);
  res.test(milonga_sabe_pedir_ayuda);
  res.test(milonga_sabe_presentarse);
}

function nombre(objeto) {
  if (objeto) return objeto.nombre;
  return "Ninguno";
}

function si_o_no(bool) {
  return (bool ? " " : " <b>NO</b> ")
}

// Función auxiliar que crea un test genérico a partir de un número i y una función f
function crearTest(i, f) {
  return function() {
    eval("ejercicio"+i)();
    let res = {
      text:"",
      write: function(s) {
        this.text += s + "\n";
      },
      test: function(actual, expected) {
        if (expected !== undefined) {
          if (actual !== expected) {
            fail(i, "Se esperaba " + expected + " pero se obtuvo: " + actual)}
        } else {
          if (actual !== true) {
            fail(i, "Falló la condición del test.")
          }
        }
      },
      assert: function(actual, message) {
        if (actual !== true) {
          fail(i, "Falló la condición del test: " + message);
        }
      }
    };
    try {
      f(res);
    } catch (e) {
      fail(i, e);
    }
    return res.text;
  }
}

let Malambo = undefined
let nuevoRobot = undefined
let Chacarera = undefined
let Robot = undefined
let Milonga = undefined
