import {SearchResult} from "@/app/gallery/page";
import {ReactNode} from "react";

const MAX_COLUMNS = 4
const getColumns = (images: SearchResult[], colIndex: number) =>
    images.filter((resource, index) => {
            return index % MAX_COLUMNS === colIndex
        }
    )

export function ImageGrid({images, getImage}: { images: SearchResult[], getImage: (image: SearchResult)=> ReactNode }) {

    return (
        <div className={'grid grid-cols-4 gap-4'}>
            {[
                getColumns(images, 0),
                getColumns(images, 1),
                getColumns(images, 2),
                getColumns(images, 3),
            ].map((column, idx) => <div key={idx} className={'flex flex-col gap-4'}>
                {
                    column.map(getImage)
                }
            </div>)}

        </div>
    )
}