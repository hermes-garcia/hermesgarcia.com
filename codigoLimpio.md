#Consejos para escribir código limpio
Como desarrolladores escribimos código que ejecutan las máquinas y que leen las personas y,
para desarrollar software de una manera ágil, poder mantener y escalar con el tiempo, 
necesitamos seguir una serie de guías que nos permita entender lo que escribimos.
Siempre hay que pensar en que el código lo estaremos leyendo frecuentemente para encontrar problemas,
para mejorar rendimiento o para agregar nuevas funcionalidades. ¿Cuántas veces has revisado
código propio o de un compañero y has quedado totalmente confundido con lo que hace?
Esto, como ya sabemos, es muy común encontrarlo en cualquier proyecto.

Por lo anterior, Robert C. Martin  escribió un manual de estilo para el desarrollo ágil de software
llamado ___"Código limpio"___.

A continuación te presento un resumen de este manual pero antes cabe mencionar que estos son
consejos y no pretenden ser una estructura rígida o inflexible, siempre es mejor adaptarse a las
mejores prácticas que funcionen mejor con tu forma y equipo de trabajo. Sin embargo, hay que 
considerar que estos consejos son usados por la gran mayoría de equipos de desarrollo del mundo.
***
###Nombra con sentido
Nombra tus variables, constantes y funciones con un sentido holístico, es decir, con sólo leer 
tu variable debes poder entender por qué existe, qué hace y cómo se usa.  
Mira este código:  
`$p = 5; //Pago en doláres`

Ese variable nombrada `$p` no está informando nada acerca de lo que hace la variable y, aunque tiene
un comentario, tendríamos que estar haciendo scroll para recordar de qué trata.  
Mejor usa un nombre como el siguiente:  
`$paymentInUSD = 5;`

Así, quién lea tu código, tendrá claro qué hace esta variable: ***Almacena el valor de pago en dólares***.  
Y no tendrá que recurrir a buscar el comentario.
***
###Nombres que se puedan buscar
Si nombramos nuestras variables con una sola letra, será muy difícil hacer un ___Ctrl + f___ y buscar.  
En inglés la letra más usada es la *'e'* y en español la *'a'*, así que imagínate utilizar una sola
letra y buscarla en el código.  
Cuando intentes buscarla se verá todo tu editor de código resaltando todas las letras y será 
imposible encontrar lo que estás buscando.
***
###Nombres que se puedan pronunciar
Una de las prácticas más estándar en el mundo del desarrollo es el uso del inglés para nombrar 
las variables, constantes y funciones. Esta práctica es aceptada, sugerida y hasta obligada en
la industria. Ahora, los nombres deben poderse pronunciar.  
Aquí un ejemplo claro:  
`$genymdhms = date('Y-m-d h:i:s');`

La variable anterior no se puede mencionar en ningún idioma. Son siglas que se volverán un dolor de 
cabeza al querer recordarlas o pronunciarlas. 
Así que, sabiendo el objetivo de la variable (en este caso es la fecha de un proceso), podemos cambiarla a:  
`$generationTimestamp = date('Y-m-d h:i:s');`
***
###Variables de una sola letra
Ya mencionamos que no se deben usar variables de una sola letra. Pero como toda regla,
existen sus excepciones:  
`for ($i = 0; $i < 10; $i++) {`

___¿Por qué es muy común usar una letra como nombre de variable en el ejemplo anterior?___   
El contexto en esta porción de código nos permite entender que la variable `$i` está actuando como un índice.  
Incluso podemos tener variables de una sola letra en funciones o métodos que son muy cortos:
```
public function sayHello($n = null) {
    return "Hello " . $n;
}
```
En este ejemplo, `$n` indica el nombre de la persona a la que se va a saludar. Esta función es fácil 
de entender y no hay que preocuparse con el uso de la variable en otro contexto. Sin embargo, 
si la función comienza a crecer, será cada vez más difícil entender con sólo leerla a qué se refiere
esta variable.  
Una mejor forma de escribir la función anterior es la siguiente:
```
public function sayHello($name = null) {
    return "Hello " . $name;
}
```
Las buenas prácticas indican que la segunda función es la que está mejor escrita. ¿Cuál prefieres tú?
***
###Uso de abreviaciones
Entre las buenas prácticas, cómo ya lo mencionamos, no se recomienda usar abreviaciones. 
Sin embargo, existen algunas abreviaciones que son tan comunes que tienen total sentido.  
Por ejemplo: `source` podríamos cambiarlo por
`src`, `image` por `img`, entre otros. 

___¿Por qué?___  
Porque `src`, `img` y otras abreviaciones son ampliamente utilizadas, incluso aceptadas como parte de la 
sintaxis de algunos lenguajes.

Ejemplo:  
`<img src="path" alt="Ejemplo de abreviaciones">`

Los desarrolladores estamos ya familiarizados con estas abreviaciones y son muy fáciles de entender.
***
###Las funciones deben hacer una sola cosa
Es normal que, mientras escribimos código, vamos desarrollando todo lo que tiene que hacer nuestro 
software. Pero en ocasiones las funciones (o métodos) se vuelven gigantes. Cuando lo lees, vas
revisando que hay cosas que deberían estar en otras funciones (o métodos) más pequeños que serán 
llamados por tu función principal, en estos casos podrás utilizar el concepto de ___Single Responsability___.

