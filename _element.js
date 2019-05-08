import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `polymer-row-block`
 * just a poc on polymer
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerRowBlock extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polymer-row-block',
      },
    };
  }
}

window.customElements.define('polymer-row-block', PolymerRowBlock);
