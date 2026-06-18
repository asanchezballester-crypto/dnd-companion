var SUBCLASS_TRAITS_DB_ES = {
  // BÁRBARO
  "Berserker": [
    { level: 3, name: "Frenesí", desc: "Cuando usas Ataque Temerario en Furia, infliges daño adicional (dados iguales a tu daño de Furia) al primer objetivo que golpees cada turno. No causa fatiga." },
    { level: 6, name: "Furia Inconsciente", desc: "Inmune a ser Hechizado o Asustado en Furia. Si lo estabas, se suspende el efecto hasta que acabe la Furia." },
    { level: 10, name: "Represalia", desc: "Como reacción al recibir daño de una criatura a 5 pies, puedes atacarla cuerpo a cuerpo." },
    { level: 14, name: "Presencia Intimidante", desc: "Como Acción Bonus, puedes intentar Asustar a las criaturas a 30 pies (Salvación Sab). Si fallan, se asustan e intentan alejarse." }
  ],
  "Corazón Salvaje": [
    { level: 3, name: "Afinidad Animal", desc: "Al entrar en Furia, eliges: Oso (resistencia a casi todo el daño), Águila (Desengancharse libre y Correr como Acción Bonus) o Lobo (ventaja a los aliados cuerpo a cuerpo)." },
    { level: 3, name: "Hablador de Bestias", desc: "Puedes lanzar Hablar con los Animales y Sentido de la Bestia." },
    { level: 6, name: "Aspecto de la Bestia", desc: "Ganas pasiva: Oso (Atletismo ventaja, el doble de carga), Búho (Visión Oscura, ventaja en Percepción), o Pantera (ventaja en Sigilo)." },
    { level: 10, name: "Caminante de los Espíritus", desc: "Puedes lanzar Comunión con la Naturaleza como ritual." },
    { level: 14, name: "Poder del Corazón Salvaje", desc: "Eliges de nuevo: Oso (Desventaja a quienes ataquen a otros que no seas tú), Águila (Vuelo temporal en tu turno), o León (Derribar al impactar cuerpo a cuerpo)." }
  ],
  "Árbol del Mundo": [
    { level: 3, name: "Vitalidad del Árbol", desc: "Cuando entras en Furia, ganas PV temporales. Además, en cada turno durante Furia puedes dar PV temporales a un aliado a 10 pies." },
    { level: 6, name: "Ramas del Árbol", desc: "Cuando una criatura enemiga empieza su turno a 20 pies de ti, puedes obligarla a salvar Fuerza o ser teletransportada al espacio a tu lado. Tu alcance aumenta 10 pies." },
    { level: 10, name: "Raíces Aplastantes", desc: "Durante tu Furia, los ataques con armas cuerpo a cuerpo ganan Dominio del Arma (Empujar y Derribar) y pueden usar ambas a la vez." },
    { level: 14, name: "Viaje por el Árbol", desc: "Al inicio de tu turno en Furia puedes teletransportarte hasta 60 pies. También puedes llevar a un aliado contigo." }
  ],
  "Celo del Mundo": [
    { level: 3, name: "Furia Divina", desc: "Mientras estás en Furia, el primer objetivo que golpeas sufre daño Radiante o Necrótico (1d6 + mitad de nivel)." },
    { level: 3, name: "Guerrero de los Dioses", desc: "Puedes gastar dados de golpe extra al curarte con un descanso corto, y tu conexión divina te protege." },
    { level: 6, name: "Foco Fanático", desc: "Si fallas una salvación en Furia, puedes repetir y usar el nuevo resultado (1/Furia)." },
    { level: 10, name: "Presencia Zeálotica", desc: "Como Acción Bonus, das ventaja en ataques y salvaciones a aliados a 60 pies (1/Día)." },
    { level: 14, name: "Furia de los Dioses", desc: "Si caes a 0 PV en Furia, no quedas inconsciente, y puedes seguir atacando. Además curas masivamente al golpear (1/Furia)." }
  ],

  // BARDO
  "Danza": [
    { level: 3, name: "Golpes Ágiles", desc: "Al usar Inspiración Bárdica puedes hacer un Ataque Desarmado como Acción Bonus. Usas Destreza para estos ataques y tu dado bárdico como daño." },
    { level: 3, name: "Defensa sin Armadura", desc: "CA base de 10 + Destreza + Carisma." },
    { level: 6, name: "Movimiento en Tándem", desc: "Al tirar Iniciativa, tú y aliados cercanos podéis moveros media velocidad sin provocar ataques de oportunidad." },
    { level: 6, name: "Daño Bárdico", desc: "Tu dado bárdico se aplica al daño de tus ataques desarmados." },
    { level: 14, name: "Evasión Líder", desc: "Ganas Evasión. Y cuando la usas, los aliados cercanos también evitan el daño." }
  ],
  "Glamour": [
    { level: 3, name: "Manto de Inspiración", desc: "Gasta Inspiración para dar PV Temporales a aliados y permitirles moverse de inmediato sin ataques de oportunidad." },
    { level: 3, name: "Magia Cautivadora", desc: "Al lanzar ciertos conjuros, puedes intentar encantar o asustar extra a un objetivo." },
    { level: 6, name: "Manto de Majestad", desc: "Puedes lanzar *Orden* sin gastar espacio como Acción Bonus durante 1 minuto continuo." },
    { level: 14, name: "Majestad Inquebrantable", desc: "Los ataques contra ti tienen desventaja automática y el atacante puede verse forzado a fallar por la belleza de tu ilusión." }
  ],
  "Saber": [
    { level: 3, name: "Palabras Cortantes", desc: "Usa tu Reacción y un dado de Inspiración para restar el resultado a un ataque, habilidad o salvación de un enemigo." },
    { level: 3, name: "Competencias Extra", desc: "Ganas 3 competencias en habilidades de tu elección." },
    { level: 6, name: "Descubrimientos Mágicos", desc: "Aprendes conjuros adicionales de cualquier clase." },
    { level: 14, name: "Habilidad Sin Par", desc: "Puedes sumar un Dado de Inspiración a tus propias pruebas de Habilidad." }
  ],
  "Valor": [
    { level: 3, name: "Entrenamiento Marcial", desc: "Competencia en armas marciales, escudos y armadura media. Puedes usar armas como foco." },
    { level: 3, name: "Inspiración en Combate", desc: "Los aliados suman tu dado de Inspiración al DAÑO de sus ataques o a su CA como reacción." },
    { level: 6, name: "Ataque Extra", desc: "Puedes atacar dos veces por turno. Puedes sustituir uno de esos ataques por lanzar un Truco de bardo." },
    { level: 14, name: "Magia de Batalla", desc: "Cuando lanzas un conjuro con tu Acción, puedes realizar un ataque de arma como Acción Bonus." }
  ],

  // CLÉRIGO
  "Vida": [
    { level: 3, name: "Discípulo de la Vida", desc: "Tus hechizos de curación curan 2 + nivel del hechizo extra." },
    { level: 3, name: "Preservar Vida", desc: "Canalizar Divinidad: curas (5 x nivel) PV entre aliados a 30 pies." },
    { level: 6, name: "Curador Bendito", desc: "Al curar a otros con un conjuro de nivel 1+, tú te curas 2 + el nivel del conjuro." },
    { level: 17, name: "Curación Suprema", desc: "No tires dados de curación para hechizos: curan automáticamente el máximo posible." }
  ],
  "Luz": [
    { level: 3, name: "Fulgor Defensor", desc: "Como reacción, puedes imponer Desventaja al ataque de un enemigo usando luz cegadora (Usos = mod Sabiduría)." },
    { level: 3, name: "Resplandor del Alba", desc: "Canalizar Divinidad: daño de 2d10 + nivel radiante en radio 30 pies y disipa oscuridad mágica." },
    { level: 6, name: "Luz Reveladora", desc: "Puedes proteger a los aliados con tu Fulgor Defensor y mejora tus conjuros de luz." },
    { level: 17, name: "Corona de Luz", desc: "Emites un aura. Enemigos dentro tienen desventaja en salvaciones contra daño de fuego o radiante." }
  ],
  "Engaño": [
    { level: 3, name: "Bendición del Embaucador", desc: "Como Acción Bonus, das a un aliado ventaja en Sigilo." },
    { level: 3, name: "Invocar Duplicado", desc: "Canalizar: creas ilusión (sin concentración). Te puedes teletransportar intercambiando lugares con ella y lanzar conjuros desde su posición." },
    { level: 6, name: "Magia de Embaucador", desc: "Puedes usar Ilusión y Encantamiento mejorado con las tácticas de tu Duplicado." },
    { level: 17, name: "Duplicidad Mejorada", desc: "Invocas más clones a la vez y otorgan grandes ventajas tácticas al grupo." }
  ],
  "Guerra": [
    { level: 3, name: "Sacerdote de Batalla", desc: "Ganas dominio de armas. Puedes hacer un ataque de arma como Acción Bonus tras atacar normalmente." },
    { level: 3, name: "Golpe Guiado", desc: "Canalizar: sumas +10 a tu tirada de ataque fallida para convertirla en éxito." },
    { level: 6, name: "Bendición del Dios de Guerra", desc: "Puedes usar el +10 en un aliado como Reacción. Ganas Escudo de Fe gratis." },
    { level: 17, name: "Avatar de la Batalla", desc: "Resistencia pasiva al daño Contundente, Perforante y Cortante de armas convencionales." }
  ],

  // DRUIDA
  "Tierra": [
    { level: 3, name: "Socorro de la Tierra", desc: "Ganas conjuros pasivos de terreno. Puedes curar/dañar drenando energía vital de la tierra alrededor." },
    { level: 3, name: "Recuperación Natural", desc: "En descanso corto recuperas casillas de conjuro iguales a la mitad de tu nivel." },
    { level: 6, name: "Protección de la Naturaleza", desc: "Inmune al veneno y enfermedades. Ignoras terreno difícil." },
    { level: 10, name: "Paso Terrenal", desc: "Te mueves con agilidad extrema por la naturaleza y ganas conjuros extra mejorados." },
    { level: 14, name: "Santuario de la Naturaleza", desc: "Los animales y plantas deben salvar para poder atacarte, y las plantas aliadas te proporcionan cobertura." }
  ],
  "Luna": [
    { level: 3, name: "Formas del Círculo", desc: "Puedes convertirte en Bestias de hasta VD 1. Forma Salvaje de Combate usa Acción Bonus." },
    { level: 6, name: "Golpes Primigenios", desc: "Tus ataques de bestia pueden causar Daño de Fuerza, Radiante, o Necrótico en lugar del tipo original." },
    { level: 10, name: "Forma Lunar", desc: "Puedes transformarte en criaturas elementales/bestias potentes combinadas." },
    { level: 14, name: "Forma de la Bestia", desc: "Añades tu daño de Druida especial y mejoras mágicas permanentes a las bestias que asumes." }
  ],
  "Mar": [
    { level: 3, name: "Ira del Mar", desc: "Como Acción Bonus, creas una Emanación que empuja, daña y ralentiza enemigos a tu alrededor o cura." },
    { level: 6, name: "Afinidad Acuática", desc: "Respiras bajo el agua y nadas. Tus conjuros de agua y trueno están potenciados." },
    { level: 10, name: "Manto Oceánico", desc: "La emanación mejora el alcance a 30 pies." },
    { level: 14, name: "Tormenta de Mar", desc: "Concedes resistencia y capacidades de escape a los aliados dentro de tu Manto Oceánico." }
  ],
  "Estrellas": [
    { level: 3, name: "Forma Estelar", desc: "Acción bonus: Arquero (ataque a distancia extra), Cáliz (curación extra en cadena) o Dragón (mínimo de 10 en concentración)." },
    { level: 6, name: "Presagio Cósmico", desc: "Tiras 1d6 al descansar. Par: mejoras tiradas de aliados; Impar: empeoras tiradas de enemigos." },
    { level: 10, name: "Lleno de Estrellas", desc: "Puedes alternar entre las tres constelaciones gratis cada turno." },
    { level: 14, name: "Guía Cósmica", desc: "En Forma Estelar tienes resistencia al daño físico." }
  ],

  // GUERRERO
  "Maestro de Batalla": [
    { level: 3, name: "Superioridad", desc: "Aprendes 3 Maniobras de Combate. Ganas Dados de Superioridad (d8)." },
    { level: 7, name: "Conoce a tu Enemigo", desc: "Analizas a una criatura para descubrir inmunidades, vulnerabilidades y estadísticas ocultas de forma rápida." },
    { level: 10, name: "Superioridad Mejorada", desc: "Tus dados pasan a ser d10." },
    { level: 15, name: "Implacable", desc: "Recuperas un Dado si tiras iniciativa y no te quedan." },
    { level: 18, name: "Máxima Superioridad", desc: "Tus dados pasan a ser d12." }
  ],
  "Campeón": [
    { level: 3, name: "Crítico Mejorado", desc: "Crítico sacando 19-20." },
    { level: 3, name: "Atleta Destacado", desc: "Tienes Ventaja en todas tus tiradas de Iniciativa y pruebas de Atletismo." },
    { level: 7, name: "Estilo Extra", desc: "Ganas un segundo Estilo de Combate." },
    { level: 10, name: "Guerrero Heroico", desc: "Una vez por turno puedes darte Ventaja a ti mismo en un ataque." },
    { level: 15, name: "Crítico Superior", desc: "Crítico sacando 18, 19 o 20." },
    { level: 18, name: "Superviviente", desc: "Ventaja en salvaciones contra muerte, recuperas 5+Con PV al inicio del turno si estás bajo 50% vida." }
  ],
  "Caballero Arcano": [
    { level: 3, name: "Conjuros y Vínculo", desc: "Lanzamiento de mago. Vinculas armas (no te las pueden quitar y vuelven a tu mano)." },
    { level: 7, name: "Magia de Guerra", desc: "Cuando tomas la acción de Atacar, puedes sustituir UNO de esos ataques por el lanzamiento de un Truco de Mago." },
    { level: 10, name: "Golpe Sobrecargado", desc: "Cuando dañas con arma, la próxima salvación del enemigo contra tus conjuros tiene desventaja." },
    { level: 15, name: "Carga Arcana", desc: "Cuando usas Acción Súbita, te teletransportas 30 pies gratis." },
    { level: 18, name: "Magia de Batalla Mejorada", desc: "Puedes sustituir DOS de tus ataques al tomar la acción de Atacar por el lanzamiento de cualquier conjuro de Mago de nivel 1 o 2." }
  ],
  "Caballero Psiónico": [
    { level: 3, name: "Energía Psiónica", desc: "Dados psiónicos: Ataque (daño extra), Protección (reducir daño), Telequinesis (mover objetos)." },
    { level: 7, name: "Adepto Telequinético", desc: "Puedes volar pequeñas distancias en tu turno y empujar bestialmente a enemigos al impactarles." },
    { level: 10, name: "Mente Protegida", desc: "Inmune al miedo y hechizo, y daño psíquico reducido." },
    { level: 15, name: "Baluarte", desc: "Aura psiónica grupal de protección (+2 CA temporal)." },
    { level: 18, name: "Maestro Psiónico", desc: "Lanzas Telequinesis a voluntad. Potenciador masivo en combate mientras te concentras." }
  ],

  // MONJE
  "Mano Abierta": [
    { level: 3, name: "Técnica de la Mano Abierta", desc: "Cuando impactas con Ráfaga de Golpes, puedes intentar quitar reacciones, empujar o derribar sin coste de acción." },
    { level: 6, name: "Integridad de Cuerpo", desc: "Como Acción Bonus, te curas un número de puntos de golpe masivos y curas condiciones (1/descanso)." },
    { level: 11, name: "Paso Ligero", desc: "Al usar Paso del Viento tu velocidad aumenta drásticamente y puedes esquivar mientras corres." },
    { level: 17, name: "Golpe de Temblor", desc: "Al golpear desarmado, infliges vibraciones mortales. Puedes hacer que exploten para causar daño masivo en área." }
  ],
  "Sombra": [
    { level: 3, name: "Artes Sombrías", desc: "Como Acción Bonus gastando 1 Punto puedes crear Oscuridad (la cual puedes mover). Ganas Visión Oscura de 60 pies (ves a través de tu oscuridad) y truco Ilusión Menor." },
    { level: 6, name: "Paso Sombrío", desc: "En penumbra u oscuridad, Acción Bonus teletransporte 60 pies a otro punto oscuro. Ventaja en tu próximo ataque." },
    { level: 11, name: "Paso Sombrío Mejorado", desc: "Puedes teletransportarte incluso desde/hacia Luz Brillante. Además tras teletransportarte puedes hacer 1 ataque gastando 1 punto." },
    { level: 17, name: "Capa de Sombras", desc: "Gastas 3 Puntos para volverte completamente invisible por 1 minuto. Mientras eres invisible, usar Ráfaga de Golpes es gratis." }
  ],
  "Elementos": [
    { level: 3, name: "Sintonía Elemental", desc: "Tus golpes ganan 10 pies de alcance y daño elemental (fuego/frío...). Puedes empujar y tirar enemigos con cada golpe elemental." },
    { level: 6, name: "Estallido Ambiental", desc: "Sustituye 1 ataque para crear una pequeña explosión en área destructora." },
    { level: 11, name: "Zancada Elemental", desc: "Mientras tu Sintonía está activa, ganas vuelo y nado igual a tu velocidad." },
    { level: 17, name: "Epítome Elemental", desc: "Tu aura te protege, dañas pasivamente a enemigos que te cruzan." }
  ],
  "Misericordia": [
    { level: 3, name: "Manos de Vida y Muerte", desc: "Mano Sanadora (gastas punto para curar). Mano Dañina (gastas punto para hacer daño necrótico en un golpe)." },
    { level: 6, name: "Toque del Médico", desc: "La sanación limpia veneno/enfermedad/ceguera. El daño envenena automáticamente al objetivo (sin salvación)." },
    { level: 11, name: "Ráfaga Combinada", desc: "Al hacer ráfaga de golpes, usar la mano dañina y sanadora es gratuito 1 vez." },
    { level: 17, name: "Misericordia Final", desc: "Puedes revivir a un aliado caído recientemente usando tus artes marciales para reactivar su corazón." }
  ],

  // PALADÍN
  "Devoción": [
    { level: 3, name: "Arma Sagrada", desc: "Canalizar: el arma suma mod de Carisma al ataque y emite luz brillante." },
    { level: 7, name: "Aura de Devoción", desc: "Inmunes al estado Hechizado." },
    { level: 15, name: "Pureza de Espíritu", desc: "Protección constante contra alineamientos malvados y criaturas extraplanarias." },
    { level: 20, name: "Nimbo Sagrado", desc: "Aura destructiva que ciega y daña pasivamente a demonios y muertos vivientes." }
  ],
  "Gloria": [
    { level: 3, name: "Golpe Inspirador", desc: "Al usar Castigo Divino, reparte PV temporales entre aliados." },
    { level: 7, name: "Aura de Presteza", desc: "Aura de +10 pies de velocidad a aliados." },
    { level: 15, name: "Defensa Gloriosa", desc: "Si fallan un ataque contra ti, sumas Carisma a tu CA y contraatacas." },
    { level: 20, name: "Mito Viviente", desc: "Ganas inspiración heroica automática en salvaciones, y puedes decidir superar salvaciones falladas." }
  ],
  "Antiguos": [
    { level: 3, name: "Furia de la Naturaleza", desc: "Canalizar: Atrapas a enemigos en enredaderas." },
    { level: 7, name: "Aura de Custodia", desc: "Tú y aliados tenéis Resistencia a TODO el daño proveniente de Conjuros." },
    { level: 15, name: "Centinela Inmortal", desc: "Caer a 0 te deja en 1 PV (1/día)." },
    { level: 20, name: "Campeón Antiguo", desc: "Recuperación masiva, desventaja forzada y control sobre la naturaleza." }
  ],
  "Venganza": [
    { level: 3, name: "Voto de Enemistad", desc: "Canalizar: Tienes Ventaja constante contra un enemigo. (2024: Si el objetivo muere antes del minuto, puedes transferir el voto a otra criatura a 30 pies)." },
    { level: 7, name: "Vengador Implacable", desc: "Tras ataque de oportunidad, puedes moverte media velocidad libremente." },
    { level: 15, name: "Alma de la Venganza", desc: "Contraataques al enemigo de tu Voto cuando él ataca." },
    { level: 20, name: "Ángel Vengador", desc: "Alas, velocidad de vuelo e irradias aura de miedo constante y paralizante." }
  ],

  // EXPLORADOR
  "Cuidabestias": [
    { level: 3, name: "Compañero Primigenio", desc: "Invocas bestia del Cielo, Tierra o Mar. Puedes ordenarle atacar usando tu Acción Bonus." },
    { level: 7, name: "Entrenamiento Excepcional", desc: "La bestia ataca con magia y puede realizar las acciones Desengancharse, Esquivar o Correr con tu Acción Bonus si no la mandas atacar." },
    { level: 11, name: "Furia Bestial", desc: "Tu bestia hace 2 ataques en lugar de 1 cuando le das la orden." },
    { level: 15, name: "Compartir Conjuros", desc: "Conjuros aplicados a ti mismo afectan también a la bestia (ej. Marca del Cazador)." }
  ],
  "Vagabundo de las Hadas": [
    { level: 3, name: "Golpes Temibles", desc: "Una vez por turno, infliges 1d4 daño psíquico." },
    { level: 3, name: "Glamour Extramundano", desc: "Añades tu Sabiduría a pruebas de Carisma." },
    { level: 7, name: "Giro Engañoso", desc: "Si tú o un aliado pasáis salvación de miedo/encanto, puedes redirigir el efecto a un enemigo." },
    { level: 11, name: "Refuerzos Feéricos", desc: "Lanzas Paso Brumoso sin espacio de conjuro múltiple veces y puedes llevar aliados." },
    { level: 15, name: "Viajero Místico", desc: "Lanzas conjuros de alto nivel e invocas aliados del Feywild a voluntad." }
  ],
  "Acechador de la Sombra": [
    { level: 3, name: "Emboscada Pavorosa", desc: "Una vez POR TURNO (no solo el primero), si golpeas a alguien puedes elegir infligir 1d8 de daño psíquico extra y asustarlo." },
    { level: 3, name: "Visión Umbría", desc: "Visión Oscura + Inmune a ser visto en la oscuridad por otras criaturas con visión oscura." },
    { level: 7, name: "Mente de Hierro", desc: "Proficiencia en Salvaciones de Sabiduría." },
    { level: 11, name: "Ráfaga del Acechador", desc: "Una vez por turno, si fallas un ataque, haces otro contra cualquier criatura gratis." },
    { level: 15, name: "Evasión Sombreada", desc: "Reacción: fuerza Desventaja sobre un ataque entrante hacia ti." }
  ],
  "Cazador": [
    { level: 3, name: "Presa del Cazador", desc: "Al aplicar Marca del Cazador, adquieres información del enemigo y haces daño extra." },
    { level: 7, name: "Defensa de Cazador", desc: "Elige beneficios pasivos contra multitudes o contra ataques monstruosos." },
    { level: 11, name: "Ataque Múltiple Superior", desc: "Ataque que daña a múltiples enemigos en tu área de influencia." },
    { level: 15, name: "Superviviente Superior", desc: "Reduces daño recibido usando evasión táctica y reflejos." }
  ],

  // PÍCARO
  "Embaucador Arcano": [
    { level: 3, name: "Mano Mágica Rápida", desc: "Mano de Mago invisible, puede forzar cerraduras o robar como Acción Bonus." },
    { level: 3, name: "Conjuros Ilusorios", desc: "Magia de Mago centrada en Ilusión y Encantamiento." },
    { level: 9, name: "Emboscada Mágica", desc: "Si estás oculto, los enemigos salvan contra tus conjuros con Desventaja." },
    { level: 13, name: "Tramposo Versátil", desc: "Tu Mano de Mago puede distraer y darte Ventaja." },
    { level: 17, name: "Ladrón de Conjuros", desc: "Robas la magia y memorias de conjuros enemigos para usarlas contra ellos." }
  ],
  "Asesino": [
    { level: 3, name: "Asesinar", desc: "Ganas Ventaja en todas tus tiradas de Iniciativa. En la 1ª ronda, tienes Ventaja en ataques contra criaturas que no han actuado y les haces Daño de Pícaro extra igual a tu nivel." },
    { level: 9, name: "Infiltración Experta", desc: "Te mueves con ventaja en pruebas de sigilo y puedes adoptar identidades rápidamente." },
    { level: 13, name: "Armas Envenenadas", desc: "Dominas los venenos de forma brutal; tu daño de veneno ignora resistencia e inflige daño extra." },
    { level: 17, name: "Golpe de Muerte", desc: "El objetivo de tu asesinato debe salvar Constitución; si falla, TODO el daño se DUPLICA." }
  ],
  "Cuchilla del Alma": [
    { level: 3, name: "Energía Mental", desc: "Usas dados psiónicos para potenciar habilidades fallidas mágicamente (no se gastan si no transforman fallo en éxito)." },
    { level: 3, name: "Cuchillas Mentales", desc: "Manifiestas dagas psíquicas invisibles (d6 daño). Ganas ataques extra como Bonus." },
    { level: 9, name: "Telepatía Absoluta", desc: "Conexión psiónica con todo tu grupo sin límites." },
    { level: 13, name: "Velo Psiónico", desc: "Gasta punto para volverte Invisible." },
    { level: 17, name: "Desgarro Neural", desc: "Los golpes de tus cuchillas pueden Aturdir a la víctima." }
  ],
  "Ladrón": [
    { level: 3, name: "Manos Rápidas", desc: "Usar Objeto, forzar, o Desarmar trampas cuentan como tu Acción Bonus." },
    { level: 9, name: "Sigilo Supremo", desc: "Ventaja constante en pruebas de Sigilo." },
    { level: 13, name: "Uso de Dispositivos", desc: "Puedes sintonizar 4 objetos mágicos. Puedes usar Pergaminos usando Int/Sab/Car para tirar el d20." },
    { level: 17, name: "Reflejos de Ladrón", desc: "En la primera ronda de cualquier combate, juegas 2 turnos separados." }
  ],

  // HECHICERO
  "Mente Aberrante": [
    { level: 3, name: "Telepatía Aberrante", desc: "Comunicación telepática a 30 pies." },
    { level: 6, name: "Magia Psiónica", desc: "Lanzas conjuros aberrantes gastando puntos de hechicería directo: sin componentes." },
    { level: 14, name: "Mutación Física", desc: "Te vuelves aberración fluida (vuelo, deslizar, visión verdadera)." },
    { level: 18, name: "Deformar la Realidad", desc: "Teletransporte masivo que succiona a todos en un agujero negro de daño." }
  ],
  "Alma de Relojería": [
    { level: 3, name: "Restaurar el Equilibrio", desc: "Reacción: cancelas Ventaja/Desventaja." },
    { level: 6, name: "Baluarte", desc: "Escudo protector d8 en ti u otro que absorbe golpes." },
    { level: 14, name: "Trance Ordenado", desc: "Tus tiradas d20 inferiores a 10 se convierten en 10 por 1 min." },
    { level: 18, name: "Caballería Metálica", desc: "Invoca modrons a curar todo o reparar todo en enorme área." }
  ],
  "Dracónico": [
    { level: 3, name: "Resiliencia Dracónica", desc: "+1 PV/nivel y CA 13+Destreza si no hay armadura." },
    { level: 6, name: "Afinidad Elemental", desc: "Daño extra a hechizos de tu color de dragón y ganarás resistencia." },
    { level: 14, name: "Alas Innatas", desc: "Siempre están activas. Vuelo continuo durante tu turno sin concentración." },
    { level: 18, name: "Presencia", desc: "Aura de miedo/hechizo de 60 pies masiva." }
  ],
  "Magia Salvaje": [
    { level: 3, name: "Oleada y Mareas", desc: "Tiradas en tabla caótica al usar magia. Puedes ganar ventaja forzando oleada." },
    { level: 6, name: "Doblegar la Suerte", desc: "Restar/Sumar d4 a salvación/ataque de otros." },
    { level: 14, name: "Caos Controlado", desc: "Tiras dos veces en la tabla salvaje y eliges qué ocurre." },
    { level: 18, name: "Bombardeo Arcano", desc: "Si un dado de daño de conjuro cae máximo, revienta daño extra." }
  ],

  // BRUJO
  "Archihada": [
    { level: 3, name: "Pasos de Feérico", desc: "Ganas Paso Brumoso gratuito tantas veces como tu nivel de Brujo." },
    { level: 6, name: "Niebla Cautivadora", desc: "Al usar Paso Brumoso, dejas un efecto que Hechiza o Asusta en el sitio del que partiste." },
    { level: 10, name: "Defensas Cautivadoras", desc: "Inmune a hechizos. Devuelves el efecto de encanto al remitente." },
    { level: 14, name: "Laberinto Mágico", desc: "Al usar Paso Brumoso encierras a un enemigo en un laberinto mental." }
  ],
  "Celestial": [
    { level: 3, name: "Luz Curativa", desc: "Conjunto de d6 de curación a distancia como Acción Bonus sin conjuro." },
    { level: 6, name: "Alma Radiante", desc: "Daño extra y resistencia Fuego/Radiante." },
    { level: 10, name: "Resiliencia de Luz", desc: "PV temporales masivos al grupo tras descansos." },
    { level: 14, name: "Venganza Cegadora", desc: "Al caer a 0, revives instantáneamente en una explosión curando y cegando." }
  ],
  "Infernal": [
    { level: 3, name: "Bendición del Oscuro", desc: "Al matar enemigo ganas PV Temporales." },
    { level: 6, name: "Suerte del Oscuro", desc: "Añade 1d10 a tus fallos (1/descanso)." },
    { level: 10, name: "Resiliencia Demoníaca", desc: "Eliges tipo de daño a resistir." },
    { level: 14, name: "Lanzar al Averno", desc: "Teletransporta enemigo al infierno causando 10d10 daño masivo." }
  ],
  "Primigenio": [
    { level: 3, name: "Mente Despierta", desc: "Telepatía absoluta sin fronteras de idioma." },
    { level: 6, name: "Maleficio Mental", desc: "Lanzas conjuros de Ilusión o Encantamiento forzando desventaja si el enemigo tiene tu Hex activo." },
    { level: 10, name: "Escudo de Pensamiento", desc: "Nadie puede leerte. Resistencia Psíquica total." },
    { level: 14, name: "Crear Esclavo", desc: "Conviertes a humanoides en sirvientes sin voluntad." }
  ],

  // MAGO
  "Abjuración": [
    { level: 3, name: "Protección Arcana", desc: "Capa pasiva de salud (PV) que se recarga al lanzar escudos/protecciones." },
    { level: 6, name: "Protección Proyectada", desc: "Bloquea golpes a otros con tu barrera a 30 pies." },
    { level: 10, name: "Contrarrestar Mejorado", desc: "Añades tu bono de competencia a los Contrarrestar Conjuro." },
    { level: 14, name: "Resistencia Pura", desc: "Ventaja en TODAS las salvaciones mágicas. Resistencia al daño mágico." }
  ],
  "Adivinación": [
    { level: 3, name: "Portento", desc: "Tiras 2 d20 al despertar, los usas para reemplazar cualquier d20 tuyo o enemigo." },
    { level: 6, name: "Experto Adivino", desc: "Recuperas espacios de bajo nivel al lanzar adivinaciones de alto nivel." },
    { level: 10, name: "Tercer Ojo", desc: "Ves lo invisible o ganas visión oscura mejorada permanentemente." },
    { level: 14, name: "Portento Mayor", desc: "Obtienes un tercer dado (3 d20) de Portento." }
  ],
  "Evocación": [
    { level: 3, name: "Esculpir Magia", desc: "Aliados dentro de tus Evocaciones salvan automáticamente y reciben 0 daño." },
    { level: 6, name: "Truco Potente", desc: "Tus trucos hacen siempre medio daño si el enemigo los esquiva." },
    { level: 10, name: "Poderío Evocador", desc: "Sumas Modificador de Inteligencia al daño." },
    { level: 14, name: "Sobrecarga", desc: "Maximizas daño brutal de niveles 1-5 a coste de tu salud máxima." }
  ],
  "Ilusión": [
    { level: 3, name: "Ilusión Menor Superior", desc: "Puedes lanzar Ilusión menor como Acción Bonus e incluye imagen y sonido." },
    { level: 6, name: "Ilusiones Maleables", desc: "Reestructuras ilusiones activas sin gastar magia extra." },
    { level: 10, name: "Yo Ilusorio", desc: "Creas clon automático para forzar que el ataque enemigo falle." },
    { level: 14, name: "Realidad", desc: "Vuelves sólido un objeto dentro de tu ilusión temporalmente." }
  ]
};

// Agregar SUBCLASS_TRAITS_DB a la variable global (window)
var SUBCLASS_TRAITS_DB = SUBCLASS_TRAITS_DB_ES;
window.SUBCLASS_TRAITS_DB = SUBCLASS_TRAITS_DB;
window.SUBCLASS_TRAITS_DB_ES = SUBCLASS_TRAITS_DB_ES;
