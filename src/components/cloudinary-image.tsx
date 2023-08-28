'use client'
import {CldImage, CldImageProps} from 'next-cloudinary';
import {Heart} from "@/components/icons/heart";
import {setAsFavoriteAction} from "@/app/gallery/actions";
import {useState, useTransition} from "react";
import {SearchResult} from "@/app/gallery/page";
import {FullHeart} from "@/components/icons/full-heart";
import {ImageMenu} from "@/components/image-menu";

type Props = {
    imageData: SearchResult,
    onUnheart?: (unheratedResource: SearchResult) => void
} & Omit<CldImageProps, 'src'>

export function CloudinaryImage(props: Props) {
    const [, startTransition] = useTransition()
    const [isFavorite, setIsFavorite] = useState(props?.imageData.tags?.includes('favorite'))

    return (
        <div className={'relative'}>
            <CldImage {...props}
                      src={props.imageData.public_id}
                      alt={'some alt'}
            />

            {isFavorite ?
                <FullHeart
                    className={'absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer'}
                    onClick={() => {
                        setIsFavorite(false)
                        props?.onUnheart?.(props.imageData)
                        startTransition(() => {
                            setAsFavoriteAction(props.imageData.public_id, false).catch()
                        })
                    }}
                />
                :
                <Heart
                    className={'absolute top-2 left-2 hover:text-red-500 cursor-pointer'}
                    onClick={() => {
                        setIsFavorite(true)
                        startTransition(() => {
                            setAsFavoriteAction(props.imageData.public_id, true).catch()
                        })
                    }}
                />
            }
            <ImageMenu image={props.imageData}/>
        </div>
    )

}