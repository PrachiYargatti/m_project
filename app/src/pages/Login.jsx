import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { Link , useNavigate } from "react-router-dom"
import { loginUser } from "../services/userService"
import { LoginContext } from "../App"
import AppNavbar from "../components/AppNavbar"

function Login() {
    //destructuring of array
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //destructuring of object
    const {setLoginStatus} = useContext(LoginContext)

    const signin = async (event) => {
        if(email === "")
            toast.warn('email must be entered')
        else if(password === "")
            toast.warn('password must be entered')
        else{
            const result = await loginUser(email, password)
            console.log('api result: ', result)
            if (result.status === 'success'){
                //dynamic navigation
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('role', result.data.role)
                setLoginStatus(true)
                navigate('/home')
                toast.success('Login successful')
            }
            else{
                toast.error(result.error)
                // toast.error("Invalid crendential")
            }
        }
    }

    return (
        <>
            <AppNavbar />
            <div className="container w-50">
                <h2 className="mb-4 mt-3">Login</h2>

                <div className="mt-3 mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>

                <div className="mb-3">
                    <button className="btn btn-success" onClick={signin}>Sign in</button>
                </div>

                {/* <div>
                    Don't have an account? then to register <Link to="/register">Click here</Link>
                </div> */}
            </div>
        </>
    )
}

export default Login