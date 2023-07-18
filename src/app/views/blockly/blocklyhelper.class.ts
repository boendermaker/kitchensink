import {AudakoBlocklyComponent} from '@app/AudakoCore/components/audako-blockly/audako-blockly.component';
import * as Blockly from 'blockly/core';
import {Block} from 'blockly/core';
import {CustomBlock} from '@app/AudakoCore/components/audako-blockly/models/custom-blocks';
import {EntitySelectField} from '@app/AudakoCore/components/audako-blockly/models/custom-fields';
import {ITheme} from 'blockly/core/theme';
import {ElementRef} from '@angular/core';

export class AudakoBlocklyHelper {
  public static componentRef: AudakoBlocklyComponent;
  private static customBlocks: CustomBlock[] = [];
  private static blocks: Block[] = [];
  private static fields: EntitySelectField[] = [];
  private static workspace: Blockly.WorkspaceSvg;
  private static blocklyContainer: ElementRef;
  private darkTheme: ITheme;

  public static init(componentRef: AudakoBlocklyComponent): void {
    this.componentRef = componentRef;
  }

  //#################################################################//

  public static addBloklyContainer(blocklyContainer: ElementRef): void {
    this.blocklyContainer = blocklyContainer;
  }

  //#################################################################//

  public static setDarkTheme(): void {
    if (!Blockly.Themes['Dark']) {
      Blockly.Themes['Dark'] = Blockly.Theme.defineTheme('dark', <any>{
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#1e1e1e',
          toolboxBackgroundColour: 'blackBackground',
          toolboxForegroundColour: '#fff',
          flyoutBackgroundColour: '#252526',
          flyoutForegroundColour: '#ccc',
          flyoutOpacity: 1,
          scrollbarColour: '#797979',
          insertionMarkerColour: '#fff',
          insertionMarkerOpacity: 0.3,
          scrollbarOpacity: 0.4,
          cursorColour: '#d0d0d0',
          blackBackground: '#333',
        },
      });
    }

