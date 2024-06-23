import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { signUpType} from "@/lib/utils";
interface signUpPasswordInputProps {
  field: ControllerRenderProps<signUpType>;
  placeholder: string;
}

export function PasswordInput({ field, placeholder }: (signUpPasswordInputProps)) {
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
