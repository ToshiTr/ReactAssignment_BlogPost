import { useSelector } from "react-redux"
import { selectPostById, deletePost } from "./postsSlice"
import { useParams } from "react-router-dom"
import PostsTime from "./postsTime"
import ReactionButton from "./reactionsButton"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"

//PDP for blog post

const SinglePostPage = () => {

    const { postId } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const post = useSelector((state) => selectPostById(state, postId))



    const [title, setTitle] = useState(post?.title)
    const [category, setCategory] = useState(post?.category)
    const [content, setContent] = useState(post?.content)

    const canSave = [title,category,content].every(Boolean)
   

    if (!post) {
        return (
            <section>
                <h1>Post not found!</h1>
            </section>
        )
    }

    const onDeletePost = () =>{
        if(canSave){
         try {
             dispatch(
                 deletePost({ postId })
             )
 
             setTitle('')
             setCategory('')
             setContent('')
 
             navigate('/')
         }catch(err) {
             console.log("Failed to delete the post ",err);
         }
         
        }
     }

    return (
        <article className="BlogPost">
            <div>
            <h3>{post.title}</h3>
            <p className="category">Category: {post.category}</p>
            <p className="content">{post.content}</p>
            <p className="action-time">
                <Link to={`/post/edit/${post.id}`} >Edit Post</Link>
                <PostsTime timestamp={post.date} />
            </p>
            <div className="action-reaction">
              <ReactionButton post={post} />
              <button  
                onClick={onDeletePost}
                type="button"
                className="add-button"
                >Delete Post
              </button>
            </div>
            </div>
        </article>
    )
}


export default SinglePostPage