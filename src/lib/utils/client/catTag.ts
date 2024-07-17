import type { ICatTag } from '$lib/types/catTag';
import type { IAlert } from '$lib/types/alert';

export const makeEmptyCatTag = (): ICatTag => {
    return {
        id: undefined as unknown as number,
        name: '',
        slug: '',
        description: '',
    }
}

export async function deleteCatOrTag(id: number, type: 'cat' | 'tag', alert: IAlert, data: {catOrTags: ICatTag[]}) {
    try {
        if(!data?.catOrTags.length) return
        const res = await fetch(`/admin/settings/cat-tag/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, type })
        })
        const reqData = await res.json()
        if (res.ok) {
            if (!reqData?.error) {
                type === 'cat' ? alert.showSuccess('Category deleted successfully') : alert.showSuccess('Tag deleted successfully')
                return {
                    ...data,
                    catOrTags: data.catOrTags.filter((c) => c.id !== id)
                }
            } else {
                alert.showError(reqData?.error || 'Something went wrong')
            }
        } else {
            alert.showError(reqData?.error || 'Something went wrong')
        }
        return []
    } catch (err) {
        alert.showError('API network error')
        return []
    }
}