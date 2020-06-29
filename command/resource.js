const fs = require("fs");
const log = require("chalk");
const METHOD = "resource";

const READPATH = "./command/default/";

var WRITEPATH = "./src/v2/controllers/";
var WRITEPATHROUTE = "./src/v2/routes/";
var WRITEPATHPROVIDER = "./src/v2/providers/";
var WRITEPATHVALIDATE = "./src/v2/middlewares/validations/";

const FILETYPE = "js";

const READFILENAME_CTRL = "controller.txt";
const READFILENAME_PROVIDER = "provider.txt";
const READFILENAME_ROUTE = "route.txt";
const READFILENAME_VALIDATE = "validate.txt";

const DECODETYPE = "utf8";

try {
  var error = {
    status: true,
    data: {},
  };
  var fileName = process.argv[process.argv.length - 1];
  const commands = fileName.split("/");

  const model = fileName.split(":");
  if (model.length < 2) {
    console.log(log.red("resource: npm run resource {name}:{modelname}"));
    return;
  }

  fileName = model[0];
  modelName = model[1];

  var controllerName = fileName + "_controller";
  var controllerProvider = fileName + "_provider";
  var validateName = fileName + "_validator";
  var routeName = fileName;

  console.log(controllerName);

  if (commands.length > 1) {
    fileName = commands[1];
    // connect string to get correct path
    WRITEPATH = WRITEPATH.concat(commands[0] + "/");
    if (!fs.existsSync(WRITEPATH)) {
      fs.mkdirSync(WRITEPATH);
    }
  }

  // check if file name is already exist or not for Controller
  if (fs.existsSync(WRITEPATH + controllerName + "." + FILETYPE)) {
    error.status = false;
    error.data.controller =
      METHOD.toLowerCase() + `: CONTROLLER ${fileName} is already exist`;
  }

  if (fs.existsSync(WRITEPATHROUTE + fileName + "." + FILETYPE)) {
    error.status = false;
    error.data.route =
      METHOD.toLowerCase() + `: ROUTE: ${fileName} is already exist`;
  }

  if (fs.existsSync(WRITEPATHPROVIDER + fileName + "." + FILETYPE)) {
    error.status = false;
    error.data.route =
      METHOD.toLowerCase() + `: PROVIDER: ${fileName} is already exist`;
  }

  if (fs.existsSync(WRITEPATHVALIDATE + validateName + "." + FILETYPE)) {
    error.status = false;
    error.data.route =
      METHOD.toLowerCase() + `: VALIDATE: ${fileName} is already exist`;
  }

  if (!error.status) {
    console.log(error);
    return;
  }

  const CREATE = ({
    readPath,
    readFileName,
    fileName,
    modelName = null,
    writePath,
    name,
  }) => {
    fs.readFile(readPath + readFileName, DECODETYPE, (err, data) => {
      if (err) console.log(log.red(err));
      else {
        data = data.replace(/ReplaceName/g, fileName);
        if (modelName !== null) {
          data = data.replace(/ModelName/g, modelName);
        }
        fs.writeFile(`${writePath}${name}.${FILETYPE}`, data, (err) => {
          if (err) console.log(log.red(err));
          console.log(
            log.green(`${METHOD.toLowerCase()}: ${fileName} created`)
          );
        });
      }
    });
  };

  // controller
  CREATE({
    readPath: READPATH,
    readFileName: READFILENAME_CTRL,
    fileName: fileName,
    modelName: modelName,
    writePath: WRITEPATH,
    name: controllerName,
  });

  // provider
  CREATE({
    readPath: READPATH,
    readFileName: READFILENAME_PROVIDER,
    fileName: fileName,
    modelName: modelName,
    writePath: WRITEPATHPROVIDER,
    name: controllerProvider,
  });

  // route
  CREATE({
    readPath: READPATH,
    readFileName: READFILENAME_ROUTE,
    fileName: fileName,
    writePath: WRITEPATHROUTE,
    name: fileName,
  });

  // validate
  CREATE({
    readPath: READPATH,
    readFileName: READFILENAME_VALIDATE,
    fileName: fileName,
    writePath: WRITEPATHVALIDATE,
    name: validateName,
  });
} catch (error) {
  console.log(log.red(METHOD.toLowerCase() + `: ` + error.message));
}
