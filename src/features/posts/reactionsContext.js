import React, { createContext, useContext, useReducer } from "react";
import { selectAllPosts } from "./postsSlice";
import { useSelector , useDispatch } from "react-redux"

//This state is more focused on providing a context for handling reactions across different components.

const initialState = {
  thumbsUp: 0,
  heart: 0,
  wow: 0,
};

const ReactionsContext = createContext();


export function useReactions() {
  return useContext(ReactionsContext);
}


export function ReactionsProvider({ children }) {

  const posts = useSelector(selectAllPosts)
  const dispatchRedux = useDispatch();
  const [reactions, dispatch] = useReducer(reactionsReducer, initialState);

  function reactionsReducer(state, action) {

    const postId = action.postId
    const existingPost = posts.find(post => post.id === postId)
    const post = {...existingPost} 
    const postReaction = {...post.reactions}


    switch (action.type) {

      case "thumbsUp":

      return {
        ...state,
        thumbsUp: state.thumbsUp + 1,
        postId, 
        postReaction, 
      };
      case "heart":
       postReaction[action.type] +=1
      
      return {
        ...state,
        heart: state.heart + 1,
        postId, 
        postReaction, 
      };
      
      case "wow":
        postReaction[action.type] +=1
      
      return {
        ...state,
        wow: state.wow + 1,
        postId, 
        postReaction, 
      };

      default:
        return state;
        
    }
  }

  const contextValue = {
    reactions,
    dispatch,
  };

  return (
    <ReactionsContext.Provider value={contextValue}>
      {children}
    </ReactionsContext.Provider>
  );
}