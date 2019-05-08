import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

/**
 * `<polymer-row-block>` create a row block for each item in the array.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerRowBlock extends PolymerElement {
  static get template() {
    return html`
      <style>
        .row-block {
          padding: 10px;
          margin: 10px;
          background: whitesmoke;
        }

        .row-block-column {
          margin: 10px;
          display: inline-block;
        }

        .row-block-column-title {
          font-weight: bold;
        }
      </style>
      <div class="row-block-title">{{ title }}</div>
      <dom-repeat items="{{columns}}">
        <template>
          <div class="row-block">
            <div class="row-block-column">
              <div class="row-block-column-title">{{ item.title }}</div>
              <div class="row-block-column-value">{{ item.value }}</div>
            </div>
          </div>
        </template>
      </dom-repeat>
    `;
  }
  static get properties() {
    return {
      /**
       * The title of the block of rows.
       * @type {String}
       */
      title: {
        type: String,
        value: "please provide a title"
      },
      /**
       * The array of rows.
       * @type {Array}
       */
      columns: {
        type: Array,
        readOnly: false,
        value: [],
        observer: "_columnsChanged"
      }
    };
  }

  _columnsChanged() {
    console.log("The columns array has changed.");
  }
}

window.customElements.define("polymer-row-block", PolymerRowBlock);
