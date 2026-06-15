import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { addIcons } from '@siemens/element-ng/icon';
import {
  elementAlarm,
  elementCloud,
  elementCopy,
  elementDashboard,
  elementDocument,
  elementHelp,
  elementLightRgbBulb,
  elementLightRgbBulbFilled,
  elementCheckedFilled,
  elementProject,
  elementSettings,
  elementUpload,
  elementUser,
} from '@siemens/element-icons';

addIcons({
  elementAlarm,
  elementCloud,
  elementCopy,
  elementDashboard,
  elementDocument,
  elementHelp,
  elementLightRgbBulb,
  elementLightRgbBulbFilled,
  elementCheckedFilled,
  elementProject,
  elementSettings,
  elementUpload,
  elementUser,
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
