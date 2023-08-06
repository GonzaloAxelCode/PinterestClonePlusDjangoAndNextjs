const fs = require('fs');
const path = require('path');

const basePath = './'; // Ruta de la carpeta raíz
const appsPath = path.join(basePath, 'src', 'apps');
const uiPath = path.join(basePath, 'src', 'ui');
const reduxPath = path.join(basePath, 'src', 'redux');
const utilsPath = path.join(basePath, 'src', 'utils');

const apps = fs.readdirSync(appsPath);

let paths = apps.reduce((acc, app) => {
  const appPath = path.join(appsPath, app);
  const modules = fs.readdirSync(appPath);

  const modulePaths = modules.reduce((moduleAcc, module) => {
    const modulePath = path.join(appPath, module);
    moduleAcc[`@${app}/${module}/*`] = [
      path.join(modulePath, 'services'),
      path.join(modulePath, 'redux'),
      path.join(modulePath, 'hooks'),
      path.join(modulePath, 'models'),
      path.join(modulePath, 'components'),
    ];
    return moduleAcc;
  }, {});

  acc[`@${app}/*`] = [appPath];
  return { ...acc, ...modulePaths };
}, {});

const uiModules = ['components', 'hooks', 'screens', 'context'];
const uiModulePaths = uiModules.reduce((acc, module) => {
  acc[`@ui/${module}/*`] = [path.join(uiPath, module)];
  return acc;
}, {});

paths['@ui/*'] = [uiPath];
paths = { ...paths, ...uiModulePaths };
paths['@redux/*'] = [reduxPath];
paths['@utils/*'] = [utilsPath];

const tsConfigPath = path.join(basePath, 'tsconfig.json');
const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath));

tsConfig.compilerOptions.paths = paths;

fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
