# Remirror IE11 Starter

This repo contains results of a spike to see if Remirror can be used on IE11.

## Scope

The Remirror code base does not support IE11, however the spike was to see if polyfills can be applied to make this possible.

## TLDR

In short, **yes**. Initial signs are very positive, applying 5 polyfills and a tweak to `browserslist` config resulted in a working editor. A small caveat however, you will need to implement your own CSS as Remirror relies heavily on CSS variables which do not work in IE11.

[The result](https://whawker.github.io/remirror-ie11-starter/)

## The long version: Issues encountered and their resolutions.

### Invalid syntax

IE11 does not support arrow function expressions (i.e. `() => {}`), so these need to be compiled down to ES5 compatible functions. [A small tweak](https://github.com/whawker/remirror-ie11-starter/blob/main/package.json#L41) to `browserslist` configuration to add `ie >= 11` did the trick.

### Various unsupported array/string methods

Next were the usual suspects - `Object doesn't support property or method 'find'` etc etc. For these, I used [`core-js`](https://github.com/zloirock/core-js) to polyfill the missing methods.

```js
// polyfill all actual features - stable ES, web standards and stage 3 ES proposals:
import `core-js/actual`;
```

### ParentNode.append and Node.remove

Additionally, there are the DOM methods, `ParentNode.append` and `Node.remove` which are not supported in IE11.

These have been polyfilled using [`dom-node-polyfills`](https://www.npmjs.com/package/dom-node-polyfills).

### String.prototype.normalize

Next is a String method I never knew existed, `String.prototype.normalize` which returns the Unicode Normalization Form of the string - this is used in Remirror for input sanitization.

This is not provided by `core-js`, so instead I've used the [`unorm`](https://github.com/walling/unorm) as a polyfill.

```js
// polyfill String.prototype.normalize
import 'unorm';
```

### window.HTMLTemplateElement

Remirror's React Table plugin uses `jsx-dom` for convenience - however this uses `HTMLTemplateElement` in some of it's logic.

Multiple polyfills exist for this use case, some which polyfill the entire custom elements API.

I have chosen a minimal polyfill, [`@webcomponents/template`](https://www.npmjs.com/package/@webcomponents/template) which seems work nicely.

### DOMRect

A `DOMRect` describes the size and position of a rectangle. It is used by Remirror's positioners and table plugins.

Full [geometry polyfills](https://github.com/jarek-foksa/geometry-polyfill) exist, however we only require the `DOMRect` constructor, which I have taken from [Remirror's Jest polyfills](https://github.com/remirror/remirror/blob/main/packages/jest-remirror/src/jsdom-polyfills.ts#L11-L35).

### CSS

Remirror relies heavily on CSS variables, which cannot be used in IE11 and no workaround exists. A copy of Remirror's `all.css` with CSS variables removed and replaced with their actual values [exists in the repo](https://github.com/whawker/remirror-ie11-starter/blob/main/src/App.css).

## Applying the polyfills

All the above polyfills should be applied before importing Remirror. All of them are present in the [`polyfills.ts` file](https://github.com/whawker/remirror-ie11-starter/blob/main/src/polyfills.ts), this is [imported as the first line of `index.tsx`](https://github.com/whawker/remirror-ie11-starter/blob/main/src/index.tsx#L1).
