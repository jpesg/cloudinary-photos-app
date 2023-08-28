import cloudinary from 'cloudinary'
import {AlbumGrid} from "@/app/albums/[albumName]/album-grid";

export type SearchResult = {
    public_id: string
    tags: string[]
}
type Props = {
    params: {
        albumName: string
    }
}
export default async function AlbumDetailsPage(props: Props) {
    const {params: {albumName}} = props
    const results = (await cloudinary.v2.search
        .expression(`resource_type:image AND folder=${albumName}`)
        .with_field('tags')
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute()) as { resources: SearchResult[] }


    return <section>
        <div className={'flex flex-col gap-8'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-4xl font-bold'}>Album {albumName}</h1>
            </div>
            <AlbumGrid images={results.resources}/>
        </div>
    </section>
}