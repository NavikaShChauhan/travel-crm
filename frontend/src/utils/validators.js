import * as yup from 'yup';

/**
 * Reusable Yup field fragments. Compose these inside each module's
 * own `constants/*.schema.js` (or `utils/`) rather than duplicating
 * validation rules across forms.
 *
 * Example:
 *   import { requiredString, emailField } from '@utils/validators';
 *   const schema = yup.object({
 *     name: requiredString('Name'),
 *     email: emailField,
 *   });
 */

export const requiredString = (label = 'This field') =>
  yup.string().trim().required(`${label} is required`);

export const emailField = yup
  .string()
  .trim()
  .email('Enter a valid email address')
  .required('Email is required');

export const phoneField = yup
  .string()
  .trim()
  .matches(/^[+]?[\d\s-]{7,15}$/, 'Enter a valid phone number')
  .required('Phone number is required');

export const positiveNumber = (label = 'This field') =>
  yup
    .number()
    .typeError(`${label} must be a number`)
    .positive(`${label} must be greater than zero`)
    .required(`${label} is required`);

export const futureDate = (label = 'Date') =>
  yup
    .date()
    .typeError(`${label} must be a valid date`)
    .min(new Date(), `${label} must be in the future`)
    .required(`${label} is required`);
