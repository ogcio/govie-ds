export type CharacterCountProps = {
  /**
   * The maximum number of characters allowed.
   */
  maxChars: number;
  /**
   * The current length of the text.
   * For controlled components, pass `value.length`.
   * For uncontrolled components with React Hook Form, use `watch('fieldName')?.length ?? 0`.
   */
  currentLength: number;
};
