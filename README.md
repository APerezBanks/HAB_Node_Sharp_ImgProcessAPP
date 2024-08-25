En este mini-proyecto veremos:

Cómo crear un entorno de node e instalar paquetes con npm

Cómo gestionar los argumentos del programa de una forma avanzada

Cómo gestionar posibles errores

Cómo poner mensajes en la consola de una forma más “colorista” que la habitual.

Cómo manejar rutas de ficheros de forma segura

Cómo comprobar si existen ficheros y directorios en disco (y como crearlos en caso de que sea necesario)

Cómo leer los contenidos e un directorio

y sobre todo, cómo procesar y manipular imágenes.

Para eso usaremos varios paquetes de npm (y algún core module) que os pongo aquí para que podáis consultar la documentación:

minimist para gestionar argumentos del programa

chalk para mostrar mensajes en la consola en color

path y fs para gestionar rutas y ficheros

sharp para manipular imágenes

Como siempre, recomendamos que le echéis un ojo a la documentación para ver como funcionan en profundidad.

# Process images

Comando:

node process.js --inputDir=images --outputDir=result --watermark=hab.png --resieze=500

--inputDir=images (indicamos el directorio de la img que queremos procesar )
--outputDir=result (indicamos el directorio donde queremos que se guarden las img procesadas)
--watermark=hab.png ( el archivo que queremos usar como marca de agua)
--resize=500 (cambiar tamanio a 500px)

# Modulos

- minimist ( ayuda a procesar los argumentos de una forma mas facil)

-chalk ( permite cambiar el color de los mensajes en la terminal)

-sharp ( permite trabajar con las imagenes)
# node-and-sharp-Actividad.-HAB
# HAB_Node_Sharp_ImgProcessAPP
