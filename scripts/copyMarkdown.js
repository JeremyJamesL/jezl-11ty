const nunFileString = `---\nlayout: /layouts/layout.njk\ntitle: All notes\ndescription: A list of all notes\n---\n{% set coursesArr = [] %}\n\n{% for item in collections.coursesList %}\n\t{% if coursesArr.indexOf(item.data.course) == -1 %}\n\t\t{% set coursesArr = (coursesArr.push( item.data.course ), coursesArr) %}\n\t{% endif %}\n{% endfor %}\n\n<div class=\"container\">\n\n<ul class=\"list-disc pl-3 font-body font-light\">\n{% for theCourse in coursesArr %}\n\t<li class=\"mb-3\">\n\t\t<h2 class=\"mb-2\">{{ theCourse }}</h2>\n\n\t\t{% for item in collections.coursesList %}\n\t\t\t{% if item.data.course == theCourse %}\n\t\t\t<h3>\n\t\t\t\t<a href=\"{{ item.url }}\" class=\"text-[18px] mr-2 visited:text-red-600 no-underline\">\n\t\t\t\t\t{{ item.data.title }}\n\t\t\t\t</a>\n\t\t\t</h3>  \n\t\t\t{% endif %}\n\t\t{% endfor %}\n\t</li>\n{% endfor %}\n</ul>\n\n</div> \n`

const fs = require("fs");
const path = require("path");
const folderName = "/Users/jeremy.luscombe/learning/master-notes/";
const outputFolderName = "/Users/jeremy.luscombe/websites/jezl-11ty/notes/";
const dirs = fs.readdirSync(folderName);

// Wipe /notes and all its contents

fs.rm(outputFolderName, { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err);
  }

  fs.mkdir(outputFolderName, (err) => {
    if (err) {
      console.log(err);
    }

    fs.writeFileSync(outputFolderName + "index.njk", nunFileString);

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
            const newFileData = fs.readFileSync(totalPath);

            fs.writeFile(
              outputFileName,
              frontMatter + "\n" + newFileData,
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
