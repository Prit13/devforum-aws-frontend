import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL, IF } from '../url';
import { UserContext } from '../context/UserContext';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom'

function PostDetails() {
    const postId = useParams().id;
    // console.log(postId)
    const [post, setPost] = useState("")

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loader, setLoader] = useState(false);
    const [userName,setUserName]=useState("");    

    let [open,setOpen]=useState(true);

    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    // console.log(user)

    const handleDeletePost = async () => {
        // console.log(user)
        try {
            const res = await axios.delete(URL + "/api/posts/" + postId, 
            { headers: { 'Authorization': `${user.token}` } },{ withCredentials: true })
            // console.log(res.data)
            navigate("/")
        }
        catch (err){
            // console.log(err)
        }
    }

    const fetchPost = async () => {
        setLoader(true)
        try {
            const res = await axios.get(URL + '/api/posts/' + postId)
            // console.log(res.data)
            // console.log(user)
            setPost(res.data);
            setUserName(res.data.username);
            setOpen(res.data.open);
            setLoader(false);
        }
        catch (err) {
            console.log(err)
            setLoader(true)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [postId])

    const fetchPostComments = async () => {
        try {
            const res = await axios.get(URL + '/api/comments/post/' + postId)
            // console.log(res.data)
            setComments(res.data)
            // console.log(commentList)
            // setLoader(false)
        }
        catch (err) {
            console.log(err)
            // setLoader(true)
        }

    }

    useEffect(() => {
        fetchPostComments()
        setComment("")
    }, [postId])

    const postComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return; // Prevent empty comments

        try {
            // console.log(user)
            const res = await axios.post(URL + '/api/comments/create',
                { comment: comment, author: user.info.username, postId: postId, userId: user.info._id },
                { headers: { 'Authorization': `${user.token}` } },
                { withCredentials: true })
            
            setComment("")
            fetchPostComments()
            // window.location.reload(true);
        } catch (error) {
            console.log(error)
        }
    }
    const handleOpen= async()=>{
        
        // if(user.info.username===userName && open){
        //     setOpen(false)
        //     // console.log(open)
        // }
        try {
            const res = await axios.put(URL + `/api/posts/${postId}/toggle-status`, 
                {}, 
                { headers: { 'Authorization': `${user.token}` } });
    
            setOpen(res.data.open); // Updating state based on API response
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Navbar />
            {loader ? <div className='h-[80vh] flex justify-center items-center w-full'> <Loader /> </div> :
                <div className="px-8 md:px-[200px] mt-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black md:text-3xl dark:text-white">{post.title}</h1>
                        {open ? (
                            <p className='bg-green-200 dark:bg-green-700 text-black dark:text-white rounded-lg px-3 py-1 cursor-pointer' onClick={handleOpen}>Open</p>
                        ) : (
                            <p onClick={handleOpen} className='bg-red-200 dark:bg-red-700 text-black dark:text-white rounded-lg px-3 py-1 cursor-pointer'>Closed</p>
                        )}
    
                        {user.info?._id === post.userId && (
                            <div className='flex items-center justify-center space-x-2'>
                                <p onClick={() => navigate("/edit/" + postId)} className='text-xl cursor-pointer'><BiEdit /></p>
                                <p onClick={handleDeletePost} className='text-xl cursor-pointer'><MdDelete /></p>
                            </div>
                        )}
                    </div>
    
                    <div className="flex items-center justify-between mt-2 md:mt-4">
                        <p>@{post.username}</p>
                        <div className='flex space-x-2'>
                            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                        </div>
                    </div>
                    <img src={IF + post.photo} className="w-full mx-auto mt-8" alt="image" />
                    <p className='mx-auto mt-8 dark:text-white'>{post.desc}</p>
    
                    <div className="flex items-center mt-8 space-x-4 font-semibold">
                        {/* <p>Categories:</p> */}
                        <div className="flex justify-center items-center space-x-2">
                            {post.categories?.map((c, i) => (
                                <div key={i} className="bg-blue-200 dark:bg-blue-700 text-black dark:text-white rounded-lg px-3 py-1">{c}</div>
                            ))}
                        </div>
                    </div>
                   
                    <div className="flex flex-col mt-4">
                        <div className="border-b border-gray-300 p-2"></div>
                        <h3 className="mt-6 mb-4 font-semibold dark:text-white">Comments:</h3>
    
                        {comments?.map((c) => (
                            <div key={c._id} className=" p-4 rounded-md">
                                <Comment c={c} post={post} fetchPostComments={fetchPostComments} />
                            </div>
                        ))}
                    </div>
    
                    {/* Write comment section */}
                    <div className="w-full flex flex-col mt-4 md:flex-row">
                        <textarea 
                            disabled={!open} // Disable if post is closed
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} 
                            placeholder={open ? "Post Answer..." : "Comments are disabled as this post is closed"} 
                            className={`md:w-[80%] outline-none rounded-md border-b-2 py-2 px-4 mt-4 md:mt-0 
                                ${!open ? "bg-gray-200 dark:bg-gray-500 cursor-not-allowed" : "focus-within:border-blue-400 dark:bg-gray-800 dark:text-white"}`}
                        />
                        <button 
                            disabled={!open} // Disable button if post is closed
                            onClick={postComment} 
                            className={`bg-black text-base text-white rounded-md px-2 py-2 md:w-[20%] mx-8 mt-4 md:mt-0 
                                hover:bg-blue-900 ${!open ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Post Answer
                        </button>
                    </div>
                </div>
            }
            <Footer />
        </div>
    );
}    

export default PostDetails