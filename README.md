# visualisation_of_measurements
- Desarrollar: instalar node (sus pasos) y todo lo que necesite anteriormente
- Versión de node usada y por qué
- Dependencias intaladas y por qué: en backend además de node: express, cors, socket.io, nodemon
- desviaciones negativas por qué?
-por qué lógica en frontend y no en backend.
- por qué harcodeado la tolerancia y la medida ideal.
- porq qué usado socket.
- lo que me ha faltado y cómo lo hubiera hecho.

Descripción:

Esta aplicación utiliza Socket.IO para permitir que el backend y el frontend se comuniquen en tiempo real. El front-end utiliza React, mientras que el back-end utiliza Node.js y Express.

La elección de Socket.IO y WebSockets en este proyecto se debe a:

La necesidad de mantener una comunicación instantánea entre el servidor y el cliente.
Garantizar una baja latencia, lo cual es fundamental para proporcionar una experiencia de usuario dinámica en un entorno donde las partes del coche cambian cada 10 segundos.
Por la capacidad escalable, la cual permite manejar eficientemente múltiples conexiones simultáneas. Lo que es fundamental mirando hacía el futuro para anticipar un posible crecimiento en el número de usuarios concurrentes, asegurando que la aplicación pueda manejar sin problemas un aumento en la carga de trabajo a medida que evoluciona.

Con respecto al backend, éste generá cada 10 segundos partes de automóvil, en este caso se elige de manera aleatoría entre 3, que contienen: características, medidas aleatorias, generadas en el backend, de los controles (x, y, z, diameter) y valores hardcodeado de medidas ideales y tolerancia.

La inclusión directa de las medidas ideales y las tolerancias en el código ha sido una elección para simplificar el ejercicio. No obstante, en un contexto más amplio y dinámico del mundo real, en el cual existen numerosos productos y posibles cambios en dichas mediciones, seguramente sea necesario implementar una base de datos, ya que de este modo se podría gestionar eficientemente una gran cantidad de información variada y se aseguraría la flexibilidad y escalabilidad ante diversos dispositivos y posibles modificaciones en el tiempo.

Todos estos datos obtenidos en el backend se envían a través de WebSockets a los clientes conectados, y el frontend asigna un status a cada control y feature, calcula la desviación y desvicación out tolerance, y por último representa  todos estos datos en forma de tablas, aplicando colores de estado para cada valor.

En un principio la lógica se realizó integramente en el backend, pero luego tras ver que el hardware en el que se iba a utilizar este software era limitado se vió más factible que la lógica estuviera en el frontend, y de este modo se mejorar el rendimiento.



