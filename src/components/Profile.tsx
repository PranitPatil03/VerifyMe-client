import { useEffect, useState } from "react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEmail } from "@/lib/utils";
import PasswordInput from "./PasswordInput";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

interface VerifyPasswordResponse {
  message: string;
  status: boolean;
}

interface PasswordType {
  email: string;
  current_password: string;
  new_password: string;
}

const changePassword = async ({
  email,
  current_password,
  new_password,
}: PasswordType) => {
  try {
    const response = await axios.post<VerifyPasswordResponse>(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/change-password`,
      { email, current_password, new_password }
    );
    return response.data; 
  } catch (error) {
    throw new Error("Error while password change");
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const userData = getEmail();
  const email = userData?.User?.email;
  const firstName = userData?.User?.firstName;
  const lastName = userData?.User?.lastName;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("formData");
    navigate("/");
  };

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handlePasswordChange = async () => {
    try {
      const { status, message } = await changePassword({
        email,
        current_password: currentPassword,
        new_password: newPassword,
      });

      console.log("Line 92", status);

      if (status) {
        toast({
          title: "Password Change Successfully",
          description: message,
        });

        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to change password",
        });
      }
    } catch (error) {
      console.error("Error while changing password:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change password",
      });
    }
  };

  return (
    <div className="flex flex-row md:flex-col items-center justify-center w-full h-screen gap-10 border border-[#3A244A] shadow-lg rounded-lg p-8">
      <Toaster />
      <div className="flex flex-row items-center justify-between w-1/2">
        <h1 className="font-mono font-bold text-5xl text-[#3A244A]">
          Your Profile
        </h1>
        <div className="flex flex-row gap-5 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-10">Setting</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-10 ml-[-8px]" variant="ghost">
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="current_password"
                          className="text-right"
                        >
                          Current Password
                        </Label>
                        <PasswordInput
                          id="current_password"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={handleCurrentPasswordChange}
                          className="col-span-3 border w-full"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new_password" className="text-right">
                          New Password
                        </Label>
                        <PasswordInput
                          id="new_password"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          className="col-span-3 border w-full"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        className="h-10"
                        onClick={handlePasswordChange}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-5 justify-between border p-5 shadow-md rounded-md">
        <div className="flex flex-row justify-between">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="firstName"
              className="font-mono font-semibold text-2xl"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              disabled
              className="bg-grey border w-full"
              value={firstName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="lastName"
              className="font-mono font-semibold text-2xl"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              disabled
              className="bg-grey border w-full"
              value={lastName}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="font-mono font-semibold text-2xl">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              disabled
              className="bg-grey border w-full"
              value={email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
