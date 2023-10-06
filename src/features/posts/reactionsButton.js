import { useDispatch } from "react-redux";
import { reactionAction } from "./postsSlice";
import { useReactions } from "./reactionsContext";

const reactionEmoji = {
    thumbsUp : '👍',
    heart : '❤️',
    wow : '😲',
}


const ReactionButtons = ({ post }) => {

    const { reactions, dispatch } = useReactions();
    const dispatchRedux = useDispatch();

    
    const handleReactionClick = (reaction, postId) => {


      //Increment reactions count in Context API
       dispatch({ type: reaction, postId })

        //Increment the reactions count in Redux globally
       dispatchRedux(reactionAction({ postId, reaction , reactions}));
      };

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return(
            <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() =>
                handleReactionClick(name, post.id)
            }>
            {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{ reactionButtons }</div>
}



export default ReactionButtons