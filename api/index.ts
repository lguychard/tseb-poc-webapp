import {slot, Slot} from 'ts-event-bus'

export const s: Slot | null = null

export interface Post {
    keywords: string[]
    title: string
    id: string
    content: string
    createdAt: number
    updatedAt: number
    author: string
}

export type Partial<T> = {
    [P in keyof T]?: T[P]
}

export const PostEvents = {
    createPost: slot<Post, Post>(),
    updatePost: slot<Post>(),
    deletePost: slot<{ id: string }>(),
    getPost: slot<{ id: string }, Post>(),
    getPosts: slot<null, Post[]>(),
}

export type PostEvents = typeof PostEvents

export default PostEvents