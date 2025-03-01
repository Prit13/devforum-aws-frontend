import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { URL } from "../url"



function Menu() {
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    // console.log(user.info._id)
    const handleLogout = async () => {
        try {
            const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
            // console.log(res)
            setUser(null)
            navigate("/login")

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="bg-zinc-800 opacity-90 w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4 ">

            {!user && <h3 className="text-white text-base hover:text-sky-400 cursor-pointer"><Link to="/login">Login</Link></h3>}
            {!user && <h3 className="text-white text-base hover:text-sky-400 cursor-pointer"><Link to="/register">Register</Link></h3>}
            {user && <h3 className="text-white text-base hover:text-sky-400 cursor-pointer"><Link to={"/profile/"+user.info._id} >Profile</Link></h3>}
            {user && <h3 className="text-white text-base hover:text-sky-400 cursor-pointer"><Link to="/write">Ask</Link></h3>}
            {user && <h3 className="text-white text-base hover:text-sky-400 cursor-pointer"><Link to={"/myposts/"+user.info._id}>My Questions</Link></h3>}
            {user && <h3 onClick={handleLogout} className="text-white text-base hover:text-sky-400 cursor-pointer">Logout</h3>}

        </div>
    )
}

export default Menu