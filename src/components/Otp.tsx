import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getEmail } from "@/lib/utils";
import { sendOtp } from "./SignUpForm";

interface VerifyOtpResponse {
  status: string;
}

const Otp: React.FC = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const userEmail: string | null = getEmail();

  useEffect(() => {
    if (status) {
      navigate("/login");
    }
  }, [status, navigate]);

  if (!userEmail) {
    return null;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      await verifyOtp(userEmail, otpString);
    } else {
      setMessage("Please enter a valid 6-digit OTP");
    }
  };

  const handleResend = async () => {
    setMessage("OTP resent to your email");
    await sendOtp(userEmail);
  };

  const verifyOtp = async (email: string, userOtp: string) => {
    const data = {
      email,
      userOtp,
    };

    try {
      const response = await axios.post<VerifyOtpResponse>(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/verify-otp`,
        data
      );
      const responseData = response.data;
      setStatus(responseData.status);
    } catch (error) {
      console.log("Error verifying OTP:", error);
      setStatus("");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden md:bg-gray-50 py-10 md:py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 md:shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {userEmail}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full gap-2">
                  {otp.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#3A244A]"
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        id={`otp-${index}`}
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="bg-[#3A244A] flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 border-none text-white shadow-sm font-mono text-xl"
                    >
                      Verify OTP
                    </button>
                  </div>
                  {message && (
                    <div className="text-center text-sm font-medium text-gray-500">
                      {message}
                    </div>
                  )}
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <button
                      type="button"
                      className="flex flex-row items-center text-[#3A244A]"
                      onClick={handleResend}
                    >
                      Resend
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
