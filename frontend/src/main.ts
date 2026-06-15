import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { addIcons } from '@siemens/ix-icons';
import {
  iconAnalysis,
  iconProjectConfiguration,
  iconAlarmBell,
  iconProjectSettings,
  iconAbout,
  iconAboutFilled,
  iconSuccess,
  iconSuccessFilled,
  iconError,
  iconErrorFilled,
  iconConnectionSuccess,
  iconCloud,
  iconProjects,
  iconBulbFilled,
  iconBulb,
  iconCopy,
  iconCopyFilled,
  iconDocument,
  iconDocumentFilled,
  iconCloudUpload,
  iconCheckboxes,
  iconHierarchy,
  iconStar,
  iconAdd,
} from '@siemens/ix-icons/icons';

// Register ALL icons used in the application (required since @siemens/ix-icons v3+)
addIcons({
  'analysis': iconAnalysis,
  'project-configuration': iconProjectConfiguration,
  'alarm-bell': iconAlarmBell,
  'project-settings': iconProjectSettings,
  'about': iconAbout,
  'about-filled': iconAboutFilled,
  'success': iconSuccess,
  'success-filled': iconSuccessFilled,
  'error': iconError,
  'error-filled': iconErrorFilled,
  'connection-success': iconConnectionSuccess,
  'cloud': iconCloud,
  'projects': iconProjects,
  'bulb-filled': iconBulbFilled,
  'bulb': iconBulb,
  'copy': iconCopy,
  'copy-filled': iconCopyFilled,
  'document': iconDocument,
  'document-filled': iconDocumentFilled,
  'cloud-upload': iconCloudUpload,
  'checkboxes': iconCheckboxes,
  'hierarchy': iconHierarchy,
  'star': iconStar,
  'add': iconAdd,
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