Ejemplo:  
```
public function burbleSort($numbers = array()) {
    for ($i=1; $i < count($numbers); $i++) {
        for ($j=0; $j < count($numbers)-1; $j++) {
            if ($numbers[$i] > $numbers[$j]) {
                $numbers[$i] = $numbers[$j];
                $numbers[$j] = $numbers[$i];
            }
        }
    }
}
```
En el código anterior, la función burbleSort tiene demasiadas tareas que cumplir, 
vamos a dividir las responsabilidades:
```
public function burbleSort($numbers = array()) {
    for ($i=1; $i < count($numbers); $i++) {
        exchange($numbers, $i);
    }
}

public function exchange($numbers = array(), $i = 0) {
    for ($j=0; $j < count($numbers)-1; $j++) {
        if ($numbers[$i] > $numbers[$j]) {
            $numbers[$i] = $numbers[$j];
            $numbers[$j] = $numbers[$i];
        }
    }
}
```
Mucho mejor, ahora la función delegó el intercambio de posiciones a otra función. Incluso podríamos
dividirla aún más para que cumplir con esta práctica de una mejor manera.
***
###Funciones sin efectos secundarios
Ya lo hemos mencionado antes, pero lo repetimos: ___Las funciones deben hacer una sola cosa y la deben hacer bien.___  
```
// BAD
public function isValidPayment($payment, $coursePrice) {
	if ($payment == $coursePrice) {
		createInvoice();
		return true;
	}
	return false;
}

// GOOD
public function isValidPayment($payment, $coursePrice) {
	return $payment == $coursePrice;
}
```
Observa cómo la primera función no está adoptando buenas prácticas porque, además de validar 
si el pago del curso es correcto, crea una nueva factura de compra. 
Hay que quitarle esa responsabilidad y la función solo debe validar si el pago es correcto.
***
###Código como un libro 
Cuando escribas código, debes pensar en que al leerlo tienes que poder hacerlo como si estuvieras
leyendo un libro, con un orden. Sabiendo que cada función, como cada capítulo en un libro,
está enfocado a lograr un objetivo pequeño y al leer todo el libro habrás entendido 
el objetivo general.
***
###Buenos comentarios
Muchas veces, dentro de las buenas prácticas, el uso de los comentarios se han malinterpretado.
El documento sugiere que no uses comentarios. Pero, muchos reviews que existen del manual han sido 
extremistas al decir que jamás se deben usar.  
Esto no es cierto, lo que dice el documento es que
los comentarios se deben usar siempre y cuando agreguen valor al código.
  
__Ejemplo de comentarios inútiles:__  
```$dayOfMonth = 1; // día del mes```  
```function validateUser($user){ // Valida el usuario```  
```return $value; // retorna el valor```  
```// Cambio de código hecho por Fulano de tal el 08/08/2008```  

En los ejemplos anteriores podemos observar cómo el comentario describe lo que ya hace el código,
lo que, si nombraste tus variables con buenas prácticas, es totalmente innecesario.  
Incluso los comentarios que indican cambios o fechas de cambio y autor son inútiles si, siguiendo
las buenas prácticas, en tu proyecto tienes el versionado del código. Lo repetimos, este tipo de 
comentarios son totalmente inútiles y entorpecen la lectura, corrección de bugs y entendimiento del código.    

__Ejemplo de comentarios útiles:__
```
/* calculateOneByOne calcula los registros de manera individual.
Debe usarse con cuidado ya que el rendimiento de esta función
puede afectar seriamente el proceso de facturación del mes */
function calculateOneByOne() {
```

El comentario anterior es útil porque le informa al desarrollador que hay que utilizarlo
con cuidado ya que tiene un proceso que consume muchos recursos.
Lo importante es que si se decide realizar un comentario, es porque es útil debido a que 
expresa de una mejor manera lo que el código no puede expresar.
***
###Testing
¿No haces test de tu código? Entonces lo estás haciendo mal.  
Hay muchas razones para hacer testing de tu código: ___Refactorización, mejora de rendimiento,
corrección de bugs, etc.___  
Pero para el tema de código limpio, hacer testing te permite dividir tu aplicación de 
forma correcta, haciendo que las funciones/métodos cumplan con una sola función,
te ayuda a desacoplar tus clases/estructuras de acoplamientos innecesarios, etc.

Este punto final es un tema tabú para muchos desarrolladores debido a que se piensa que el testing
consume mucho tiempo que podemos dedicar a desarrollar nuevas funcionalidades o corregir algunas otras,
sin embargo, el probar tu código desde todos los ángulos posibles te ayuda a precisamente a ahorrar
tiempo a futuro corrigiendo bugs o errores. Adicionalmente, te aseguras que el código que estás 
entregando es un producto de calidad, probado y listo para funcionar.
***
###Conclusión
Existen muchas buenas prácticas para mejorar tu rendimiento como desarrollador, entre ellas
es usar un código limpio en tus proyectos para que puedas leerlo fácilmente y para que otros
también lo puedan leer y entender. El aprender a escribir código con las mejores prácticas es
el plus que le otorga a un desarrollador ser un buen desarrollador, ya que, no sólo el beneficio
es para ti, sino que son prácticas que todo un equipo agradecerá. 