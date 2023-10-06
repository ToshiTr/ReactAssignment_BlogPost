import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
import { useNavigate } from "react-router-dom";

//Add new Blog post

const AddPostForm = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')

    const onTitleChanged = e => setTitle(e.target.value);
    const onCategoryChanged = e => setCategory(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const dispatch = useDispatch()

    const onAddPost = () =>{
       if(canSave) {
        try {
            dispatch(
                postAdded(title, category, content)
            )
          

            setTitle('')
            setCategory('')
            setContent('')
        
            
            //After adding new post navigate to the Blog post list
            navigate('/')

        }catch(error) {
            console.log("Something went wrong ",error)
        }
       }
    }

    const canSave = [title,category,content].every(Boolean)

    return (
        <section>
            <h2>Add a New Post</h2>
            <div className="form-container">
            <form>
                <label htmlFor="postTitle" className="form-label">Post Title : </label>
                <input
                    type="text"
                    className="text-input"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    required
                    onChange={onTitleChanged}
                />
                <label htmlFor="postCategory" className="form-label">Categories : </label>
                <input
                    type="text"
                    id="postCategory"
                    className="textarea-input"
                    name="postCategory"
                    value={category}
                    required
                    maxLength={15}
                    onChange={onCategoryChanged}
                />
                <label htmlFor="postContent" className="form-label">Content : </label>
                <textarea
                    id="postContent"
                    className="textarea-input"
                    name="postContent"
                    value={content}
                    required
                    onChange={onContentChanged}
                />
                <button  
                onClick={onAddPost}
                type="button"
                className="add-button"
                disabled={!canSave}
                >Add Post</button>
            </form>
            </div>
        </section>
    )
}

export default AddPostForm