const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
const overwriteContent = `${process.env.FIREBASE_CONTENT}`;
const environment = `${process.env.ENVIRONMENT}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log(`${dir} ${err ? 'does not exist' : 'exists'}`);
    fs.mkdirSync(dir);
  }

  try {
    console.log("Writing environment file");
    fs.writeFileSync(`${dir}/environments/environment.${environment}.ts`, overwriteContent);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
