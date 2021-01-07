const fs = require('fs').promises;
var ghpages = require('gh-pages');
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
    await fs.writeFile(`./public/${json.name}.html`, `<script>
    function getMobileOperatingSystem() {
       var userAgent = navigator.userAgent || navigator.vendor || window.opera;
       if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
       {
          return 'iOS';
       }
       else if( userAgent.match( /Android/i ) )
       {
          return 'Android';
       }
       else
       {
          return 'unknown';
       }
    }

    function onLoad(){
       var link = "${json.normal}";
       switch(getMobileOperatingSystem()){
           case 'Android':
           link = "${json.android}";
                break;
           case 'iOS':
           link = "${json.ios}";
                break;
           default:
                break;
        }
        window.location.replace(link);
    }
    window.onload = onLoad;
    </script>`);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

(async function () {
  await readFile();
  data.forEach(obj => {
      openFile(obj);
  });
  ghpages.publish('public', function(err) {});
})();