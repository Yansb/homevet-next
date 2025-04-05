export const phoneMask = (value: string | undefined) => {
  if (!value) return "";

  const cleanedValue = value.replace(/[\D]/g, "");

  if (cleanedValue.length <= 10) {
    return cleanedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return cleanedValue
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const cepMask = (value: string | undefined) => {
  if (!value) return "";

  const cleanedValue = value.replace(/[\D]/g, "");

  return cleanedValue.replace(/(\d{5})(\d)/, "$1-$2");
};
