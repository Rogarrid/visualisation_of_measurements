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

git clone https://github.com/Rogarrid/visualisation_of_measurements.git

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

node app.js

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


# visualisation_of_measurements English version

## Description:

This application uses **Socket.IO** to allow the backend and frontend to communicate in real-time. The front-end uses React, while the back-end uses Node.js and Express.

The **selection of Socket.IO** in this project is due to:

* The need to maintain **instant communication** between server and client.

* Ensuring **low latency**, which is critical to provide a dynamic user experience in an environment where car parts change every 10 seconds.

* Because of the **scalable capacity**, which allows it to efficiently handle multiple concurrent connections. This is essential for the future to anticipate a possible growth in the number of concurrent users, ensuring that the application can smoothly handle an increase in workload as it evolves.

With respect to the backend, it will generate every 10 seconds car parts, in this case randomly chosen from 3, containing: features, random measurements, generated in the backend, of the controls (x, y, z, diameter) and **hardcoded values** of ideal measurements and tolerance.

The direct inclusion of the ideal measurements and tolerances in the code has been a choice to simplify the exercise. However, in a wider and more dynamic real-world context, where there are numerous products and possible changes in these measurements, **it is likely to be necessary to implement a database**, as this would efficiently manage a large amount of varied information and ensure flexibility and scalability to different devices and possible changes over time.

All this data obtained in the backend is sent through WebSockets to the connected clients, and the frontend assigns a status to each control and feature, calculates the deviation and deviation out tolerance, and finally represents all this data in the form of tables, applying status colours for each value.

Initially the logic was done entirely in the backend, but after analysing this application was going to be run on low spec hardware in the factory, I saw more feasible that the **logic was in the frontend** and thus **improve performance**.

## Prerequisites

Before starting, make sure you have **Node.js version 20.9.0** being the 'Active Long Term Support (LTS)' version as of 26 November 2023.

As a tip use the node manager **nvm** to install the version and to switch to the version needed depending on the project.

## Project configuration:

### Clone the repository and enter project:

git clone https://github.com/Rogarrid/visualisation_of_measurements.git

cd visualisation_of_measurements

#### Installation of dependencies in the Backend:

cd backend

npm install

#### Frontend dependencies installation:

cd frontend

npm install

### Running the Application on two different terminals:

#### Run the Backend:

cd backend

node app.js

#### Run the Frontend:

cd frontend

npm start

## Using the Application

* If the browser does not open automatically when the frontend starts, open your browser and visit http://localhost:3000 to access the application interface.

* At first the application goes blank for 10 seconds.

## To-do's:

* Have **ideal measurements and different tolerances** in each control of each feature, because in real life each feature will probably have different measurements and tolerances, this was not done to not saturate the backend of information, it is something that I see more viable using a database.

* Make feature that have **more than one block of controls**, ie the block x, y, z, diameter is repeated more than 1 time in some feature, thus getting more measurements of 1 same feature and a different frontend structure. This would be done by indicating in the backend how many times each feature should instantiate a control block, then it would be passed to the frontend and it would take care of rendering it.

* Make **responsive application**, this would be done with the use of dynamic measures, media queries and with the use of libraries such as bootstrap. These measures would also help to make the page dynamic with respect to the number of components being rendered.

## Conclusions of approaches:

* **Negative and positive devs:** I have concluded that the dev and dev out tol should have both values, as the negative value indicates that the feature has been built with less than ideal measurements, with the positive value being the opposite.

* Header colour changes:** my logic for this factor has been restrictive. Since it is an application that measures parts that must be calculated with great precision, I conclude that the application cannot be flexible with respect to the state of the features, so if one of the controls is red the state of that feature will be red, if there is no red but there is a yellow one the state will be yellow, being only green when all the controls are green.
