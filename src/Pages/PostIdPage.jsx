import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [FetchComments, isCommentLoading, CommentError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        FetchComments(params.id)
    }, [])

    return (
        <div>
            <div>Вы попали на страницу поста номер = {params.id}</div>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h2>
                Комментарии
            </h2>
            {isCommentLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>

                    )}
                </div>
            }

        </div>

    )
}

export default PostIdPage;


