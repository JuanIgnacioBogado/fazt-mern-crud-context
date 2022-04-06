import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {usePosts} from '../context/postContext';

export const PostCard = ({post}) => {
    const navigate = useNavigate();
    const {deletePost} = usePosts();

    const handleDelete = _id => {
        toast(({id}) => (
            <div>
                <p className="text-white pb-2">Do you want to delete? <strong>{_id}</strong></p>
                <div>
                    <button
                        onClick={() => {
                            deletePost(_id);
                            toast.dismiss(id);
                        }}
                        className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded mr-2 text-white"
                    >Delete</button>
                    <button
                        onClick={() => toast.dismiss(id)}
                        className="bg-slate-400 hover:bg-slate-500 px-3 py-2 rounded text-white"
                    >Cancel</button>
                </div>
            </div>
        ), {
            style: {
                background: '#202020'
            }
        });
    }

    return (
        <div
            onClick={() => navigate(`/posts/${post._id}`)}
            className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
        >
            <div className="px-4 py-7">
                <div className="flex justify-between items-center">
                    <h3>{post.title}</h3>
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete(post._id);
                        }}
                        className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
                    >Delete</button>
                </div>
                <p>{post.description}</p>
            </div>
            {post.image && (
                <img src={post.image.url} className="w-full" alt=""/>
            )}
        </div>
    )
};