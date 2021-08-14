# Modificación del modelo question generator construido por Amontgomerie
## Descripción
Este proyecto es una modificación de otro modelo (https://github.com/AMontgomerie/question_generator), la estructura es para desplegar en GCloud run, es el proyecto que se utilizó para el despliege en GCloud Run, además, se modificó la salida del algoritmo para consumir los datos en GQuestions a través de la API creada en este proyecto con Flask.

El archivo main.py contiene el código para crear la API con Flask

## Ejecución
- Instalar los requeriments.txt.
- Ejecutar el archivo download_models.py con las indicaciones que se encuentran comentadas en el código (Descargará aprox. 1.3GB en el directorio raíz).
- Utilizar Docker para crear una imagen (contenedor) y ejecutarla.
- Realizar llamadas API al enlace que sale al ejecutar el contenedor (el procesamiento se realiza de manera local).