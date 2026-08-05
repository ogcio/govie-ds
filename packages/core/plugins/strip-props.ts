import type { MitosisNode, MitosisPlugin } from '@builder.io/mitosis';

/**
 * Removes the named props from a component before generation.
 *
 * The `json.pre` hook erases every trace of each prop in a single pass over
 * the component tree — the prop declaration, its line in the props type, and
 * the bindings/properties carrying it on every node — so `props.<name>` never
 * reaches the generator. Works for any prop name and any target; wire it into
 * a target's config with the props that target must not see.
 */
const stripProps =
  (...names: string[]): MitosisPlugin =>
  () => ({
    json: {
      pre: (json) => {
        for (const name of names) {
          // delete the prop itself
          delete json.props?.[name];

          // clean up types so the prop doesn't leak into generated interfaces
          json.types = json.types?.map((x) => x.replaceAll(typeLine(name), ''));
        }

        // remove the props from node bindings/properties
        const removeProps = (node: MitosisNode) => {
          if (typeof node === 'object') {
            for (const name of names) {
              delete node.bindings?.[name];
              delete node.properties?.[name];
            }
            for (const child of node.children) {
              removeProps(child);
            }
          }
        };

        for (const child of json.children) {
          removeProps(child);
        }
      },
    },
  });

const typeLine = (name: string): RegExp => new RegExp(String.raw`^[\t ]*${name}\??[\t ]*:[^\n]*\n?`, 'gm');

export default stripProps;
