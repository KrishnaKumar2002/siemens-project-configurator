import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ── Siemens Element-NG components ──────────────────────────────────────────
import { SiApplicationHeaderComponent } from '@siemens/element-ng/application-header';
import {
  SiNavbarVerticalComponent,
  NavbarVerticalItem
} from '@siemens/element-ng/navbar-vertical';
import { SiCardComponent, SiCardHeaderComponent } from '@siemens/element-ng/card';
import { SiIconComponent } from '@siemens/element-ng/icon';
import {
  SiSelectComponent,
  SiSelectSimpleOptionsDirective,
  SelectOption
} from '@siemens/element-ng/select';
import {
  SiFormItemComponent,
  SiFormContainerComponent
} from '@siemens/element-ng/form';
import { SiLoadingButtonComponent } from '@siemens/element-ng/loading-spinner';
import { SiInlineNotificationComponent } from '@siemens/element-ng/inline-notification';

import { ProjectSettings } from './core/models/types';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SiApplicationHeaderComponent,
    SiNavbarVerticalComponent,
    SiCardComponent,
    SiCardHeaderComponent,
    SiIconComponent,
    SiSelectComponent,
    SiSelectSimpleOptionsDirective, // selector: si-select[options] — required for [options] binding
    SiFormItemComponent,
    SiFormContainerComponent,
    SiLoadingButtonComponent,
    SiInlineNotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  public activeTheme = this.themeService.activeTheme;
  public currentTime = this.formatTime(new Date());

  // ── Sidebar navigation (Element data-driven API: NavbarVerticalItem) ────
  public navItems: NavbarVerticalItem[] = [
    {
      label: 'Console Dashboard',
      icon: 'element-home-filled',
      type: 'link',
      href: '#'
    } as NavbarVerticalItem,
    {
      label: 'Deployment Configs',
      icon: 'element-settings',
      type: 'link',
      href: '#'
    } as NavbarVerticalItem,
    {
      label: 'Notifications',
      icon: 'element-alarm',
      type: 'link',
      href: '#'
    } as NavbarVerticalItem,
    {
      label: 'Global Settings',
      icon: 'element-settings-outline',
      type: 'link',
      href: '#'
    } as NavbarVerticalItem
  ];

  // ── Select option arrays (type: 'option' + value required by SelectOption<T>) ─
  public locationOptions: SelectOption<string>[] = [
    { type: 'option', value: 'crsp-emea',    label: '🌍  crsp-emea — EMEA' },
    { type: 'option', value: 'crsp-na',      label: '🌎  crsp-na — North America' },
    { type: 'option', value: 'crsp-apac',    label: '🌏  crsp-apac — Asia Pacific' },
    { type: 'option', value: 'crsp-release', label: '🧪  crsp-release — Release Candidate' },
    { type: 'option', value: 'local',        label: '🖥️  local — Local Dev' }
  ];

  public connectivityOptions: SelectOption<string>[] = [
    { type: 'option', value: 'No',  label: 'No — Use deployment defaults' },
    { type: 'option', value: 'Yes', label: 'Yes — Override connectivity' }
  ];

  // ── Form model ──────────────────────────────────────────────────────────
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

  // ── Lifecycle ───────────────────────────────────────────────────────────
  ngOnInit() {
    this.clockInterval = setInterval(() => {
      this.currentTime = this.formatTime(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }

  private formatTime(d: Date): string {
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public onSubmit(form: any) {
    if (!form?.valid) return;
    this.submittedData = { ...this.formData };
  }

  public highlightedJson(): string {
    if (!this.submittedData) return '';
    return JSON.stringify(this.submittedData, null, 2)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'json-number';
          if (/^"/.test(match))              cls = /:$/.test(match) ? 'json-key' : 'json-string';
          else if (/true|false/.test(match)) cls = 'json-bool';
          else if (/null/.test(match))       cls = 'json-null';
          return `<span class="${cls}">${match}</span>`;
        }
      );
  }

  public copyToClipboard() {
    if (!this.submittedData) return;
    navigator.clipboard.writeText(JSON.stringify(this.submittedData, null, 2))
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
  }

  public clearOutput() {
    this.submittedData = null;
    this.copied.set(false);
  }
}
