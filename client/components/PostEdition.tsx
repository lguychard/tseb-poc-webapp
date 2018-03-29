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
        <h1>Create New Post</h1>
        <Form
            onSubmit={savePost}
            defaultValues={post}
            preSubmit={values => ({...values, keywords: (values.keywords || '').split(',')})}
            render={({submitForm, values, addValue, removeValue}) => (
                <form onSubmit={submitForm}>
                    <fieldset>
                        <Text field="title" placeholder="Title"/>
                    </fieldset>
                    <fieldset>
                        <Text field="author" placeholder="Author" />
                    </fieldset>
                    <fieldset>
                        <Text field="keywords" placeholder="Keywords" />
                    </fieldset>
                    <fieldset>
                        <TextArea field="content" placeholder="Content" />
                    </fieldset>
                    <fieldset>
                        <button type="submit">save</button>
                        <button onClick={deletePost}>delete</button>
                        <button onClick={back}>back</button>
                    </fieldset>
                </form>
            )}>
        </Form>
    </div>
)