import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

/**
 * FormTextField
 * Binds a React Hook Form `control` to an MUI TextField, surfacing
 * validation errors automatically. This is the pattern every module
 * form should follow so error display stays consistent.
 *
 * Usage:
 *   <FormTextField name="email" control={control} label="Email" />
 */
function FormTextField({ name, control, label, type = 'text', ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          fullWidth
          size="small"
          margin="normal"
          error={Boolean(error)}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  );
}

export default FormTextField;
