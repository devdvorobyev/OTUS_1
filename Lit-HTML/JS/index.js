import {LitElement, html, css, join} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
/* import {join} from 'lit/directives/join.js'; */

export class MyTree extends LitElement {
  static properties = {
    customTree: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.customTree = {
      "name": 1,
      "items": [{
              "name": 2,
              "items": [{ "name": 3 }, { "name": 4 }]
          }, {
              "name": 5,
              "items": [{ "name": 6 }]
          }]
    };
  }

  // Render the UI as a function of component state
  render() {
    console.log(getTreeLeaves(this.customTree))
    /* return getTreeLeaves(this.customTree) */
    return html`${
      join
    }`
  }
}

customElements.define('my-tree', MyTree);

const getTreeLeaves = (obj, level = 1, renderArray = []) => {

  if( level > 1 && !obj.hasOwnProperty('items')){
    renderArray[renderArray.findIndex(el => el.includes('%s'))] = renderArray[renderArray.findIndex(el => el.includes('%s'))].replace('%s',`<ul><li>${obj.name}</li></ul>`)
  }else if( level > 1 && obj.hasOwnProperty('items')) {
    renderArray[renderArray.findIndex(el => el.includes('%s'))] = renderArray[renderArray.findIndex(el => el.includes('%s'))].replace('%s',`<ul><li>${obj.name} ${'%s'.repeat(obj.items.length)}</li></ul>`)
  }else{
    renderArray.push(`<ul><li>${obj.name} ${'%s'.repeat(obj.items.length)}</li></ul>`);
  }
  

  if ( obj.hasOwnProperty('items') ) {
    obj.items.forEach(element => {
      getTreeLeaves(element, level + 1, renderArray)
    });
  }

  return renderArray;
}
