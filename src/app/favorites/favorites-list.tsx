'use client'
import {CloudinaryImage} from "@/components/cloudinary-image";
import {SearchResult} from "@/app/gallery/page";
import {useEffect, useState} from "react";
import {ImageGrid} from "@/components/image-grid";

export default function FavoritesList({initialResources}: { initialResources: SearchResult[] }) {
    const [resources, setResources] = useState(initialResources)
    useEffect(() => {
        setResources(initialResources)
    }, [initialResources])

    return (
        <ImageGrid
            images={resources}
            getImage={(img: SearchResult) => {
                return (
                    <CloudinaryImage
                        key={img.public_id}
                        imageData={{
                            public_id: img.public_id,
                            tags: img.tags
                        }}
                        width="400"
                        height="300"
                        alt={"an image of something"}
                        onUnheart={(unHeartedResource: SearchResult) =>
                            setResources((current) =>
                                current.filter(resource => resource.public_id !== unHeartedResource.public_id
                                )
                            )}
                    />
                )
            }
            }
        />
    )
}