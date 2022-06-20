import { sentence as s } from '@formkit/i18n';

export const ui = {
  remove: 'Odstrani',
  removeAll: 'Odstrani vse',
  incomplete: 'Nekatera polja niso pravilno izpolnjena.',
  submit: 'Oddaj',
  noFiles: 'Ni izbranih datotek',
};

export const validation = {
  //   accepted({ name }) {
  //     return `Please accept the ${name}.`;
  //   },
  //   date_after({ name, args }) {
  //     if (Array.isArray(args) && args.length) {
  //       return `${s(name)} must be after ${date(args[0])}.`;
  //     }
  //     return `${s(name)} must be in the future.`;
  //   },
  //   alpha({ name }) {
  //     return `${s(name)} can only contain alphabetical characters.`;
  //   },
  //   alphanumeric({ name }) {
  //     return `${s(name)} can only contain letters and numbers.`;
  //   },
  //   alpha_spaces({ name }) {
  //     return `${s(name)} can only contain letters and spaces.`;
  //   },
  //   date_before({ name, args }) {
  //     if (Array.isArray(args) && args.length) {
  //       return `${s(name)} must be before ${date(args[0])}.`;
  //     }
  //     return `${s(name)} must be in the past.`;
  //   },
  //   between({ name, args }) {
  //     if (isNaN(args[0]) || isNaN(args[1])) {
  //       return `This field was configured incorrectly and can’t be submitted.`;
  //     }
  //     const [a, b] = order(args[0], args[1]);
  //     return `${s(name)} must be between ${a} and ${b}.`;
  //   },
  //   confirm({ name }) {
  //     return `${s(name)} does not match.`;
  //   },
  //   date_format({ name, args }) {
  //     if (Array.isArray(args) && args.length) {
  //       return `${s(name)} is not a valid date, please use the format ${args[0]}`;
  //     }
  //     return 'This field was configured incorrectly and can’t be submitted';
  //   },
  //   date_between({ name, args }) {
  //     return `${s(name)} must be between ${date(args[0])} and ${date(args[1])}`;
  //   },
  email: 'Vnesite veljaven e-poštni naslov.',
  //   ends_with({ name, args }) {
  //     return `${s(name)} doesn’t end with ${list(args)}.`;
  //   },
  //   is({ name }) {
  //     return `${s(name)} is not an allowed value.`;
  //   },
  //   length({ name, args: [first = 0, second = Infinity] }) {
  //     const min = Number(first) <= Number(second) ? first : second;
  //     const max = Number(second) >= Number(first) ? second : first;
  //     if (min == 1 && max === Infinity) {
  //       return `${s(name)} must be at least one character.`;
  //     }
  //     if (min == 0 && max) {
  //       return `${s(name)} must be less than or equal to ${max} characters.`;
  //     }
  //     if (min && max === Infinity) {
  //       return `${s(name)} must be greater than or equal to ${min} characters.`;
  //     }
  //     return `${s(name)} must be between ${min} and ${max} characters.`;
  //   },
  //   matches({ name }) {
  //     return `${s(name)} is not an allowed value.`;
  //   },
  //   max({ name, node: { value }, args }) {
  //     if (Array.isArray(value)) {
  //       return `Cannot have more than ${args[0]} ${name}.`;
  //     }
  //     return `${s(name)} must be less than or equal to ${args[0]}.`;
  //   },
  //   mime({ name, args }) {
  //     if (!args[0]) {
  //       return 'No file formats allowed.';
  //     }
  //     return `${s(name)} must be of the type: ${args[0]}`;
  //   },
  //   min({ name, node: { value }, args }) {
  //     if (Array.isArray(value)) {
  //       return `Cannot have less than ${args[0]} ${name}.`;
  //     }
  //     return `${s(name)} must be at least ${args[0]}.`;
  //   },
  not({ name, node: { value } }) {
    if (value && String(value) === '0') {
      return `Polje je obvezno.`;
    }
    return `${s(name)} ne sprejme vrednosti "${value}".`;
  },
  //   number({ name }) {
  //     return `${s(name)} must be a number.`;
  //   },
  required() {
    return `Polje je obvezno.`;
  },
  //   starts_with({ name, args }) {
  //     return `${s(name)} doesn’t start with ${list(args)}.`;
  //   },
  //   url() {
  //     return `Please include a valid url.`;
  //   },
};
