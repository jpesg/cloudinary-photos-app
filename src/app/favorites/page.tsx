import cloudinary from 'cloudinary'
import {SearchResult} from "@/app/gallery/page";
import {ForceRefresh} from "@/components/force-refresh";
import FavoritesList from "@/app/favorites/favorites-list";


export default async function FavoritesPage() {
    const results = (await cloudinary.v2.search
        .expression('resource_type:image AND tags="favorite"')
        .with_field('tags')
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute()) as { resources: SearchResult[] }

    return <section>
        <ForceRefresh/>
        <div className={'flex flex-col gap-8'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-4xl font-bold'}>FAVORITE IMAGES</h1>
            </div>
            <FavoritesList initialResources={results.resources}/>
        </div>
    </section>
}