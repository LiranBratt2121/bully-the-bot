const { exec } = require("child_process");

function getRandomName(pythonScript) {
  return new Promise((resolve, reject) => {
    exec(`python ${pythonScript}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        reject(error);
      } else {
        try {
          const output = JSON.parse(stdout.trim());
          resolve(output);
        } catch (parseError) {
          console.error(`Error parsing JSON: ${parseError}`);
          reject(parseError);
        }
      }
    });
  });
}

module.exports = { getRandomName };
