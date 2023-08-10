import {Injectable} from '@angular/core';
import {lastValueFrom, Subject} from 'rxjs';
import * as monaco from 'monaco-editor';

@Injectable({
  providedIn: 'root',
})
export class CodeEditorService {
  loaded: boolean = false;
  loadingFinished: Subject<void> = new Subject<void>();
  baseUrl: string = './assets/js/monaco-editor/min/vs';
  //typeDefinitionFileUrlRoot = '/assets/js/monaco-editor-types/';

  private _registeredCompletions: {[language: string]: monaco.languages.CompletionItemProvider} = {};

  constructor() {}

  private finishLoading() {
    this.loaded = true;
    this.loadingFinished.next();

    const editor = this._getMonaco();
    editor.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    });

    //this.loadTypes('javascript', ['types.d.ts']);
  }

  public load() {
    // load the assets
    if (typeof (<any>window).monaco === 'object') {
      this.finishLoading();
      return;
    }

    const onGotAmdLoader: any = async () => {
      // load Monaco
      (<any>window).require.config({paths: {vs: `${this.baseUrl}`}});
      await (<any>window).require(['vs/editor/editor.main'], () => {
        this.finishLoading();
      });
    };

    // load AMD loader, if necessary
    if (!(<any>window).require) {
      const loaderScript: HTMLScriptElement = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = `${this.baseUrl}/loader.js`;
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  /*async loadTypes(language: string, fileNames: string[]) {
    if (language && (language == 'javascript' || language == 'typescript')) {
      const _editor = this._getMonaco();

      for (const fileName of fileNames) {
        const fileUrl = `${this.typeDefinitionFileUrlRoot}/${fileName}`;
        const content = await lastValueFrom(this.http.get(fileUrl, {responseType: 'text'}));
        _editor.languages.typescript[`${language}Defaults`].addExtraLib(content);
      }
    }
  }*/

  public registerLanguage(language: string) {
    if (
      this._getMonaco()
        ?.languages.getLanguages()
        .find((l) => l.id === language)
    ) {
      return;
    }

    this._getMonaco()?.languages.register({
      id: language,
    });
  }

  public setTokenProvider(language: string, provider: monaco.languages.IMonarchLanguage): void {
    this._getMonaco()?.languages.setMonarchTokensProvider(language, provider);
  }

  public registerCompletionItemProvider(language: string, completions: monaco.languages.CompletionItemProvider): void {
    // don't register the same provider twice
    if (this._registeredCompletions[language]) {
      return;
    } else {
      this._getMonaco()?.languages.registerCompletionItemProvider(language, completions);
      this._registeredCompletions[language] = completions;
    }
  }

  private _getMonaco() {
    const monacoObj = (window as any).monaco as typeof monaco;
    return monacoObj;
  }

  public registerCustomTheme(themeName: string, themeData: monaco.editor.IStandaloneThemeData): void {
    this._getMonaco()?.editor.defineTheme(themeName, themeData);
  }
}
