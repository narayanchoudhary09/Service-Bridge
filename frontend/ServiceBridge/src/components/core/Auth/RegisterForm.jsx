import { Select, SelectItem, Input, Button, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
//import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import CountryCode from "../../../data/countrycode.json";
import { endpoints } from "../../../services/api";
import { postData } from "../apiHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const { REGISTER_API_WORKER, REGISTER_API_USER } = endpoints;

function RegisterForm() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneno: {
      countryCode: "",
      number: "",
    },
  });
  const [submitting, setsubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { fullName, email, password, phoneno } = formData;

  const handleOnChange = (e, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: e.target.value,
    }));
  };

  const workerRegister = useMutation({
    mutationKey: ["addDetailsWorker"],
    mutationFn: async (data) => {
      return await postData(REGISTER_API_WORKER, {}, data);
    },
    onSuccess: (data) => {
      console.log(data.data);
      toast('Registered succcessfully', {
        position: "top-right",
        duration: 5000,
      });
      navigate("/");
    },
    onError: (error) => {
      console.error("Worker registration error:", error);
    },
  });

  const userRegister = useMutation({
    mutationKey: ["addDetailsUser"],
    mutationFn: async (data) => {
      console.log(data);
      return await postData(REGISTER_API_USER, {}, data);
    },
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/");
      setsubmitting(false);

    },
    onError: (error) => {
      console.error("User registration error:", error);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setsubmitting(true);
    // Validation
    if (!fullName || !email || !password || !phoneno.countryCode || !phoneno.number) {
      console.error("Validation error: All fields must be filled.");
      return;
    }

    const signupData = {
      name: fullName,
      email,
      password,
      phoneno: {
        countryCode: phoneno.countryCode,
        number: phoneno.number,
      },
    };

    console.log("Signup data:", signupData);

    if (accountType === ACCOUNT_TYPE.USER) {
      userRegister.mutate(signupData);
    } else {
      workerRegister.mutate(signupData);
    }
    /*
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phoneno: {
            countryCode: "",
            number: "",
          },
        }); */
    setAccountType(ACCOUNT_TYPE.USER);
  };




  return (
    <div className="flex items-center bg-gradient-r from-pink-500 to-violet-300 relative w-full justify-center items-center h-[100vh]">
      <div className="shadow-2xl flex flex-col gap-4 w-full md:w-1/2 h-[80vh] justify-center font-qs p-8 rounded-2xl">
        <Tabs classNames={{
          tabList: "gap-6 w-full relative rounded-none border-b border-divider",
        }} color="primary" aria-label="AuthRegister">
          <Tab key="Register" title={
            <h3 className="text-2xl font-bold">User</h3>
          }>
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-4">
              <Input
                required
                type="text"
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={(e) => handleOnChange(e, "fullName")}
              />

              <Input
                required
                label="Email Address"
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleOnChange(e, "email")}
              />

              <Input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                endContent={
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                }
                label="Password"
                value={password}
                onChange={(e) => handleOnChange(e, "password")}
              />

              <div className="flex flex-col gap-2">
                <div className="flex w-full flex-row gap-5">
                  <Select
                    required
                    label="Country Code"
                    selectedKeys={[formData.phoneno.countryCode]}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        phoneno: {
                          ...prevData.phoneno,
                          countryCode: e.target.value,
                        },
                      }))
                    }
                    }
                  >
                    {CountryCode.map((ele) => (
                      <SelectItem
                        key={ele.country}
                        value={ele.country}
                      >
                        {ele.code}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <Input
                      required
                      type="text"
                      className="w-full"
                      variant="underlined"
                      placeholder="Phone No"
                      value={formData.phoneno.number}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          phoneno: {
                            ...prevData.phoneno,
                            number: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                radius="none"
                type="submit"
                color="primary"
                isLoading={submitting}
              >
                Create Account
              </Button>
            </form >
          </Tab>
          <Tab key="Worker" title={
            <h3 className="text-2xl font-bold">Worker</h3>
          }>
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-4">
              <Input
                required
                type="text"
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={(e) => handleOnChange(e, "fullName")}
              />

              <Input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                endContent={
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                }
                label="Password"
                value={password}
                onChange={(e) => handleOnChange(e, "password")}
              />

              <div className="flex flex-col gap-2">
                <div className="flex w-full flex-row gap-5">
                  <Select
                    required
                    label="Country Code"
                    selectedKeys={[formData.phoneno.countryCode]}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        phoneno: {
                          ...prevData.phoneno,
                          countryCode: e.target.value,
                        },
                      }))
                    }
                    }
                  >
                    {CountryCode.map((ele) => (
                      <SelectItem
                        key={ele.country}
                        value={ele.country}
                      >
                        {ele.code}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <Input
                      required
                      type="text"
                      className="w-full"
                      placeholder="Phone No"
                      value={formData.phoneno.number}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          phoneno: {
                            ...prevData.phoneno,
                            number: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                radius="none"
                type="submit"
                color="primary"
                isLoading={submitting}
              >
                Create Account
              </Button>
            </form >
          </Tab>
        </Tabs>
      </div >
    </div >
  );
}

export default RegisterForm;
