var FIGHTING_STYLES_DB_ES = [
  { name: "Arquería", desc: "Obtienes un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia." },
  { name: "Defensa", desc: "Mientras lleves puesta una armadura, obtienes un bonificador de +1 a la CA." },
  { name: "Duelo", desc: "Cuando empuñes un arma cuerpo a cuerpo en una mano y ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma." },
  { name: "Lucha con Armas Grandes", desc: "Cuando obtengas un 1 o un 2 en un dado de daño para un ataque con arma cuerpo a cuerpo a dos manos, puedes volver a tirar el dado y debes usar la nueva tirada." },
  { name: "Lucha a Dos Armas", desc: "Cuando realizas el ataque adicional de la lucha con dos armas, puedes añadir tu modificador de característica al daño de ese ataque." },
  { name: "Protección", desc: "Cuando una criatura que puedes ver ataca a un objetivo que no eres tú y que está a 5 pies o menos de ti, puedes usar tu reacción para imponer desventaja en la tirada de ataque (requiere escudo)." },
  { name: "Intercepción", desc: "Cuando una criatura golpea a un aliado a 5 pies o menos de ti, usas tu reacción para reducir el daño en 1d10 + tu bono de competencia (requiere escudo o arma)." },
  { name: "Lanzamiento de Armas", desc: "Puedes desenfundar un arma con propiedad arrojadiza como parte de su ataque, e infliges +2 al daño." },
  { name: "Lucha Desarmada", desc: "Tus ataques desarmados hacen 1d6 + Fuerza (o 1d8 + Fuerza si no llevas escudo ni armas)." },
  { name: "Lucha a Ciegas", desc: "Tienes vista ciega con un rango de 10 pies (ves en la oscuridad y contra invisibles)." }
];

