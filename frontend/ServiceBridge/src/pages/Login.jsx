import registerImg from "../assets/signupImg.jpg"
import Template from "../components/core/Auth/Template"

function Login(){
    return (
        <Template
        title= "Welcome Back"
        image = {registerImg}
        formType="login"
        />
    )
}

export default Login