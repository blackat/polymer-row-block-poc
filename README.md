# Polymer

Polymer is a lightweight library built on top of the web standards-based Web Components APIs, and makes it easier to build your very own custom HTML elements.

Build reusable UI components, don't implement specific navigation bar or button in different frameworks and for different projects, just define this element once using Polymer, and then reuse it throughout your project or in any future project.

Polymer allows to build custom elements easier.

> Polymer is not a framework. It’s a thin sugar layer to use the web-components.

> The Polymer library is a lightweight sugaring layer on top of the [Web Components APIs](http://webcomponents.org/articles/why-web-components/).

> Polymer is a base class to easily create Web Components.

Features:

- ES6 modules
- Web component polyfills updated
- [Polymer Elements](https://www.webcomponents.org/author/PolymerElements) and the core library converted to ES Modules.

`PolymerElement` is the base class that provides the core API for Polymer's meta-programming features including template stamping, data-binding, attribute deserialization, and property change observation.

## Requirements

Polymer CLI requires at least Node v8.0, consider `nvm` Node Version Manager to install and manage different version of Node.js and npm.

For Windows 10 users read carefully [this part](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli#windows-10) of the guide to enable the Polymer CLI features.
Enable the WSL and a Linux distro, to test open a `cmd` and type `bash`, if everything went well you should see the `bash` prompt.
_Without the WSL the Polymer CLI cannot do its job._

## For impatients

A blank starter project is available on [Stackblitz](https://stackblitz.com/edit/polymer-element-example?file=index.js) to experiment the library instead of installing Polymer tools to locally develop element or application projects.

## Getting started

Install Polymer CLI

```bash
npm install -g polymer-cli
```

### Create an element project

```bash
mkdir polymer-row-block-poc && cd polymer-row-block-poc
polymer init
```

then select `polymer-3-element`, provide and name and a descrption for the new custom element.

The CLI manages both [application](https://polymer-library.polymer-project.org/3.0/docs/tools/create-app-polymer-cli) and [element](https://polymer-library.polymer-project.org/3.0/docs/tools/create-element-polymer-cli) projects, the interest in on the second one.

Once the templating process has finished, project folder structure is the following:

```bash
├── README.md
├── demo/index.html #demo of the element
├── index.html #generated API reference
├── node_modules
├── package-lock.json
├── package.json #configuration file for the Polymwer CLI
├── polymer-row-block.js #element source code
├── polymer.json #configuration of the Polymer CLI
└── test #unit tests for the element
```

Just run `polymer serve` to run a local webserver and visualize the just created element in the demo page.

### Project element CLI commands

```bash
polymer lint
```

Look for syntax errors, missing imports, bad databinding expressions, etc.

```bash
polymer serve
```

Run local webserver, then in the browser use http://127.0.0.1:8081/components/polymer-row-block/demo/ to see the demo element in action.

```bash
polymer build
```

For app only!

### Polymer tools

- [Polymer CLI](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli) to support common scenarios like serving, testing, and initializing new projects from templates.
- [polymer.json](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-json) describes how to configure your Polymer project and its builds.
- [Web Component Tester](https://polymer-library.polymer-project.org/3.0/docs/tools/tests) is an end-to-end testing environment built by the Polymer team.

### Polymer CLI commands

Polymer commands and flavours are intended for both app and element projects [polymer-cli-commands].

## Custom elements concepts

Create an ES6 class, extend the `PolymerElement` class to exploit the full set of features of Polymer and associate the class with the tag name.

```javascript
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

 export class MyPolymerElement extends PolymerElement {
    ...
 }

 customElements.define('my-polymer-element', MyPolymerElement);
```

The import the element

```html
<script type="module" src="./my-polymer-element.js">
```

`PolymerElement` class add some feature to the basic custom element:

- automatic setter and getter for properties and attributes;
- create shadow DOM tree from the element templates;
- data binding, property change observers, and computed properties (data system).

The element class can define callbacks for custom element reactions w.r.t. the [Custom element lifecycle](https://polymer-library.polymer-project.org/3.0/docs/devguide/custom-elements#element-lifecycle).

In addition it is possible to extend an [existing custom element](https://polymer-library.polymer-project.org/3.0/docs/devguide/custom-elements#extending-elements) and [inherit a template from another Polymer element](https://polymer-library.polymer-project.org/3.0/docs/devguide/dom-template#inherit).

## Create a custome element concepts

- Extend `PolymerElement` class or another element class.
- Properties are declared in the static getter `properties` along with their type and optional default values. Property fields will be binded to the template.

```javascript
static get properties() {
    return {
        user: String,
        isHappy: Boolean,
        count: {
            type: Number,
            readOnly: true,
            notify: true
        }
    }
}
```

Based on the `properties` defined and their type, the attributes on the instance matching the same name will be deserialized. An array, for instance, can be passed in JSON format:

```html
<my-element book='{ "title": "Persuasion", "author": "Austen" }'></my-element>
```

Custom deserializers can be provided.

## Shadow DOM and styles

Shadow DOM is a kind of **scoped subtree** inside the custom element. Scoped subtree elements can't be restyled:

```html
<my-header>
  #shadow-root
  <header>
    <h1>
      <button></button>
    </h1>
  </header>
</my-header>
```

**shadow-root** is the root of the subtree, it is attached to the `<my-header>` which is called **shadow host**. Shadow root has a property called `host` that identifis the host element.

The subtree is called **shadow tree**, it is part of component implementation that outside elements should not care about.

Polymer uses a declarative way to add a shadow tree: [DOM template](https://polymer-library.polymer-project.org/3.0/docs/devguide/dom-template). Providing a DOM template for an element implies Polymer attaches a shadow root to the element host and put there the template contents into the shadow tree.

```javascript
static get template() {
    return html`
        <!-- Begin shadow tree -->
        <style>...</style>
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
        <!-- End shadow tree -->
    `;
  }
```

Inner `<style>` element is scoped to the shadow tree, it won't interfere with the rest of the DOM.

### Styling

- Styles inside a shadow tree are scoped, they don't affect elements outside the subtree.
- Styles outside the shadow tree dont'influence selectors inside the shadow tree. Some [inheritable properties](http://www.w3.org/TR/CSS21/propidx.html) inherits down from the host to the shadow tree.

It is then possible to define styles for the host element using the `:host` pseudoclass or the `:host()` functional pseudoclass.

In general _it is not possible_ to directly style anything in the shadow tree using CSS rules defined **outside** except for some inheritable properties.

## Other interesting projects

- [lit-html](https://github.com/Polymer/lit-element/blob/master/README.md) next-generation HTML Templates in JavaScript.
- [lit-element](https://github.com/Polymer/lit-element/blob/master/README.md):
  - A simple base class for creating fast, lightweight web components with lit-html.
  - LitElement uses lit-html to render into the element's Shadow DOM and adds API to help manage element properties and attributes.
  - LitElement reacts to changes in properties and renders declaratively using lit-html

## Polymer element vs. Vanilla custom element

No need to use extends HTMLElement. Polymer extends the element for you.

```javascript
class RowBlock extends HTMLElement { ... }
```

```javascript
class PolymerRowBlock extends PolymerElement { ... }
```

## References

- [Polymer CLI][polymer-cli]
- [Polymer CLI commands][polymer-cli-commands]
- [Polymer app production][build-production]
- [Polymer paper input element example][example-polymer-elements]
- [Polymer, TypeScript and WebPack][polymer-typescript-webpack]
- [Custom Elements Everywhere][custom-elements-everywhere]
- [Polymer bunlder][polymer-bunlder]
- [Browser module support][browser-module-support]

[polymer-cli]: https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli
[polymer-cli-commands]: https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli-commands
[build-production]: https://polymer-library.polymer-project.org/3.0/docs/apps/build-for-production#transforms
[example-polymer-elements]: https://stackblitz.com/edit/polymer-paper-input-examples
[polymer-typescript-webpack]: https://medium.com/@jecelynyeen/polymer-3-0-preview-building-a-mini-card-game-ce8948265fd6
[custom-elements-everywhere]: https://custom-elements-everywhere.com/
[polymer-bunlder]: https://github.com/Polymer/tools/tree/master/packages/bundler
[browser-module-support]: https://caniuse.com/#search=modules
