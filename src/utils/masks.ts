export const applyCpfMask = (text: string): string => {
  text = text.replace(/(\d{3})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return text;
};

export const applyPhoneMask = (text: string): string => {
  text = text.replace(/(\d{2})(\d)/, "($1) $2");
  text = text.replace(/(\d{5})(\d)/, "$1-$2");
  return text;
};

export const applyCepMask = (text: string): string => {
  text = text.replace(/(\d{5})(\d)/, "$1-$2");
  return text;
};

export const applyCnpjMask = (text: string): string => {
  text = text.replace(/(\d{2})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d)/, "$1/$2");
  text = text.replace(/(\d{4})(\d)/, "$1-$2");
  return text;
};

export const applyDateMask = (text: string): string => {
  text = text.replace(/(\d{2})(\d)/, "$1/$2");
  text = text.replace(/(\d{2})(\d)/, "$1/$2");
  return text;
};

export const applyRgMask = (text: string): string => {
  text = text.replace(/(\d{2})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d)/, "$1.$2");
  text = text.replace(/(\d{3})(\d)/, "$1-$2");
  return text;
};

export const applyNumberMask = (text: string): string => {
  return text.replace(/\D/g, "");
};
