import {Link} from 'react-router-dom';
import {VscEmptyWindow} from 'react-icons/vsc'
import {usePosts} from '../context/postContext';
import {PostCard} from '../components/PostCard';

export const HomePage = () => {
    const {posts} = usePosts();

    return (
        <div className="text-white">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-300">Posts ({posts.length})</h1>
                <Link to="/new" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded">Create New Post</Link>
            </header>

            {posts.length ? (
                <div className="grid grid-cols-3 gap-2">
                    {posts.map(post => <PostCard key={post._id} post={post}/>)}
                </div>
            ) : (
                <div className="text-white flex flex-col justify-center items-center">
                    <VscEmptyWindow className="w-48 h-48" />
                    <h1 className="text-2xl">There are no posts</h1>
                </div>
            )}
        </div>
    )
};