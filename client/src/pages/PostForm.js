import {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {usePosts} from '../context/postContext';

export const PostForm = () => {
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: null
    });
    const {createPost, getPost, updatePost} = usePosts();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            if (id) {
                const {data} = await getPost(id);
                setPost(data);
            }
        })();
    }, [id]);

    return (
        <div className="text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-10 shadow-md shadow-black">
                <header className="flex justify-between items-center py-4">
                    <h3 className="text-xl">{id ? 'Edit Post' : 'New Post'}</h3>
                    <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
                </header>

                <Formik
                    initialValues={post}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Title is required'),
                        description: Yup.string().required('Description is required')
                    })}
                    onSubmit={async (values, actions) => {
                        if (id) {
                            await updatePost(id, values);
                        } else {
                            await createPost(values);
                        }

                        actions.setSubmitting(false);
                        navigate('/');
                    }}
                    enableReinitialize
                >
                    {({handleSubmit, setFieldValue, isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <label
                                htmlFor="title"
                                className="text-sm block font-bold text-gray-400 my-2"
                            >
                                Title
                            </label>
                            <Field
                                className="px-3 py-2 focus:outline-none rounded bg-gray-600 w-full"
                                name="title"
                                placeholder="Title"
                            />
                            <ErrorMessage
                                component="p"
                                className="text-red-400 text-sm"
                                name="title"
                            />
    
                            <label
                                htmlFor="description"
                                className="text-sm block font-bold text-gray-400 my-2"
                            >
                                Description
                            </label>
                            <Field
                                className="px-3 py-2 focus:outline-none rounded bg-gray-600 w-full"
                                name="description"
                                placeholder="Description"
                                component="textarea"
                                rows="3"
                            />
                            <ErrorMessage
                                component="p"
                                className="text-red-400 text-sm"
                                name="description"
                            />

                            <label
                                htmlFor="title"
                                className="text-sm block font-bold text-gray-400 my-2"
                            >
                                Upload Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                                onChange={({target}) => setFieldValue('image', target.files[0])}
                            />
    
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 focus:outline-none disabled:bg-indigo-400"
                            >
                                {isSubmitting ? (
                                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"/>
                                ) : 'Save'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};