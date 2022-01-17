// polyfill all actual features - stable ES, web standards and stage 3 ES proposals:
import 'core-js/actual';
// polyfill String.prototype.normalize
import 'unorm';
// polyfill ParentNode.append, Node.remove and others
import 'dom-node-polyfills';
// polyfill window.HTMLTemplateElement
import '@webcomponents/template';

// Polyfill DOMRect constructor used for positioners
(function () {
  if (!window.DOMRect) {
    window.DOMRect = class DOMRect {
      public left: number;
      public right: number;
      public top: number;
      public bottom: number;
      constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0,
      ) {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
      }

      fromRect(_?: DOMRect) {
        return new DOMRect();
      }
    } as any;
  }
})();
