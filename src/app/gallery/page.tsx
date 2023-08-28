import UploadButton from "@/app/gallery/upload-button";
import cloudinary from 'cloudinary'
import {GalleryGrid} from "@/app/gallery/gallery-grid";
import {SearchForm} from "@/app/gallery/search-form";

export type SearchResult = {
    public_id: string
    tags: string[]
}
type Props = {
    searchParams: {
        search: string
    }
}
export default async function GalleryPage(props: Props) {
    const {searchParams: {search}} = props
    console.log({search})
    const results = (await cloudinary.v2.search
        .expression(`resource_type:image ${search ? `AND tags=${search}` : ''}`)
        .with_field('tags')
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute()) as { resources: SearchResult[] }


    return <section>
        <div className={'flex flex-col gap-8'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-4xl font-bold'}>GALLERY</h1>
                <UploadButton/>
            </div>
            <SearchForm initialSearch={search}/>
            <GalleryGrid images={results.resources}/>
        </div>
    </section>
}