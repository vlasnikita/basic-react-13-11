import {createSelector} from 'reselect'

export const articlesMapSelector = state => state.articles.entities
export const articlesLoadingSelector = state => state.articles.loading

export const commentsLoadingSelector = state => state.comments.loading
export const commentsMapSelector = state => state.comments.entities
export const commentsPagesMapSelector = state => state.comments.pages
export const commentListSelector = state => state.comments
export const commentsTotalSelector = state => state.comments.total

export const filtersSelector = state => state.filters
export const idSelector = (_, props) => props.id
export const pageSelector = (_, props) => props.page

export const articlesSelector = createSelector(articlesMapSelector, articles => articles.valueSeq().toArray())
export const articleSelector = createSelector(articlesMapSelector, idSelector, (articlesMap, id) => articlesMap.get(id))
export const filtratedArticlesSelector = createSelector(articlesSelector, filtersSelector, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters
    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const commentsSelector = createSelector(commentsMapSelector, comments => comments.valueSeq().toArray())
export const commentsPageMapSelector = createSelector(commentsPagesMapSelector, pageSelector, (commentsMap, page) => commentsMap.get(page))
export const commentsPageSelector = createSelector(commentsPageMapSelector, comments => comments && comments.valueSeq().toArray())

export const createCommentSelector = () => createSelector(commentListSelector, idSelector, (comments, id) => {
    return comments.getIn(['entities', id])
})