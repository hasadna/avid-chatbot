import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ScriptRunnerNew as ScriptRunner, ContentManager  } from 'hatool';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  helpVisible = false;
  moreInfoVisible = false;
  started = false;
  created = false;
  content: ContentManager;
  runner: ScriptRunner;

  constructor(private config: ConfigService,
              private http: HttpClient,
              private api: ApiService,
              @Inject(LOCALE_ID) private locale: string) {
    this.content = new ContentManager();
    this.runner = new ScriptRunner(this.http, this.content, this.locale);
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
a
  ngOnInit() {
    this.config.config.subscribe((config) => {
      this.content.sendButtonText = '';
      this.content.inputPlaceholder = config.inputPlaceholder;
    })
  }

  start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.created = false;
    this.runner.run(
      'assets/script.json',
      0,
      {},
      (key, value, record) => {}
    ).pipe(
      switchMap(() => {
        return this.api.saveRecord(this.runner.record);
      })
    ).subscribe(() => {

    });
  }

}
