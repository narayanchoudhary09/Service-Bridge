import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Tabs, Tab, Input, Button, Select, SelectItem, Image } from "@nextui-org/react";
import logo from "../../../assets/logo.png";
import CountryCode from "../../../data/countrycode.json";

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [formDataWorker, setFormDataWorker] = useState({
    phoneNo: {
      countryCode: "",
      number: ""
    },
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: e.target.value,

    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch()
    // AddDeatils.mutate(data);
  }

  return (
    <div className="flex tab items-center w-full justify-center items-center h-[100vh]">
      <div className="shadow-2xl bg-white flex  flex-col w-full md:w-1/2 gap-4 h-3/4 justify-center font-qs p-8 rounded-2xl">
        <Tabs classNames={{
          tabList: "gap-6 w-full relative rounded-none border-b border-divider",
        }} color="primary" aria-label="AuthRegister">
          <Tab key="Register" title={
            <h3 className="text-2xl font-bold">User</h3>
          }>
            <form onSubmit={(e) => handleOnSubmit(e)} className="flex w-full flex-col gap-4">
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
              <Button
                radius="none"
                type="submit"
                className="text-xl"
                color="primary"
                isLoading={submitting}
              >
                Login
              </Button>
            </form >
          </Tab>
          <Tab key="Worker" title={
            <h3 className="text-2xl font-bold">Worker</h3>
          }>
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row w-full items-center">
                  <Select
                    required
                    label="Country Code"
                    selectedKeys={[formDataWorker.phoneNo.countryCode]}
                    onChange={(e) => {
                      setFormDataWorker((prevData) => ({
                        ...prevData,
                        phoneNo: {
                          ...prevData.phoneNo,
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


                  <Input
                    required
                    type="text"
                    className="w-full"
                    placeholder="Phone No"
                    value={formDataWorker.phoneNo.number}
                    onChange={(e) =>
                      setFormDataWorker((prevData) => ({
                        ...prevData,
                        phoneno: {
                          ...prevData.phoneNo,
                          number: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
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

              <Button
                radius="none"
                type="submit"
                className="text-xl"
                color="primary"
                isLoading={submitting}
              >
                Login
              </Button>
            </form >
          </Tab>
        </Tabs>
      </div >
    </div>
  )
}

export default LoginForm
