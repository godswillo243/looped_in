import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface InputFieldProps<TValues extends FieldValues> {
  type?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  label?: string;
  className?: string;
  register: UseFormRegister<TValues>;
  error?: FieldError | undefined;
  disabled?: boolean;
  validation?: RegisterOptions<TValues, Path<TValues>>;
  isPassword?: boolean;
}

function InputField<TValues extends FieldValues>({
  register,
  error,
  label,
  validation,
  isPassword,
  ...props
}: InputFieldProps<TValues>) {
  const [fieldType, setFieldType] = useState<string>(props.type || "text");

  return (
    <Field className="flex flex-col gap-1 relative">
      <FieldLabel htmlFor={props.name}>{label}</FieldLabel>
      <Input
        id={props.name}
        {...props}
        {...register(props.name as Path<TValues>, { ...validation })}
        type={fieldType}
      />

      {isPassword && (
        <span className="flex gap-2 p-2" onClick={() => {}}>
          <Checkbox
            id="password-toggle"
            className="size-4"
            onCheckedChange={(checked) =>
              setFieldType(() => (checked ? "text" : "password"))
            }
          />
          <Label htmlFor="password-toggle">Show Password</Label>
        </span>
      )}

      {error && <p className="text-destructive">{error.message}</p>}
    </Field>
  );
}
export default InputField;
