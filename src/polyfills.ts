import 'core-js/actual';
import 'unorm';

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
