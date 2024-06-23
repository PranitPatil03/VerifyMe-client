/* eslint-disable react-refresh/only-export-components */
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
import { PasswordInput } from "./PasswordInput";
import { SignUpFormSchema, signUpType } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface DataType {
  message: string;
  otp: string;
}

interface SignUpType {
  email: string;
  password: string;
}

interface UserDataType {
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phoneNumber: string;
  email: string;
}

export const sendOtp = async (email: string): Promise<void> => {
  try {
    const response = await axios.post<DataType>(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/send-mail`,
      { email }
    );
    const data = response.data;
    console.log(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<signUpType | undefined>();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    console.log("Line 361", values);
    localStorage.setItem("formData", JSON.stringify(values));
    await signup(values);
    await sendOtp(values.email);
    navigate("/otp");
  }

  const erros = form.formState.errors;
  console.log(erros);

  console.log("Line 45", userData);

  const signup = async (formData: SignUpType): Promise<void> => {
    try {
      const response = await axios.post<UserDataType>(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/signup`,
        formData
      );
      const data = response.data;
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
    <div className="md:mx-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
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
                  <PasswordInput field={field} placeholder="Set Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <PasswordInput field={field} placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="contactMode"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-3 text-[#C4BCC9]">
                <FormLabel className="flex font-mono text-base">
                  Contact Mode
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal">Mail</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phone" />
                      </FormControl>
                      <FormLabel className="font-normal">Phone</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#3A244A] text-mono text-base text-white hover:bg-[#3A244A] rounded-lg"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
