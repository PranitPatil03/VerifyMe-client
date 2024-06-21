import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { ControllerRenderProps } from "react-hook-form";

interface fieldProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  contactMode: "email" | "phone";
  phoneNumber: string;
}

interface PasswordInputProps {
  field: ControllerRenderProps<fieldProps>;
  placeholder: string;
}

export function PasswordInput({ field, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        {...field}
      />
      <button type="button" onClick={togglePasswordVisibility}>
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
}
