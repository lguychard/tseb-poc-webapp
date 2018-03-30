import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {createEventBus} from 'ts-event-bus'
import HTTPClientChannel from 'ts-event-bus-http-client-channel'
import {Post} from './../api'
import Api from './../api'

import {PostList} from './components/PostList'
import {PostView} from './components/PostView'
import {PostEdition} from './components/PostEdition'

const getDefautPost = (): Post => ({
    author: '',
    title: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content: '',
    id: '',
})

type AppState = {
    view: 'edit' | 'list' | 'read',
    posts: Post[],
    current?: Post
    newPost?: boolean
}

class App extends React.Component<AppState> {

    state: AppState = {
        view: 'list',
        posts: []
    }

    api = createEventBus({
        events: Api,
        channels: [ new HTTPClientChannel() ]
    })

    componentDidMount() {
        this.api.getPosts(null).then(posts => {
            this.setState({
                view: 'list',
                posts
            })
        })
    }
    render() {
        switch (this.state.view) {
            case 'list':
                return <PostList
                    posts={this.state.posts}
                    viewPost={(p: Post) => this.setState({ posts: this.state.posts, view: 'read', current: p })}
                    createNew={() => this.setState({
                        ...this.state,
                        view: 'edit',
                        current: getDefautPost(),
                        newPost: true
                    })}
                />
            case 'read':
                return <PostView
                    post={this.state.current}
                    back={() => this.setState({ ...this.state, view: 'list'})}
                    editPost={() => this.setState({ ...this.state, view: 'edit'})}
                />
            case 'edit':
                return <PostEdition
                    post={this.state.current}
                    savePost={(p: Post) => this._savePost(p)}
                    deletePost={() => this._deletePost()}
                    back={() => this.setState({ ...this.state, view: 'list'})}
                />
        }
    }

    private _getAllPosts() {
        return this.api.getPosts(null).then(posts => {
            this.setState({
                view: 'list',
                posts
            })
        })
    }

    private _savePost(post: Post) {
        return this.api.savePost({
                type: this.state.newPost ? 'create' : 'update',
                post
            })
            .then(() => this._getAllPosts())
            .catch(console.error)
    }

    private _deletePost() {
        return this.api
            .deletePost({ id: this.state.current.id })
            .then(() => this._getAllPosts())
            .catch(console.error)
    }

}

ReactDOM.render(
    <App
        view='list'
        posts={[]}
    />,
    document.getElementById('app')
)