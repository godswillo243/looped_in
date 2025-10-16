import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

interface InputFieldProps<TValues extends FieldValues> {
  type?: string;
  placeHolder?: string;
  required?: boolean;
  name: string;
  label: string;
  className?: string;
  register: UseFormRegister<TValues>;
  error: FieldError | undefined;
  disabled?: boolean;
  validation?: RegisterOptions<TValues, Path<TValues>>;
}

function InputField<TValues extends FieldValues>(
  props: InputFieldProps<TValues>
) {
  const {
    error,
    label,
    type,
    placeHolder,
    required,
    disabled,
    name,
    validation,
  } = props;

  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeHolder}
        required={required}
        disabled={disabled}
        {...props.register(name as Path<TValues>, { ...validation })}
      />
      {error && <p className="text-destructive">{error.message}</p>}
    </Field>
  );
}
export default InputField;
