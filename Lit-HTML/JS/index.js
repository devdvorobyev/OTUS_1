import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

const customTree = {
  "name": 1,
  "items": [{
          "name": 2,
          "items": [{ "name": 3 }, { "name": 4 }]
      }, {
          "name": 5,
          "items": [{ "name": 6 }]
      }]
};

export class MyTree extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties

  }

  // Render the UI as a function of component state
  render() {
    return html`<ul>${customTree.name}<my-leaf></my-leaf><ul>`
  }
}

customElements.define('my-tree', MyTree);


export class Leaf extends LitElement {
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

  }

  // Render the UI as a function of component state
  render() {
    return html`<ul>${customTree.items ? html`${customTree.name}<my-tree></my-tree>` : customTree.name}<ul>`
  }
}

customElements.define('my-leaf', Leaf);