var INVOCATIONS_DB_ES = [
  { name: "Descarga Agonizante", prereq: "Truco de daño", desc: "Sumas tu modificador de Carisma al daño infligido por tu truco elegido (por ejemplo, Descarga Eldritch)." },
  { name: "Pacto de la Espada", prereq: "Nivel 1", desc: "Usa tu modificador de Carisma para ataque y daño de tu arma de pacto en lugar de Fuerza o Destreza. Créala o vincúlala como acción bonus." },
  { name: "Pacto de la Cadena", prereq: "Nivel 1", desc: "Aprendes Encontrar Familiar como ritual. Puedes invocar familiares mejorados (Diablillo, Pseudodragón, Duendecillo, etc.)." },
  { name: "Pacto del Tomo", prereq: "Nivel 1", desc: "Obtienes un tomo con 3 trucos y 2 rituales de nivel 1 de cualquier lista de clases, que lanzas usando Carisma." },
  { name: "Armadura de Sombras", prereq: "Ninguno", desc: "Puedes lanzar Armadura de Mago sobre ti a voluntad sin gastar espacio ni componentes." },
  { name: "Vista del Diablo", prereq: "Ninguno", desc: "Puedes ver normalmente en la oscuridad, tanto mágica como no mágica, hasta 120 pies." },
  { name: "Lanza Eldritch", prereq: "Truco de ataque", desc: "El alcance del truco elegido (como Descarga Eldritch) aumenta a 300 pies." },
  { name: "Ondulación Eldritch (Repelling Blast)", prereq: "Truco de ataque", desc: "Cuando golpeas a una criatura con ese truco, la empujas 10 pies en línea recta lejos de ti." },
  { name: "Atracción Eldritch (Grasp of Hadar)", prereq: "Truco de ataque", desc: "Una vez por turno al golpear a una criatura con ese truco, la mueves 10 pies en línea recta hacia ti." },
  { name: "Lentitud Eldritch (Lance of Lethargy)", prereq: "Truco de ataque", desc: "Una vez por turno al golpear a una criatura con ese truco, reduces su velocidad en 10 pies hasta el final de su siguiente turno." },
  { name: "Saber de las Bestias", prereq: "Ninguno", desc: "Puedes lanzar Hablar con los Animales a voluntad sin gastar espacios de conjuro." },
  { name: "Influencia Embaucadora", prereq: "Ninguno", desc: "Obtienes competencia en las habilidades de Engaño y Persuasión." },
  { name: "Visión Ojo de Gato", prereq: "Ninguno", desc: "Puedes leer toda la escritura." },
  { name: "Vigor Tenebroso", prereq: "Ninguno", desc: "Puedes lanzar Falsa Vida a voluntad como conjuro de nivel 1 sin gastar espacios." },
  { name: "Ataque Sediento", prereq: "Nivel 5, Pacto de la Espada", desc: "Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno con tu arma del pacto." },
  { name: "Escurridizo (One with Shadows)", prereq: "Nivel 5", desc: "En luz tenue u oscuridad, puedes usar tu acción bonus para volverte invisible hasta que te muevas, ataques o lances un conjuro." },
  { name: "Mirada de dos Mentes", prereq: "Nivel 5", desc: "Percibes por los sentidos de un humanoide voluntario tocado y puedes lanzar conjuros desde su posición." },
  { name: "Sombra de la Plaga (Mire the Mind)", prereq: "Nivel 5", desc: "Puedes lanzar Ralentizar una vez usando un espacio de Brujo (1/Descanso Largo)." },
  { name: "Visión Escultural (Sculptor of Flesh)", prereq: "Nivel 7", desc: "Puedes lanzar Polimorfar una vez usando un espacio de Brujo (1/Descanso Largo)." },
  { name: "Salto Dimensional (Trickster's Escape)", prereq: "Nivel 7", desc: "Puedes lanzar Libertad de Movimiento sobre ti una vez sin gastar espacio (1/Descanso Largo)." },
  { name: "Llamada de la Tumba (Lifedrinker)", prereq: "Nivel 9, Pacto de la Espada", desc: "Al golpear con el arma del pacto (1/turno), haces 1d6 daño necrótico extra y te curas esa cantidad." },
  { name: "Paso del Vacío", prereq: "Nivel 9", desc: "Puedes lanzar Salto sobre ti a voluntad sin gastar espacio." },
  { name: "Escritura Susurrante", prereq: "Nivel 9", desc: "Puedes lanzar Hablar con los Muertos a voluntad sin gastar espacio." },
  { name: "Paso Inaudible (Ascendant Step)", prereq: "Nivel 9", desc: "Puedes lanzar Levitar sobre ti a voluntad sin gastar espacio ni componentes." },
  { name: "Visión Espectral (Witch Sight)", prereq: "Nivel 15", desc: "Ves la verdadera forma de cualquier cambiaformas o criatura oculta por ilusión/transmutación a 30 pies." },
  { name: "Paso de las Sombras (Misty Visions)", prereq: "Ninguno", desc: "Puedes lanzar Imagen Silenciosa a voluntad sin gastar espacios ni componentes." }
];

var METAMAGIC_DB_ES = [
  { name: "Conjuro Acelerado (Quickened)", desc: "Gasta 2 puntos de hechicería para cambiar el tiempo de lanzamiento de un conjuro de 1 acción a 1 acción bonus." },
  { name: "Conjuro Sutil (Subtle)", desc: "Gasta 1 punto de hechicería para lanzar un conjuro sin componentes somáticos ni verbales." },
  { name: "Conjuro Potenciado (Empowered)", desc: "Gasta 1 punto de hechicería al tirar el daño de un conjuro para volver a tirar un número de dados de daño hasta tu modificador de Carisma." },
  { name: "Conjuro Cuidadoso (Careful)", desc: "Gasta 1 punto de hechicería para permitir que hasta tu modificador de Carisma de criaturas tengan éxito automático en sus salvaciones contra tu conjuro." },
  { name: "Conjuro Distante (Distant)", desc: "Gasta 1 punto de hechicería para duplicar el alcance del conjuro (o darle un alcance de 30 pies si es de toque)." },
  { name: "Conjuro Ampliado (Extended)", desc: "Gasta 1 punto de hechicería para duplicar la duración de un conjuro (hasta un máximo de 24 horas)." },
  { name: "Conjuro Focalizado (Focused)", desc: "Gasta 1 punto de hechicería para ganar ventaja en una salvación de Constitución para mantener la concentración." },
  { name: "Conjuro Elevado (Heightened)", desc: "Gasta 2 puntos de hechicería para que un objetivo del conjuro tenga desventaja en su primera tirada de salvación contra él." },
  { name: "Conjuro Buscador (Seeking)", desc: "Gasta 2 puntos de hechicería para repetir una tirada de ataque fallida de un conjuro." },
  { name: "Conjuro Transmutado (Transmuted)", desc: "Gasta 1 punto de hechicería para cambiar el tipo de daño elemental del conjuro (ácido, frío, fuego, rayo, trueno, veneno) a otro de la lista." }
];

