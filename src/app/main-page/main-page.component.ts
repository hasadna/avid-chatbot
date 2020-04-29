import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ScriptRunnerNew as ScriptRunner, ContentManager  } from 'hatool';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  helpVisible = false;
  moreInfoVisible = false;
  started = false;
  created = false;
  C = {};
  content: ContentManager;
  runner: ScriptRunner;

  constructor(private config: ConfigService,
              private http: HttpClient,
              private api: ApiService,
              public _: I18nService) {
    this.config.config.subscribe((cfg) => {
      this.content = new ContentManager();
      this.runner = new ScriptRunner(this.http, this.content, cfg.locale);
      this.runner.timeout = 250;
      this.C = cfg;
    });
  }

  prepareToSave(record) {
    // filter records fields, to save those that do not start with '_'
    const result = {};
    for (const [key, value] of Object.entries(record)) {
      if (key[0] !== '_') {
        result[key] = value;
      }
    }
    return result;
  }

  ngOnInit() {
    this.config.config.subscribe((config) => {
      this.content.sendButtonText = '';
      this.content.inputPlaceholder = config.inputPlaceholder;
    })
  }

  start() {
    console.log('starting');
    if (this.started || !this.C) {
      return;
    }
    this.started = true;
    this.created = false;
    console.log('here');
    this.runner.run(
      this.C,
      0,
      {},
      (key, value, record) => {}
    ).pipe(
      switchMap(() => {
        return this.api.saveRecord(this.runner.record);
      })
    ).subscribe((res) => {
      console.log('done!', res);
    });
  }
}