    this.workspace.setTheme(Blockly.Themes['Dark']);
    this.workspace.refreshTheme();
  }

  //#################################################################//

  public static setDefaultTheme(): void {
    this.workspace.setTheme(Blockly.Themes.Classic);
    this.workspace.refreshTheme();
  }

  //#################################################################//

  public static getBlocklyContainer(): ElementRef {
    return this.blocklyContainer;
  }

  //#################################################################//

  public static addCustomBlocks(customBlocks: CustomBlock[]) {
    this.customBlocks = [...this.customBlocks, ...customBlocks];
  }

  //#################################################################//

  public static getCustomBlocks(): CustomBlock[] {
    return this.customBlocks;
  }

  //#################################################################//

  public static addBlocks(blocks: Block[]) {
    this.blocks = [...this.blocks, ...blocks];
  }

  //#################################################################//

  public static getBlocks(): Block[] {
    return this.blocks;
  }

  //#################################################################//

  public static addField(field: EntitySelectField): void {
    this.fields = [...this.fields, field];
  }

  //#################################################################//

  public static getFieldByID(id: string): EntitySelectField {
    return this.fields.find((f) => f.id === id);
  }

  //#################################################################//

  public static addWorkspace(workspace: Blockly.WorkspaceSvg) {
    this.workspace = workspace;
  }

  //#################################################################//

  public static getRootWorkspaceBlocks(): Block[] {
    return this.workspace.getTopBlocks(true);
  }

  //#################################################################//

  public static getAllWorkspaceBlocks(): Block[] {
    return this.workspace.getAllBlocks(true);
  }

  //#################################################################//

  public static refreshWorkspace(): void {
    this.workspace.render();
  }

  //#################################################################//

  public static getWorkspaceState(parseJSON?: boolean): string {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    return parseJSON ? JSON.parse(xmlText) : xmlText;
  }

  //#################################################################//

  public static setWorkspaceState(state: string, stringifyJSON?: boolean): void {
    console.log('WORKSPACE STATE ', state);
    const xmlDom = Blockly.utils.xml.textToDom(stringifyJSON ? JSON.stringify(state) : state);
    this.workspace.clear();
    Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
  }

  //#################################################################//

  public static saveWorkspaceToLocalStorage(): void {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    console.log('WORKSPACESTATE SAVE', xmlText);
    //const state = Blockly.serialization.workspaces.save(this.workspace);
    //console.log('WORKSPACE STATE SAVE ', state);
    //localStorage.setItem('audako-blockly-workspace', JSON.stringify(state));
    localStorage.setItem('audako-blockly-workspace', JSON.stringify(xmlText));
  }

  //#################################################################//

  public static loadWorkspaceFromLocalStorage(): void {
    const xmlText = localStorage.getItem('audako-blockly-workspace');
    const xmlDom = Blockly.utils.xml.textToDom(JSON.parse(xmlText));
    console.log('WORKSPACESTATE LOAD', xmlText);
    //const state = localStorage.getItem('audako-blockly-workspace');
    //console.log('WORKSPACE STATE LOAD ', state);
    this.workspace.clear();
    //Blockly.serialization.workspaces.load(JSON.parse(state), this.workspace);
    Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
  }

  //#################################################################//

  public static loadWorkspaceFromStaticXML(xmlText: string): void {
    const xmlDom = Blockly.utils.xml.textToDom(xmlText);
    this.workspace.clear();
    Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
  }

  //#################################################################//

  public static handleScrollbars(): void {
    this.workspace.addChangeListener((event) => {
      //console.log(event);
      if (event.type === 'toolbox_item_select') {
        this.toggleToolboxFlyoutScrollbar();
      }
      if (event.type === 'trashcan_open') {
        this.toggleTrashFlyoutScrollbar();
      }
      this.showWorkspaceScrollbars(false);
    });
  }

  //#################################################################//
  //Show Flyout scrollbar only when flyout is visible
  public static toggleToolboxFlyoutScrollbar(): void {
    //Wait a bit until Blockly changed the style attribute
    setTimeout(() => {
      const flyoutCollection: HTMLCollection =
        this.blocklyContainer.nativeElement.getElementsByClassName('blocklyFlyout');
      const scrollbarCollection: HTMLCollection =
        this.blocklyContainer.nativeElement.getElementsByClassName('blocklyFlyoutScrollbar');

      if (flyoutCollection[1].getAttribute('style').includes('display: none')) {
        scrollbarCollection[1].setAttribute('opacity', '0');
      } else {
        scrollbarCollection[1].setAttribute('opacity', '1');
      }
    }, 25);
  }

  //#################################################################//
  //Show flyout scroll only when trash flyout is visible
  public static toggleTrashFlyoutScrollbar(): void {
    //Wait a bit until Blockly changed the style attribute
    setTimeout(() => {
      const flyoutCollection: HTMLCollection =
        this.blocklyContainer.nativeElement.getElementsByClassName('blocklyFlyout');
      const scrollbarCollection: HTMLCollection =
        this.blocklyContainer.nativeElement.getElementsByClassName('blocklyFlyoutScrollbar');

      if (flyoutCollection[0].getAttribute('style').includes('display: none')) {
        scrollbarCollection[0].setAttribute('opacity', '0');
      } else {
        scrollbarCollection[0].setAttribute('opacity', '1');
      }
    }, 25);
  }

  //#################################################################//

  public static showWorkspaceScrollbars(state: boolean): void {
    const mainScrollbarCollection: HTMLCollection = this.blocklyContainer.nativeElement.getElementsByClassName(
      'blocklyMainWorkspaceScrollbar'
    );
    const mainScrollbars = Array.from(mainScrollbarCollection);
    const opacityState = state ? 'opacity: 1' : 'opacity: 0';

    if (state !== undefined) {
      mainScrollbars.forEach((scrollbar: Element) => {
        scrollbar.setAttribute('style', opacityState);
      });
    }
  }

  //#################################################################//

  public static blocksRecursive(): any[] {
    const startBlock: Block = this.getRootWorkspaceBlocks()[0];
    const blockTree: any[] = [];

    const recursiveTree = (child: Block) => {
      let count = 0;

      const children = child.getChildren(true);

      if (children) {
        console.log('children');
        count++;

        for (var i = 0; i < children.length; i++) {
          //for each children
          const surroundParent = children[i].getSurroundParent();

          blockTree.push({
            id: children[i].id,
            type: children[i].type,
            next: children[i].nextConnection,
            block: children[i],
            parentid: surroundParent.id,
            parenttype: surroundParent.type,
            parentblock: surroundParent,
          });

          recursiveTree(children[i]);
        }
      }
    };

    recursiveTree(startBlock);

    const arrayToTree = (arr, parentid) =>
      arr
        .filter((item) => item.parentid === parentid)
        .map((child) => ({...child, children: arrayToTree(arr, child.id)}));

    const recursiveBlocktree: any[] = arrayToTree(blockTree, startBlock.id);

    console.log('RTREE ', recursiveBlocktree);

    return recursiveBlocktree;
  }

  //#################################################################//

  public static makeTreeXml(arr) {
    let level = 0;
    let blockcount = 0;
    let xml = '';

    const getStatement = (type: string) => {
      console.log(type);
      const types = {
        operator_and_block: 'Und',
        operator_or_block: 'Oder',
        operator_not_block: 'Nicht',
        signal_condition_block: '',
      };
      return types[type];
    };

    xml = `<xml><block type="start_block" id="kq?(9D73.D:WUHsr@1#z\" deletable="false" x="157" y="641">`;
    xml += `<statement name="Start_input">`;

    const makeTree = (arr) => {
      blockcount++;

      for (let i = 0; i < arr.length; i++) {
        blockcount++;

        xml += arr[i].next.targetConnection !== null ? '<next>' : null;
        xml += `<block type="${arr[i].type}" id="${arr[i].id}">${level} / ${blockcount}`;
        xml += getStatement(arr[i].type) !== '' ? `<statement name="${getStatement(arr[i].type)}">` : '';

        if (arr[i].children.length > 0) {
          makeTree(arr[i].children);
          xml += '</statement>';
        } else if (i === arr.length - 1) {
          level++;
        }

        xml += '</block>';
        xml += arr[i].next.targetConnection === null ? '</next>' : null;
      }
    };

    makeTree(arr);

    xml += '</statement></block></xml>';

    return xml;
  }

  //#################################################################//

  public static getJavascript(): string {
    const arr = this.blocksRecursive();
    let level = 0;
    let count = 0;
    let code = '';

    const typeToInstruction = {
      start_block: '&&',
      operator_and_block: '&&',
      operator_or_block: '||',
      operator_not_block: '!',
    };

    //Not used yet, but can be used to identify instruction blocks
    const isInstruction = {
      start_block: false,
      operator_and_block: true,
      operator_or_block: true,
      operator_not_block: true,
    };

    const isCondition = {
      signal_condition_block: true,
      counter_condition_block: true,
      data_source_connection_failure_condition_block: true,
      data_connection_failure_condition_block: true,
      timebased_trigger_block: true,
      change_rate_monitoring_block: true,
      minimum_monitoring_block: true,
      maximum_monitoring_block: true,
      period_maximum_monitoring_block: true,
      plausibility_monitoring_block: true,
      position_monitoring_block: true,
      difference_monitoring_block: true,
      recording_failure_condition_block: true,
    };

    //code += 'function evaluate() { ';

    const makeCode = (arr, lastInstruction: string) => {
      //code += level === 0 ? '( ' : '';

      for (let i = 0; i < arr.length; i++) {
        const block = arr[i]?.block;
        const blockType = block?.type.toLowerCase();
        const blockData = block?.data ? JSON.parse(arr[i]?.block?.data) : undefined;
        const hasChildren = arr[i]?.children.length > 0;
        const lastConditionBlockIndex = arr.findLastIndex((f) => isCondition[f?.block?.type]);
        const instruction = typeToInstruction[blockType ?? ''];

        //Special case for NOT block
        code += isInstruction[blockType] && instruction === '!' ? ' !' : '';

        if (isCondition[blockType]) {
          code += i === 0 ? ' ( ' : '';
          code += `isConditionRaised('${blockData?.value ?? ''}')`;
          code += i === lastConditionBlockIndex ? ' ) ' : '';
        } else if (!hasChildren) {
          code += '()';
        }

        //code += isInstruction[blockType] && i === arr.length-1 ? ' ) ' : '';

        //If children blocks available rerun makeCode() and pass last instruction
        if (hasChildren) {
          level++;
          makeCode(arr[i].children, instruction);
        }

        //i === arr.length - 1 ? level++ : null;
        i === arr.length - 1 ? ' ) ' : '';

        //If Previous Block is a NOT block then connect all children with &&
        lastInstruction === '!' ? (lastInstruction = '&&') : '';

        i < arr.length - 1 ? (code += ` ${lastInstruction} `) : '';
      }

      //code += ` )` ;
    };

    //Set lastInstruction to define the operator for the root block, leave blank if startblock shouldn't do conditions
    //If lastinstruction is blank str '' a first operator block should enclose all other blocks
    makeCode(arr, typeToInstruction['start_block']);

    //code += ' }';

    console.log(code);

    return code;
  }

  //#################################################################//

  public static validateGeneratedCode(): boolean {
    return true;
  }

  //#################################################################//

  public static makeBlockID(): string {
    return (Math.random() + 1).toString(36).substring(20);
  }

  //#################################################################//

  public static closeToolboxFlyout(): void {
    const flyout = this.workspace.getFlyout();
    const flyoutElement = flyout['svg'];

    console.log('FLYOUT ', flyout, flyoutElement);
  }
}
