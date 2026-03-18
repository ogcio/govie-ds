import { MitosisComponent, MitosisNode, MitosisPlugin } from '@builder.io/mitosis';

/**
 * Renames props in the Angular generated output on a per-component basis.
 * Components declare a map of { originalName: angularName } in useMetadata —
 * the rename is applied only to the Angular target, leaving React and all
 * other outputs completely unchanged.
 *
 * This is useful in two scenarios:
 *
 * 1. Reserved keywords — Angular's template parser reserves certain words
 *    (e.g. "as" is used for *ngIf="expr as var"), so a prop named "as"
 *    causes a hard compiler error. Renaming it to "tag" fixes this without
 *    touching the React API.
 *
 * 2. Framework-specific semantics — "children" is a special prop in Mitosis
 *    that always maps to <ng-content> in Angular, regardless of its type.
 *    Renaming it to "text" produces a regular @Input() binding instead,
 *    which works correctly inside *ngIf conditional blocks.
 *
 * Usage:
 *   import { useMetadata } from '@builder.io/mitosis';
 *
 *   useMetadata({
 *     angularPropAlias: {
 *       as: 'tag',       // reserved keyword fix
 *       children: 'text' // ng-content fix
 *     }
 *   });
 */

const angularPropAlias: MitosisPlugin = () => ({
  json: {
    pre(component: MitosisComponent) {
      const aliases = component.meta?.useMetadata?.angularPropAlias as Record<string, string> | undefined;

      if (!aliases) {
        return component;
      }

      const typeName = component.propsTypeRef ?? 'Props';

      for (const [from, to] of Object.entries(aliases)) {
        // 1. rename in props
        const props = component.props;
        if (props && from in props) {
          props[to] = props[from];
          delete props[from];
        }

        // 2. rename in types string (generates the Props type definition)
        component.types = component.types?.map((type) =>
          type
            .replaceAll(`  ${from}?:`, `  ${to}?:`)
            .replaceAll(`  ${from}:`, `  ${to}:`)
            .replaceAll(`${typeName}['${from}']`, `${typeName}['${to}']`),
        );

        // 3. rename in exports
        for (const exportEntry of Object.values(component.exports ?? {})) {
          if (exportEntry.code) {
            exportEntry.code = exportEntry.code
              .replaceAll(`${typeName}['${from}']`, `${typeName}['${to}']`)
              .replaceAll(`props.${from}`, `props.${to}`);
          }
        }

        // 4. rename in all node bindings (template expressions)
        const renameInNode = (node: MitosisNode) => {
          for (const binding of Object.values(node.bindings ?? {})) {
            if (binding?.code) {
              binding.code = binding.code
                .replaceAll(`props.${from}`, `props.${to}`)
                .replaceAll(`${typeName}['${from}']`, `${typeName}['${to}']`);
            }
          }
          node.children?.forEach(renameInNode);
        };

        component.children?.forEach(renameInNode);
      }

      return component;
    },
  },
});

export default angularPropAlias;
