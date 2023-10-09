import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

//Initially setting reactions to 0
//2 static posts having title, category and content and reactions
const initialState = [
    {
        id: '1',
        title: 'Redux',
        category: 'Learning',
        content: 'Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            heart: 0,
            wow: 0,
        }
    },
    {
        id: '2',
        title: 'Context API',
        category: 'Learning',
        content: 'How to Use the React Context API in Your Projects. Context API allows data to be passed through a component tree without having to pass props manually at every level. This makes it easier to share data between components.',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            heart: 0,
            wow: 0,
        },
    }
]


 // reducer function for handling different actions
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, category, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        category,
                        content,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            heart: 0,
                            wow: 0,
                        }
                    }
                }
            }
        },
        updatePost(state, action) {

            if (!action.payload?.postId) {
                console.log("Couldn't update post");
                console.log(action.payload);
                return
            }

            action.payload.date = new Date().toISOString();
            const { postId } = action.payload;
            const post = state.find(post => post.id === postId);

            if (post) {
                Object.assign(post, action.payload);
            }

        },
        deletePost(state, action) {
            if (!action.payload?.postId) {
                console.log("Couldn't delete post");
                console.log(action.payload);
                return;
            }

            const postIdToDelete = action.payload.postId;

            return state.filter(post => post.id !== postIdToDelete);
        },
        reactionAction(state, action) {

            const postId = action.payload.postId;
            const reactionType = action.payload.reaction;
            const reactions = action.payload.reactions;

            const getPost = state.find(post => post.id === postId)

            getPost.reactions[reactionType]++;

            console.log(getPost)

        }
    }
})


export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId);

export const { postAdded, updatePost, deletePost, reactionAction } = postsSlice.actions;

export default postsSlice.reducer
