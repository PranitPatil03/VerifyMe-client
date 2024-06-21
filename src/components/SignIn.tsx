import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginIcon } from "@/assets";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <>
      <div className="w-full md:h-screen flex items-center justify-center border overflow-hidden min-h-screen shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full">
            <img src={LoginIcon} alt="image" className="object-fill" />
          </div>
          <div className="w-full flex items-center justify-start">
            <Card className="w-[350px] md:w-[500px]">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-baseline">
                    <h1 className="font-montserrat text-[#3A244A] text-4xl font-extrabold">
                      Fill what we know{" "}
                      <span className="text-[#D72638] font-montserrat text-4xl font-extrabold">
                        !
                      </span>
                    </h1>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SignInForm></SignInForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
