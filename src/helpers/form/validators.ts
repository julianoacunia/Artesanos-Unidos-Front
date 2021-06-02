
import * as validators from 'redux-form-validators';
import moment from 'moment';

export const acceptance = (params?: any) =>
  validators.acceptance({
    message: 'Es requerido',
    ...params,
  });

export const required = (params?: any) =>
  validators.required({
    message: 'Es requerido',
    ...params,
  });

export const email = (params?: any) => validators.email({
  message: 'Email no valido',
  ...params,
});

export const url = (params?: any) => validators.url({
  message: 'Url no valido',
  ...params,
});

export const length = (params: any) => {
  if (params.min) {
    return validators.length({
      message: `Debe tener al menos ${params.min} caracteres`,
      ...params,
    });
  }
  if (params.max) {
    return validators.length({
      message: `Debe tener como máximo ${params.max} caracteres`,
      ...params,
    });
  }
  if (params.is) {
    return validators.length({
      message: `Debe tener ${params.is || params.min} caracteres`,
      ...params,
    });
  }
};

export const phoneLength = (params: any) => {
  if (params.min) {
    return validators.length({
      message: `No valido`,
      ...params,
    });
  }
};

export const minMaxLength = (params: any) => {
  if (params.min || params.max) {
    return validators.length({
      message: `Debe tener entre ${params.min} y ${params.max} caracteres`,
      ...params,
    });
  }
};

export const format = () => {
  return validators.format({
    with: /^(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?=.*\d)[a-zA-Z\d]/,
    message: 'Formato de contraseña incorrecto'
  });
};

export const confirmation = (params?: any) => validators.confirmation({
  message: 'Deben coincidir los dos valores',
  ...params,
});

export const retentionProfit = (max: number, params?: any) => {
  return validators.numericality({
    '<=': max,
    message: 'Debe ser como máximo el 0.12% del NETO DE LA FACTURA.',
    ...params,
  });
};

export const retentionIIBB = (max: number, params?: any) => {
  return validators.numericality({
    '<=': max,
    message: 'Debe ser como máximo el 0.716% del TOTAL DE LA FACTURA.',
    ...params,
  });
};

export const retentionOther = (max: number, params?: any) => {
  return validators.numericality({
    '<=': max,
    message: 'Debe ser como máximo el 5% del TOTAL DE LA FACTURA.',
    ...params,
  });
};

export const shouldBeLower = (params: number) => {
  return validators.numericality({
    '<': params,
    message: 'Debe ser menor al precio base',
  });
};

export const shouldBePositive = (params?: any) => {
  return validators.numericality({
    '>': 0,
    message: 'Debe ser mayor a 0',
    ...params,
  });
};

export const notAllowBlankSpaces = () => {
  return validators.format({
    with: /^\S*$/,
    message: 'No debe contener espacios en blanco'
  });
};

export const shouldBeLowerCase = () => {
  return validators.format({
    with: /^[^A-Z]*$/,
    message: 'No se permiten mayusculas'
  });
};

export const shouldBeLetter = () => {
  return validators.format({
    with: /^[^0-9?¿=*()$/&%"·+`´çç|@#~½¬{[}ª.,;!^]*$/,
    message: 'Caractér no permitido'
  });
};

export const shouldBeLessThanOrEqualTo = (max: number, params?: any, customMessage?: string) => {
  const message = customMessage ? customMessage : `Debe ser menor o igual a ${(params && params.maxText) || max}`;
  return validators.numericality({
    lessThanOrEqualTo: max,
    message,
    ...params,
  });
};

export const shouldBeGreaterThan = (min: number, params?: any) => {
  return validators.numericality({
    greaterThan: min,
    message: `Debe ser mayor a ${min}`,
    ...params,
  });
};

export const shouldBeNumberOrTwoDecimalsFormat = () => {
  return validators.format({
    with: /^[\d]+(\.[\d]{2})?$/,
    message: 'Debe ser entero o con dos decimales'
  });
};

export const makeShouldBeDate = (format: string, allowBefore: boolean = true) => (date: string) => {
  if (date && !moment(date, format).isValid()) {
    return 'Fecha no valida';
  }
  if (!allowBefore && moment(date, format).isBefore(moment().subtract(1, 'months'))) {
    return 'Fecha expirada';
  }
};

export const lengthExpireDate = (params: any) => {
  return validators.length({
    message: 'Es requerido',
    ...params
  });
};

export const lengthCvv = () => {
  return validators.length({
    message: `Es incorrecto`,
    is: 3
  });
};

export const lengthAreaCode = (params: any) => {
  if (params.min) {
    return validators.length({
      message: `No valido`,
      ...params
    });
  }
};

export default {
  ...validators,
  required,
  email,
  length,
  lengthAreaCode
};