import type { IPost } from '$lib/types/post';
import { schemas } from '$lib/types/post';

export const makeEmptyPost = ({
    author_id,
    cat_id,
} = {
    author_id: 1,
    cat_id: undefined,
}): IPost => {
    return {
        title: '',
        slug: '',
        content: '',
        feature_image: '',
        feature_image_alt: '',
        created_at: '',
        updated_at: '',
        seo_description: '',
        tags_id: [],
        cat_id,
        author_id,
        signature: null,
        schema: schemas[3],
        related: [],
        language: '',
        draft: false
    }
}
