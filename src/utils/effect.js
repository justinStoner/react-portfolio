/**
 * Check if a prop settings value has changed
 */
export const checkPropChange = (prev, next, value) => {
  return !prev || next.settings[value].value !== prev.settings[value].value;
};
