import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Post} from './../../api'

export interface ViewPostOptions {
    post: Post
    editPost: () => void
    back: () => void
}

export const PostView = ({ post, back, editPost }: ViewPostOptions) => (
    <article className="post">
        <header>
            <h2>{post.title}</h2>
            <p>
                <strong>{post.author}</strong>, {new Date(post.createdAt).toDateString}
            </p>
            <p className="keywords">
                <strong>Keywords:</strong> {post.keywords.join(', ')}
            </p>
        </header>
        <p>{post.content}</p>
        <fieldset>
            <button onClick={editPost}>edit</button>
            <button onClick={back}>back</button>
        </fieldset>
    </article>
)