var DIVINE_ORDERS_DB_ES = [
  { name: "Protector", desc: "Ganas competencia con Armadura Pesada y Armas Marciales." },
  { name: "Taumaturgo", desc: "Ganas un truco extra de clérigo y sumas tu modificador de Sabiduría a tus tiradas de Religión e Historia." }
];

var PRIMAL_ORDERS_DB_ES = [
  { name: "Guardián", desc: "Ganas competencia con Armadura Media y Armas Marciales." },
  { name: "Mago", desc: "Ganas un truco extra de druida y sumas tu modificador de Sabiduría a tus tiradas de Naturaleza y Arcana." }
];

var WEAPON_MASTERIES_DB_ES = [
  { name: "Rozar (Graze)", desc: "Si fallas un ataque con este arma, infliges daño igual al modificador de característica usado para atacar (mínimo de 0)." },
  { name: "Hender (Cleave)", desc: "Una vez por turno si golpeas a una criatura, puedes hacer un ataque extra de daño de arma contra otra criatura adyacente dentro de tu alcance." },
  { name: "Ralentizar (Slow)", desc: "Cuando golpeas a una criatura con este arma, reduces su velocidad en 10 pies hasta el inicio de tu siguiente turno." },
  { name: "Derribar (Topple)", desc: "Cuando golpeas, obligas al objetivo a realizar una salvación de Constitución (CD = 8 + prof + mod característica) o caer Derribado." },
  { name: "Molestar (Vex)", desc: "Cuando golpeas, ganas ventaja en la próxima tirada de ataque que hagas contra ese objetivo antes del final de tu siguiente turno." },
  { name: "Raspar (Sap)", desc: "Cuando golpeas, el próximo ataque de la criatura antes del inicio de su siguiente turno tiene desventaja." },
  { name: "Empujar (Push)", desc: "Cuando golpeas, puedes empujar al objetivo hasta 10 pies en línea recta lejos de ti." },
  { name: "Muesca (Nick)", desc: "El ataque adicional de la lucha con dos armas se hace como parte de la acción de Atacar en lugar de requerir una Acción Bonus (requiere arma Ligera)." }
];

// Hacer disponibles en window
var FIGHTING_STYLES_DB = FIGHTING_STYLES_DB_ES;
var INVOCATIONS_DB = INVOCATIONS_DB_ES;
var METAMAGIC_DB = METAMAGIC_DB_ES;
var DIVINE_ORDERS_DB = DIVINE_ORDERS_DB_ES;
var PRIMAL_ORDERS_DB = PRIMAL_ORDERS_DB_ES;
var WEAPON_MASTERIES_DB = WEAPON_MASTERIES_DB_ES;

window.FIGHTING_STYLES_DB = FIGHTING_STYLES_DB;
window.INVOCATIONS_DB = INVOCATIONS_DB;
window.METAMAGIC_DB = METAMAGIC_DB;
window.DIVINE_ORDERS_DB = DIVINE_ORDERS_DB;
window.PRIMAL_ORDERS_DB = PRIMAL_ORDERS_DB;
window.WEAPON_MASTERIES_DB = WEAPON_MASTERIES_DB;

window.FIGHTING_STYLES_DB_ES = FIGHTING_STYLES_DB_ES;
window.INVOCATIONS_DB_ES = INVOCATIONS_DB_ES;
window.METAMAGIC_DB_ES = METAMAGIC_DB_ES;
window.DIVINE_ORDERS_DB_ES = DIVINE_ORDERS_DB_ES;
window.PRIMAL_ORDERS_DB_ES = PRIMAL_ORDERS_DB_ES;
window.WEAPON_MASTERIES_DB_ES = WEAPON_MASTERIES_DB_ES;
