import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {CodeEditorService} from './codeviewer.service';
import {first} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import type * as monaco from 'monaco-editor';
export type MonacoEditorCustomizationArgs = {
  editor: monaco.editor.IStandaloneCodeEditor;
};

const singleLineEditorOptions: Partial<monaco.editor.IStandaloneEditorConstructionOptions> = {
  wordWrap: 'off',
  lineNumbers: 'off',
  lineDecorationsWidth: 0,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  scrollbar: {
    horizontal: 'hidden',
    vertical: 'hidden',
  },
  hideCursorInOverviewRuler: true,
  glyphMargin: false,
  folding: false,
  scrollBeyondLastColumn: 0,
  find: {addExtraSpaceOnTop: false, autoFindInSelection: 'never', seedSearchStringFromSelection: 'never'},
};


@UntilDestroy()
@Component({
  selector: 'app-codeviewer',
  templateUrl: './codeviewer.component.html',
  styleUrls: ['./codeviewer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CodeviewerComponent),
    },
  ],
})
export class CodeviewerComponent implements AfterViewInit, ControlValueAccessor {
  _editor: any;
  touched = false;
  isDisabled = false;
  editorContent$ = new BehaviorSubject<string>('');

  @ViewChild('editorContainer', {static: true}) _editorContainer: ElementRef;

  @Input() language: string = 'json';
  @Input() label: string;
  @Input() loading: string;
  @Input() theme: string;
  @Input() singleLine = false;

  @Input() border = '1px solid #999';
  @Input() set disabledcontrol(value: string) {
    this.isDisabled = true;
  }

  constructor(public monacoEditorService: CodeEditorService) {
  }

  ngAfterViewInit(): void {
    this.loadMonacoEditor();
    this.monacoEditorService.loadingFinished.pipe(first(), untilDestroyed(this)).subscribe(() => {
      const monacoObj = (window as any).monaco as typeof monaco;
      console.log('Creating editor with language:' + this.language);
      this._editor = monacoObj.editor.create(this._editorContainer.nativeElement, {
        value: [''].join('\n'),
        language: this.language,
        theme: this.theme,
        automaticLayout: true,
        minimap: {enabled: false},
        ...(this.singleLine ? singleLineEditorOptions : {}),
      });

      if (this.isDisabled) {
        this._editor.updateOptions({readOnly: true});
      }

      this._editor.onDidChangeModelContent(() => {
        this.onChanged(this._editor.getModel().getValue());
      });

      this.editorContent$.pipe(untilDestroyed(this)).subscribe((sourceCode: string) => {
        console.log('Setting editor content', sourceCode);
        this._editor.getModel().setValue(sourceCode ?? '');
      });
    });
  }

  loadMonacoEditor(): void {
    setTimeout(() => {
      this.monacoEditorService.load();
    }, 1000);
  }

  onChanged = (sourceCode: any) => {};
  onTouched = () => {};

  registerOnChange(onChange: any) {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouched: any) {}

  onUpdateSourceCode() {}

  onRemove() {}

  writeValue(sourceCode: string) {
    this.editorContent$.next(sourceCode);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
