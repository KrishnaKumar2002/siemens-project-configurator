import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { ProjectSettings } from './core/models/types';
import { addIcons } from '@siemens/element-ng/icon';
import { elementAlarm, elementDashboard, elementDocument, elementLightRgbBulb, elementLightRgbBulbFilled, elementProject, elementSettings, elementUser, elementCloud, elementUpload, elementHelp } from '@siemens/element-icons';
import { SiApplicationHeaderComponent, SiHeaderActionsDirective, SiHeaderBrandDirective, SiHeaderLogoDirective } from '@siemens/element-ng/application-header';
import { SiCardComponent, SiCardHeaderComponent } from '@siemens/element-ng/card';
import { SiDashboardCardComponent, SiDashboardComponent } from '@siemens/element-ng/dashboard';
import { SiMenuDirective, SiMenuItemComponent } from '@siemens/element-ng/menu';
import { SiSelectComponent, SiSelectSimpleOptionsDirective } from '@siemens/element-ng/select';
import { SiHeaderDropdownComponent, SiHeaderDropdownItemComponent, SiHeaderDropdownTriggerDirective } from '@siemens/element-ng/header-dropdown';
import { SiPillsInputComponent, SiPillsInputEmailDirective } from '@siemens/element-ng/pills-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SiApplicationHeaderComponent,
    SiHeaderActionsDirective,
    SiHeaderBrandDirective,
    SiHeaderLogoDirective,
    SiHeaderDropdownComponent,
    SiHeaderDropdownItemComponent,
    SiHeaderDropdownTriggerDirective,
    SiCardComponent,
    SiCardHeaderComponent,
    SiDashboardCardComponent,
    SiDashboardComponent,
    SiMenuDirective,
    SiMenuItemComponent,
    SiSelectComponent,
    SiSelectSimpleOptionsDirective,
    SiPillsInputComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private get singleToArray(): (v: string) => string[] {
    return (v) => (v ? [v] : []);
  }

  private setArrayToSingle(): (v: string[]) => string {
    return (v) => (v?.[0] ? v[0] : '');
  }

  private themeService = inject(ThemeService);
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  protected readonly icons = addIcons({
    elementAlarm,
    elementDashboard,
    elementDocument,
    elementLightRgbBulb,
    elementLightRgbBulbFilled,
    elementCloud,
    elementProject,
    elementSettings,
    elementUpload,
    elementUser,
    elementHelp
  });

  protected readonly deploymentOptions = [
    { type: 'option' as const, label: 'CRSP EMEA', value: 'crsp-emea' },
    { type: 'option' as const, label: 'CRSP North America', value: 'crsp-na' },
    { type: 'option' as const, label: 'CRSP APAC', value: 'crsp-apac' },
    { type: 'option' as const, label: 'Local', value: 'local' }
  ];

  public activeTheme = this.themeService.activeTheme;
  public currentTime = this.formatTime(new Date());

  public formData: ProjectSettings = {
    clientName: '',
    projectName: '',
    commissionerEmail: '',
    deploymentLocation: '',
    reconfigureConnectivity: 'No',
    alertRecipientEmails: ''
  };

  public submittedData: ProjectSettings | null = null;
  public copied = signal(false);

  public get reconfigureConnectivity(): string {
    return this.formData.reconfigureConnectivity;
  }

  public set reconfigureConnectivity(value: string) {
    this.formData.reconfigureConnectivity = value;
  }

  ngOnInit() {
    this.clockInterval = setInterval(() => {
      this.currentTime = this.formatTime(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  private formatTime(d: Date): string {
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public onSubmit() {
    this.submittedData = { ...this.formData };
  }

  public highlightedJson(): string {
    if (!this.submittedData) return '';
    return JSON.stringify(this.submittedData, null, 2);
  }

  public get clientNamePills(): string[] {
    return this.singleToArray(this.formData.clientName);
  }

  public set clientNamePills(value: string[]) {
    this.formData.clientName = this.setArrayToSingle()(value);
  }

  public get projectNamePills(): string[] {
    return this.singleToArray(this.formData.projectName);
  }

  public set projectNamePills(value: string[]) {
    this.formData.projectName = this.setArrayToSingle()(value);
  }

  public get commissionerEmailPills(): string[] {
    return this.singleToArray(this.formData.commissionerEmail);
  }

  public set commissionerEmailPills(value: string[]) {
    this.formData.commissionerEmail = this.setArrayToSingle()(value);
  }

  public get alertRecipientEmailsPills(): string[] {
    return this.singleToArray(this.formData.alertRecipientEmails);
  }

  public set alertRecipientEmailsPills(value: string[]) {
    this.formData.alertRecipientEmails = this.setArrayToSingle()(value);
  }

  public clearOutput() {
    this.submittedData = null;
    this.copied.set(false);
  }
}
