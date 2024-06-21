import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { SignUpIcon } from "@/assets";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full md:h-screen flex items-center justify-center border overflow-hidden min-h-screen shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full">
            <img src={SignUpIcon} alt="image" className="object-fill" />
          </div>
          <div className="w-full flex items-center justify-start">
            <Card className="w-[350px] md:w-[500px]">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-baseline">
                    <h1 className="font-montserrat text-[#3A244A] text-4xl font-extrabold">
                      Let us know{" "}
                      <span className="text-[#D72638] font-montserrat text-4xl font-extrabold">
                        !
                      </span>
                    </h1>
                    <Button
                      variant="outline"
                      className="font-montserrat font-semibold underline border-none hover:bg-transparent text-lg"
                      onClick={() => navigate("/login")}
                    >
                      Sign{" "}
                      <span className="text-[#D72638] ml-1 underline">In</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SignUpForm></SignUpForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
