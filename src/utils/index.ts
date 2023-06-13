export const cnpjFinalMask = (value: string | undefined): string => {
  if (value) {
    let r = value.replace(/\D/g, '');
    if (r.length > 7) {
      r = r.replace(/^(\d{4})(\d{2}).*/, '$1-$2');
    } else if (r.length > 4) {
      r = r.replace(/^(\d{4})(\d{0,2}).*/, '$1-$2');
    }
    return r;
  }
  
  return '';
};