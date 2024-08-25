const minimist = require('minimist');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs/promises');
const { pathExists, createPathIfNotExists } = require('./helpers.js');
const sharp = require('sharp');

console.log(chalk.green('Welcome to Image process version 1.0'));
console.log();

// esta funcion hace el trabajo de processar

async function processImages({ inputDir, outputDir, watermark, resize }) {
  try {
    const inputPath = path.resolve(__dirname, inputDir);
    const outputPath = path.resolve(__dirname, outputDir);
    let watermarkPath;

    if (watermark) {
      watermarkPath = path.resolve(__dirname, watermark);
    }

    //  comprobar que inputdir existe

    await pathExists(inputPath);

    // Crear si no existe outputDir

    await createPathIfNotExists(outputPath);

    //  Si existe watermark color comprobar que el archivo watermark exite

    if (watermark) {
      await pathExists(watermarkPath);
    }

    //  Leer los archivos de inputDir;

    const inputFiles = await fs.readdir(inputPath);
    console.log(inputFiles);

    // Quedarme solo con los archivos ue sean imagenes

    const imageFiles = inputFiles.filter((file) => {
      const validExtensions = ['.jpg', 'jpeg', '.gif', '.png', '.webp'];

      return validExtensions.includes(path.extname(file).toLocaleLowerCase());
    });

    // recorrer toda la lista de archivos y :
    // -- si existe resize redimensionar cada una de las img
    // -- si existe watermark colocar el watermark en la parte inferior derecha de la img
    // -- guarda la img resultante en outputdir

    //creamo la ruta completa de la img

    for (const imageFile of imageFiles) {
      console.log(chalk.blue(`Procesando imagen: ${imageFile}`));

      const imagePath = path.resolve(inputPath, imageFile);

      // cargamos la image en sharp
      const image = sharp(imagePath);

      // si existe resize hacemos el resize

      if (resize) {
        image.resize(resize);
      }
      // si existe watermarkPath colocamos el watermark

      if (watermarkPath) {
        image.composite([
          {
            input: watermarkPath,
            top: 10,
            left: 10,
          },
        ]);
      }

      // guardamos la img con otro nombe en outputPath

      await image.toFile(path.resolve(outputPath, `processed_${imageFile}`));
    }
  } catch (error) {
    console.error(chalk.red(error.message));
    console.error(chalk.red('comprueba que los argumentos sean correctos!'));
    process.exit(1);
  }
}

// procesamos los argumentos

const args = minimist(process.argv.slice(2));
const { inputDir, outputDir, watermark, resize } = args;

// si no existe inputDir o outputDir muesto error, y salgo del programa

if (!inputDir || !outputDir) {
  console.error(
    chalk.red(' Los argumentos --inputDir y --outputDir son OBLIGATORIOS!')
  );
  process.exit(1); // poner el 1 aqui es opcional
}

// si no existe watermark y resize muesto error, y salgo del programa

if (!watermark && !resize) {
  console.error(' Es necesario que exista un argumento --watermark o resize');
  process.exit(1);
}

console.log();
console.log(chalk.blue('Empezamos a procesar las imagenes.....'));

processImages({ inputDir, outputDir, watermark, resize });
