/* eslint-disable no-param-reassign */

export function addOptionalLabelText(node) {
  node.on('created', () => {
    const oldSchema = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      const isRequired = node.props.parsedRules.some(
        (rule) => rule.name === 'required'
      );

      if (!isRequired) {
        sectionsSchema.label = {
          children: [
            {
              $el: 'div',
              children: [
                {
                  $el: 'div',
                  children: ['$label'],
                },
                {
                  $el: 'div',
                  attrs: {
                    class: 'optional-label-text',
                  },
                  children: ['Opcijsko'],
                },
              ],
            },
          ],
        };
      }

      return oldSchema(sectionsSchema);
    };
  });
}
