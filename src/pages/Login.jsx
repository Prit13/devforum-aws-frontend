import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from 'axios';
import {URL} from '../url';
import { UserContext } from '../context/UserContext';
import {useCookies} from 'react-cookie';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [_,setCookies]=useCookies('token');

    const handleLogin = async () => {
        try {
            // console.log(setUser)
            const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true })
            // console.log(res.data.token)

            setCookies('token',res.data.token);   //commenting bcoz right now in res theres no token is not gettin passed
            window.localStorage.setItem('userId',res.data._id);

            setUser(res.data)
            navigate("/")

        }
        catch (err) {
            setError(true)
            console.error(err);

        }
    }
    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
                <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">DevForum</Link></h1>
                <h3><Link to="/register">Register</Link></h3>
            </div>

            <div className="w-full flex justify-center items-center h-[80vh] ">
                <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                    <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 text-black border-2 border-black outline-0 rounded-md" type="text" placeholder="Enter your email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 text-black border-2 border-black outline-0 rounded-md" type="password" placeholder="Enter your password" />
                    <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-400 hover:text-black ">Log in</button>
                    {error && <h3 className="text-red-500 text-sm ">No User exist with this credential</h3>}
                    <div className="flex justify-center items-center space-x-3">
                        <p>New here?</p>
                        <p className="text-sky-400 hover:text-sky-600"><Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login