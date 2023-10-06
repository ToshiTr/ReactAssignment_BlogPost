import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostsTime from "./postsTime";
import ReactionButton from "./reactionsButton"
import { Link } from "react-router-dom";

//List of blog Post 

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id} className="BlogPostCard">
        <h3>{ post.title }</h3>
        <p className="category">{ post.category }</p>
        <p className="content">{ post.content.substring(0,100) }</p>
        <p className="postDetails">
        <Link to={`post/${post.id}`} >View Post</Link>
        <PostsTime timestamp={post.date}/>
        </p>
        <ReactionButton post={post}/>
      </article>
    ))

    return (
        <section>
            {renderedPosts}
        </section>
    )
}

export default PostsList