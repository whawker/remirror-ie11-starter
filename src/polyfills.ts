// polyfill all actual features - stable ES, web standards and stage 3 ES proposals:
import 'core-js/actual';
// polyfill String.prototype.normalize
import 'unorm';

// Polyfill for ParentNode.appends
(function (nodeTypes: Node[]) {
  function isNode(arg: Node | String): arg is Node {
    return arg instanceof Node;
  }

  nodeTypes.forEach(function (type) {
    if (type.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(type, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append(...nodes: (Node | string)[]) {
        const docFrag = document.createDocumentFragment();

        nodes.forEach(function (node) {
          docFrag.appendChild(isNode(node) ? node : document.createTextNode(String(node)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

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
