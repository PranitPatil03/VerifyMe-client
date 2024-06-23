import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void; 
  className:string
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  className
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between w-[250px]">
      <Input
        id={id}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className= {`border w-full  ${className}`}
        value={value}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="ml-2 p-1"
      >
        {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
