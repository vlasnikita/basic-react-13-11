import {Record} from 'immutable'
import { ADD_COMMENT, LOAD_ALL_COMMENTS, START, SUCCESS } from '../constants'
import {normalizedComments} from '../fixtures'
import {arrToImmutableMap} from './utils'

const CommentRecord = Record({
    id: null,
    user: null,
    text: '',
    loading: false
})

const ReducerRecord = Record({
    entities: arrToImmutableMap([], CommentRecord),
    loading: false,
    loaded: false,
    error: null
})

export default (comments = new ReducerRecord(), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], new CommentRecord(
                {
                id: randomId,
                text: payload.comment.text,
                user: payload.comment.user}
                ))

        case LOAD_ALL_COMMENTS + START:
            return comments.set('loading', true)

        case LOAD_ALL_COMMENTS + SUCCESS:
            return comments
                .set('loading', false)
                .set('entities', arrToImmutableMap(response.records, CommentRecord))

    }

    return comments
}