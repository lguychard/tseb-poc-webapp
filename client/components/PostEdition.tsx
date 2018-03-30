import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Form, Text, TextArea } from 'react-form'

import {Post} from './../../api'

export interface EditPostOptions {
    post: Post
    savePost: (p: Post) => void
    deletePost: () => void
    back: () => void
}

export const PostEdition = ({ post, savePost, deletePost, back }: EditPostOptions) =>  (
    <div>
        <h1>{ post.id ? 'Edit Post' : 'New Post' }</h1>
        <Form
            onSubmit={(values: {}) => savePost({...post, ...values})}
            defaultValues={post}
            render={({submitForm, values, addValue, removeValue}) => (
                <form>
                    <fieldset>
                        <Text field="title" placeholder="Title"/>
                    </fieldset>
                    <fieldset>
                        <Text field="author" placeholder="Author" />
                    </fieldset>
                    <fieldset>
                        <TextArea field="content" placeholder="Content" cols={60} rows={20}/>
                    </fieldset>
                    <fieldset>
                        <button onClick={submitForm}>save</button>
                        <button onClick={deletePost}>delete</button>
                        <button onClick={back}>back</button>
                    </fieldset>
                </form>
            )}>
        </Form>
    </div>
)