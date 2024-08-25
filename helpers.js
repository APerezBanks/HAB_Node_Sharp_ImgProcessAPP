const fs = require('fs/promises');

// funcion que comprueba que una ruta existe en disco

async function pathExists(path) {
  try {
    await fs.access(path);
  } catch {
    throw new Error(`la ruta ${path} no existe`);
  }
}

// funcion que crea uan ruta en disco si no existe

async function createPathIfNotExists(path) {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
}

module.exports = {
  pathExists,
  createPathIfNotExists,
};
