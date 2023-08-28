import {CloudinaryImage} from "@/components/cloudinary-image";
import {ImageGrid} from "@/components/image-grid";
import {SearchResult} from "@/app/gallery/page";

export function GalleryGrid({images} : {images: SearchResult[]}) {
    return (
        <ImageGrid
            images={images}
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
                    />
                )
            }
            }
        />
    )
}