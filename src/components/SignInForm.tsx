import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema, loginType } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { LoginPasswordInput } from "./LoginPasswordInput";

interface UserDataType {
  user: {
    email: string;
    accessToken: string;
    firstName: string;
    lastName: string;
  };
}

const SignInForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | undefined>();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(userData);

  const erros = form.formState.errors;
  console.log("Line 37", erros);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await login(values);
    console.log(values);
    navigate("/profile");
  }

  const login = async (formData: loginType): Promise<void> => {
    try {
      const response = await axios.post<UserDataType>(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/login`,
        formData
      );
      const data = response.data;
      console.log("Line 571", data);
      setUserData(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="mx-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input placeholder="Enter Mail" type="mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <LoginPasswordInput
                    field={field}
                    placeholder="Set Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#3A244A] text-mono text-base text-white hover:bg-[#3A244A] rounded-lg"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="w-full border-2 border-[#3A244A] bg-white text-mono text-base text-[#3A244A] hover:bg-transparent rounded-lg"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
