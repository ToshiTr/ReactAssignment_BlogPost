import PostsList from "./features/posts/postsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/singlePostPage";
import { Routes, Route} from 'react-router-dom';
import Layout from "./components/layout";
import EditPostForm from "./features/posts/EditPostForm";

function App() {
  return (
      <Routes>
      <Route path="/" element ={ <Layout /> }>

        <Route index element={ <PostsList /> } />

        <Route path="post">
          <Route index element={ <AddPostForm/> } />
          <Route path=":postId" element={ <SinglePostPage />} />
          <Route path="edit/:postId" element={ <EditPostForm />} />
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
