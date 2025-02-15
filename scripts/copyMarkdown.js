const fs = require("fs");
const path = require("path");
const folderName = "/Users/jeremy.luscombe/learning/master-notes/";
const outputFolderName = "/Users/jeremy.luscombe/websites/jezl-11ty/notes/";
const dirs = fs.readdirSync(folderName);

// Wipe /notes and all its contents

const njkFileData = fs.readFileSync(outputFolderName + "index.njk");


fs.rm(outputFolderName, { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err);
  }

  fs.mkdir(outputFolderName, (err) => {
    if (err) {
      console.log(err);
    }

    fs.writeFileSync(outputFolderName + "index.njk", njkFileData);

    dirs.forEach((dir) => {
      const stats = fs.statSync(folderName + dir);

      if (stats.isDirectory() && dir.split("")[0] !== ".") {
        const files = fs.readdirSync(folderName + dir);
        const imageFiles = fs.readdirSync(folderName + dir + "/assets");

        // Copy all image files over to destination
        imageFiles.forEach((image) => {
          fs.copyFileSync(
            folderName + dir + "/assets/" + image,
            `/Users/jeremy.luscombe/websites/jezl-11ty/assets/${image}`
          );
        });

        const niceDirectoryName = dir.replaceAll("-", " ");

        fs.mkdirSync(outputFolderName + dir);
        fs.cpSync(
          folderName + dir + "/assets",
          outputFolderName + dir + "/assets",
          { recursive: true }
        );

        files.forEach((file) => {
          const totalPath = folderName + dir + "/" + file;
          const fileData = path.parse(totalPath);

          if (fileData.ext === ".md") {
            const niceFileName = fileData.name.replace("-", " ");
            const frontMatter = `---\ntitle: ${niceFileName}\ntags: note\ncourse: ${niceDirectoryName}\nlayout: subs/layout-note.njk\n---`;
            const outputFileName = outputFolderName + dir + "/" + file;
            const newFileData = fs.readFileSync(totalPath, "utf-8");
            const betterFileString = newFileData.replaceAll("assets/", "/assets/" );
            
            fs.writeFile(
              outputFileName,
              frontMatter + "\n" + betterFileString,
              "utf-8",
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        });
      }
    });
  });
});
