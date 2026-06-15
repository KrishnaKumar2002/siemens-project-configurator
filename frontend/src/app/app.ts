import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IxApplication,
  IxApplicationHeader,
  IxContent,
  IxButton,
  IxIcon,
  IxInput,
  IxSelect,
  IxSelectItem,
  IxHelperText,
  IxMenu,
  IxMenuItem,
  IxTextValueAccessorDirective,
  IxSelectValueAccessorDirective
} from '@siemens/ix-angular/standalone';
import { ProjectSettings } from './core/models/types';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IxApplication,
    IxApplicationHeader,
    IxContent,
    IxButton,
    IxIcon,
    IxInput,
    IxSelect,
    IxSelectItem,
    IxHelperText,
    IxMenu,
    IxMenuItem,
    IxTextValueAccessorDirective,
    IxSelectValueAccessorDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  public activeTheme = this.themeService.activeTheme;
  public currentTime = this.formatTime(new Date());

  // Form Model
  public formData: ProjectSettings = {
    clientName: '',
    projectName: '',
    commissionerEmail: '',
    deploymentLocation: '',
    reconfigureConnectivity: 'No',
    alertRecipientEmails: ''
  };

  // Output state
  public submittedData: ProjectSettings | null = null;
  public copied = signal(false);

  ngOnInit() {
    // Live clock update every second
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
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public onSubmit() {
    this.submittedData = { ...this.formData };
    console.log('Config submitted:', JSON.stringify(this.formData, null, 2));
  }

  public highlightedJson(): string {
    if (!this.submittedData) return '';
    const raw = JSON.stringify(this.submittedData, null, 2);
    // Syntax highlight: strings, numbers, booleans, null, keys
    return raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'json-number';
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? 'json-key' : 'json-string';
          } else if (/true|false/.test(match)) {
            cls = 'json-bool';
          } else if (/null/.test(match)) {
            cls = 'json-null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
  }

  public copyToClipboard() {
    if (this.submittedData) {
      navigator.clipboard.writeText(JSON.stringify(this.submittedData, null, 2))
        .then(() => {
          this.copied.set(true);
          setTimeout(() => this.copied.set(false), 2000);
        })
        .catch(err => console.error('Copy failed:', err));
    }
  }

  public clearOutput() {
    this.submittedData = null;
    this.copied.set(false);
  }
}
