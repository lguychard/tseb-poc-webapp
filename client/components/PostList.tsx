import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Post} from './../../api'

export interface PostListOptions {
    posts: Post[]
    viewPost: (p: Post) => void
    createNew: () => void
}

export const PostList = ({ posts, viewPost, createNew }: PostListOptions) => (
    <section className="post-list">
        <h1>All Posts</h1>
        <ul>
            {
                posts.map(p => (
                    <li key={p.id}>
                        <a href="#" onClick={() => viewPost(p)}>{p.title}</a> -
                        {p.author} on {new Date(p.createdAt).toDateString()}
                    </li>
                ))
            }
        </ul>
        <hr/>
        <p>
            <button onClick={() => createNew()}>Create new</button>
        </p>
    </section>
)