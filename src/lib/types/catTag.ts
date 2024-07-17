export interface ICatTag {
    id: number
    name: string
    slug: string
    description: string
    posts?: [{
        count: number
    }]
    type?: 'cat' | 'tag'
    count?: number
    updated_at?: string
    created_at?: string
}
