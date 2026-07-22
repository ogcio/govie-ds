import type { MitosisNode, MitosisPlugin } from '@builder.io/mitosis';

/**
 * Removes the `ref` prop for non-React targets.
 *
 * The prop-based `ref` pattern (`ref={props.ref}`) exists only to drive
 * React's forwardRef via the `forward-ref` plugin. Other targets don't use it,
 * and Vue's generator hard-fails on it: `ref` is a reserved Vue keyword, so
 * `getProps` throws `avoid using JavaScript keyword as property name: "ref"`
 * the moment it sees `props.ref` and the whole build aborts.
 *
 * This `json.pre` hook strips the `ref` binding/property from every node before
 * generation, so `props.ref` no longer appears in the code getProps scans. Wire
 * it into the Vue and Angular configs only.
 */
const stripRef: MitosisPlugin = () => ({
  json: {
    pre: (json) => {
      // delete ref from props
      delete json.props?.ref;

      // clean up types to avoid ref propagation
      json.types = json.types?.map((x) => x.replaceAll(/^[\t ]*ref\??[\t ]*:[^\n]*\n?/gm, ''));

      // remove ref from properties
      const removeRef = (node: MitosisNode) => {
        if (typeof node === 'object') {
          delete node.bindings?.ref;
          delete node.properties?.ref;
          for (const child of node.children) {
            removeRef(child);
          }
        }
      };

      for (const child of json.children) {
        removeRef(child);
      }
    },
  },
});

export default stripRef;
