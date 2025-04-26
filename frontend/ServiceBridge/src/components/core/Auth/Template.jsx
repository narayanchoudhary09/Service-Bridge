import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useSelector } from "react-redux"
import backImg from "../../../assets/frame.png"

function Template({ title, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <RegisterForm />
    /*
<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    {loading ? (
      <div className="spinner"></div>
    ) : (
      <div className="flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className=" w-11/12 max-w-[450px] md:mx-0 my-auto">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] ">
            {title}
          </h1>
          {formType === "register" ? <RegisterForm /> : <LoginForm />}
        </div>
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 mb-10 md:my-[100px]">
          <img
            src={backImg}
            alt="pattern"
            width={558}
            height={404}
            className="shadow-2xl" />
          <img
            src={image}
            alt="image"
            width={558}
            // height={604}

            className="absolute z-10 -top-4 right-4 shadow-2xl h-[400px]" />
        </div>
      </div>
    )}
  </div>
  */
  )
}

export default Template
