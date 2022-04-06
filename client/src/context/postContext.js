import {useState, createContext, useContext, useEffect} from 'react';
import {getPostRequests, createPostRequests, deletePostRequests, getPostsRequests, updatePostRequests} from '../api/posts';

const context = createContext();

export const usePosts = () => useContext(context);

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const {data} = await getPostsRequests();
        setPosts(data);
    };

    const createPost = async post => {
        try {
            const {data} = await createPostRequests(post);
            setPosts([...posts, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async id => {
        await deletePostRequests(id);
        const postsFiltered = posts.filter(p => p._id !== id);
        setPosts(postsFiltered);
    };

    const updatePost = async (id, post) => {
        const {data} = await updatePostRequests(id, post);
        const postsUpdated = posts.map(p => p._id === id ? data : p);
        setPosts(postsUpdated);
    };

    const getPost = async id => await getPostRequests(id);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <context.Provider
            value={{
                posts,
                getPosts,
                createPost,
                deletePost,
                getPost,
                updatePost
            }}
        >
            {children}
        </context.Provider>
    )
};