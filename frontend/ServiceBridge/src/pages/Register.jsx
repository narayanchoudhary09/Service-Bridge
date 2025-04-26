import registerImg from "../assets/signupImg.jpg"
import Template from "../components/core/Auth/Template"

function Register(){
    return (
        <div className="mt-20">

            <Template
            title= "join our platform"
            image = {registerImg}
            formType="register"
            />
        </div>
    )
}

export default Register