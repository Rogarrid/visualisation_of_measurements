# visualisation_of_measurements

## Descripción:

Esta aplicación utiliza **Socket.IO** para permitir que el backend y el frontend se comuniquen en tiempo real. El front-end utiliza React, mientras que el back-end utiliza Node.js y Express.

La **elección de Socket.IO** en este proyecto se debe a:

* La necesidad de mantener una **comunicación instantánea** entre el servidor y el cliente.

* Garantizar una **baja latencia**, lo cual es fundamental para proporcionar una experiencia de usuario dinámica en un entorno donde las partes del coche cambian cada 10 segundos.

* Por la **capacidad escalable**, la cual permite manejar eficientemente múltiples conexiones simultáneas. Lo que es fundamental mirando hacía el futuro para anticipar un posible crecimiento en el número de usuarios concurrentes, asegurando que la aplicación pueda manejar sin problemas un aumento en la carga de trabajo a medida que evoluciona.

Con respecto al backend, éste generá cada 10 segundos partes de automóvil, en este caso se elige de manera aleatoría entre 3, que contienen: características, medidas aleatorias, generadas en el backend, de los controles (x, y, z, diameter) y **valores hardcodeado** de medidas ideales y tolerancia.

La inclusión directa de las medidas ideales y las tolerancias en el código ha sido una elección para simplificar el ejercicio. No obstante, en un contexto más amplio y dinámico del mundo real, en el cual existen numerosos productos y posibles cambios en dichas mediciones, **seguramente sea necesario implementar una base de datos**, ya que de este modo se podría gestionar eficientemente una gran cantidad de información variada y se aseguraría la flexibilidad y escalabilidad ante diversos dispositivos y posibles modificaciones en el tiempo.

Todos estos datos obtenidos en el backend se envían a través de WebSockets a los clientes conectados, y el frontend asigna un status a cada control y feature, calcula la desviación y desvicación out tolerance, y por último representa  todos estos datos en forma de tablas, aplicando colores de estado para cada valor.

En un principio la lógica se realizó integramente en el backend, pero tras analizar esta aplciación iba a ser ejecutafo en un hardware de bajas especificaciones en la fábrica, vi más factible que la **lógica estuviera en el frontend** y de este modo **mejorar el rendimiento**.

## Requisitos Previos

Antes de comenzar, hay que asegurase de tener **Node.js versión 20.9.0** siendo la versión 'Active Long Term Support (LTS)' a fecha de 26 noviembre 2023.

Como consejo utilizar el gestor de node **nvm** para instalar la versión y para cambiar a la que sea necesaria dependiendo del proyecto.

## Configuración del Proyecto:

### Clona el repositorio y entrar a proyecto:

https://github.com/Rogarrid/visualisation_of_measurements.git

cd visualisation_of_measurements

#### Instalación de dependencias en el Backend:

cd backend

npm install

#### Instalación de dependencias en el Frontend:

cd frontend

npm install

### Ejecución de la Aplicación en dos terminales diferentes:

#### Ejecuta el Backend:

cd backend

npm start

#### Ejecuta el Frontend:

cd frontend

npm start

## Uso de la Aplicación

* Si el navegador no se abre de manera automática cuando el frontend arranca, abre tu navegador y visita http://localhost:3000 para acceder a la interfaz de la aplicación.

* Al principio la aplicación sale en blanco hasta pasado 10 segundos.

## Tareas pendientes:

* Tener **medidas ideales y tolerancias diferentes** en cada control de cada feature, ya que en la vida real cada feature seguramente tengan medidas y tolerancias distintas, esto no se hizo para no saturar el backend de información, es algo que veo más viable usando una base de datos.

* Realizar feature que tengan **más de un bloque de controles**, es decir que el bloque x, y, z, diameter se repita más de 1 vez en algunos feature, consiguiendo así más mediciones de 1 mismo feature y una estructura de frontend diferente. Esto se haría indicando en el backend cuantas veces debería de instanciar un bloque de control cada feature, luego se pasaría al frontend y éste se encargaría de renderizarlo.

* Hacer **aplicación responsive**, esto lo haría con la utilización de medidas dinámicas, media queries y con la utilización de bibliotecas como bootstrap. Estas medidas también ayudaría a que la página fuera dinámica con respecto al número de componentes que se rendericen.

## Conclusiones de planteamientos:

* **Dev negativas y positivas:** he concluido que la dev y dev out tol deben tener ambos valores, ya que el valor negativo indica que el feature se ha fabricado con unas medidas inferiores al ideal, siendo el valor positivo lo contrario.

* **Cambios de color del Header:** mi lógica para este factor ha sido lo restrictivo. Ya que se trata de una aplicación que mide piezas que deben de ir calculadas con mucha precisión concluyo que la aplicación no pude ser flexible con respecto al estado de los features, por lo que si uno de los controles da rojo el estado de ese feature dará rojo, si no hay rojo pero hay uno amarillo el estado será amarillo, siendo únicamente verde cuando todos los controles sean verde.




