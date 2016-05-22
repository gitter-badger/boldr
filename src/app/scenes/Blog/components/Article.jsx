import Article from '../article';
// import { parseArticleOverview } from 'app/components/Editor/helpers/articleOverviewParser';
class ArticleOverview extends Article {

    constructor(props) {
        super(props);
        // 
        // this.getChildContext = () => {
        //     return {articleState: articleTypes.OVERVIEW, articleUrl: this.props.articleUrl}
        // }
    }

    // prepareDraft(draft) {
    //     return parseArticleOverview(draft);
    // }

}
