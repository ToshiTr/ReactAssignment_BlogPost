import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { selectPostById, updatePost } from "./postsSlice"
import { useParams } from "react-router-dom"

//Edit blog post action

const EditPostForm = () => {

    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, postId))

    const [title, setTitle] = useState(post?.title)
    const [category, setCategory] = useState(post?.category)
    const [content, setContent] = useState(post?.content)

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h1>Post not found!</h1>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onCategoryChanged = e => setCategory(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const canSave = [title,category,content].every(Boolean)

    const onEditPost = () =>{
       if(canSave){
        try {
            dispatch(
                updatePost({ postId, title, category, content, reaction : post.reactions})
            )

            setTitle('')
            setCategory('')
            setContent('')

            //after edit is successfull , navigate to blog Post pdp page
            
            navigate(`/post/${postId}`)
        }catch(err) {
            console.log("Failed to save the post ",err);
        }
        
       }
    }



    return (
        <section>
            <h2>Edit Post</h2>
           
            <div className="form-container">
            <form>
                <label htmlFor="postTitle" className="form-label">Post Title : </label>
                <input
                    type="text"
                    className="text-input"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    disabled={title === ''}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postCategory" className="form-label">Categories : </label>
                <input
                    type="text"
                    id="postCategory"
                    className="textarea-input"
                    name="postCategory"
                    value={category}
                    disabled={category === ''}
                    onChange={onCategoryChanged}
                />
                <label htmlFor="postContent" className="form-label">Content : </label>
                <textarea
                    id="postContent"
                    className="textarea-input"
                    name="postContent"
                    value={content}
                    disabled={content === ''}
                    onChange={onContentChanged}
                />
                <button  
                onClick={onEditPost}
                type="button"
                className="add-button"
                disabled={!canSave}
                >Edit Post</button>
            </form>
            </div>
        </section>
    )
}

export default EditPostForm