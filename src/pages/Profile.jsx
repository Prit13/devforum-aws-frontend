import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
    const param = useParams().id;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [posts, setPosts] = useState([]);
    const [updated, setUpdated] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // console.log(user)
    const handleUserUpdate = async () => {
        setUpdated(false);
        try {
            await axios.put(
                URL + "/api/users/" + user.info._id,
                { username, email, password },
                { headers: { Authorization: `${user.token}` }, withCredentials: true }
            );
            setUpdated(true);
        } catch (err) {
            console.log(err);
            setUpdated(false);
        }
    };

    const handleUserDelete = async () => {
        try {
            const res = await axios.delete(URL + "/api/users/" + user.info._id, {
                headers: { Authorization: `${user.token}` },
                data: { password: deletePassword },
            });
            setUser(null);
            navigate("/login");
        } catch (error) {
            setError("Incorrect password or failed to delete account.");
            console.log(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await axios.get(URL + "/api/users/" + param);
            setUsername(res.data.username);
            setEmail(res.data.email);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/user/" + param);
            setPosts(res.data);
            // console.log(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchUserPosts();
    }, [param]);

    return (
        <div>
            <Navbar />
            <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                    {posts?.map((p) => (
                        <ProfilePosts key={p._id} p={p} />
                    ))}
                </div>
                <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                    <div className="flex flex-col space-y-4 items-start">
                        <h1 className="text-xl font-bold mb-4">Profile</h1>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} className="rounded-md outline-none px-4 py-2 text-gray-500 dark:bg-zinc-800 dark:text-white" placeholder="Your username" type="text" />
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-md outline-none px-4 py-2 text-gray-500 dark:bg-zinc-800 dark:text-white" placeholder="Your email" type="email" />
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-md outline-none px-4 py-2 text-gray-500 dark:bg-zinc-800 dark:text-white" placeholder="Your new password" type="password" />
                        <div className="flex items-center space-x-4 mt-8">
                            <button onClick={handleUserUpdate} className="text-white font-semibold rounded-xl bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                            <button onClick={() => setShowModal(true)} className="text-white font-semibold rounded-xl bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
                        </div>
                        {updated && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold">Confirm Deletion</h2>
                        <p className="text-gray-600 dark:text-white">Enter your password to confirm account deletion.</p>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className="border p-2 w-full mt-2 dark:text-black"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="flex justify-end mt-4 space-x-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-white bg-gray-400 rounded dark:bg-gray-500 hover:bg-gray-300">Cancel</button>
                            <button onClick={handleUserDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Profile;
