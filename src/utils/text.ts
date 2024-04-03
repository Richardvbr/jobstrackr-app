export function capitalizeFirstLetter(string: string = "") {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFirstCharacter(string: string = "") {
  return string.charAt(0);
}

export function getFirstCharacterCapitalized(string: string = "") {
  return string.charAt(0).toUpperCase();
}

export function truncate(string: string, maxLength?: number) {
  if (!maxLength) {
    return string;
  }

  return string.length > maxLength ? string.slice(0, maxLength - 1) + "…" : string;
}
