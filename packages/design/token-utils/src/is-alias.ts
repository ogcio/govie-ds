function createRegex() {
  return new RegExp('\\' + '{' + '([^' + '}' + ']+)' + '\\' + '}', 'g');
}

export function isAlias(value, regexOrOptions = {}) {
  const regex = createRegex();

  if (typeof value === 'string') {
    return regex.test(value);
  }

  if (typeof value === 'object') {
    let hasAlias = false;

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        let alias = isAlias(element, regexOrOptions);

        if (alias) {
          hasAlias = true;
          break;
        }
      }
    }

    return hasAlias;
  }

  return false;
}
