export type Signature = {
    address: string
    data: string
    signature: string
} | null | undefined

export const schemas = ['Article' , 'TechArticle' , 'NewsArticle' , 'BlogPosting' ] as const

type Schema = typeof schemas[number] | null | undefined

export type ITag = {
    id: number
    name: string
    slug: string
    description: string
}

export interface ICat extends ITag {}

export type IAuthor = {
    id: number
    name?: string
    description?: string
    username: string
    avatar: string
    role?: string
    social_links?: { [key: string]: string }
    email?: string
}

export type IRelatedPost = {
    slug: string
    title: string
    feature_image: string
    feature_image_alt: string
    created_at: string
    excerpt: string
}

export interface IPost {
    slug: string
    title: string
    feature_image: string
    feature_image_alt: string
    created_at: string
    updated_at: string
    content: string
    author?: IAuthor
    cat?: ICat
    tags?: ITag[]
    signature: Signature
    schema: Schema
    related: IRelatedPost[]
    seo_description: string
    language: string
    tags_id?: number[]
    cat_id?: number
    author_id?: number
    draft: boolean
    content_text?: string
    isFull?: boolean
}
