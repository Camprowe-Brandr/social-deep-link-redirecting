const fs = require('fs').promises;
let data;

async function readFile() {
  try {
    let json = await fs.readFile('./data/data.json');
    data = JSON.parse(json);
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function openFile(json) {
  try {
    await fs.writeFile(`./public/${json.name}.html`, 'name,111quantity,price21');
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

(async function () {
  await readFile();
  data.forEach(obj => {
      openFile(obj);
  });
})();