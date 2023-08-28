'use client'

import {CldImage} from 'next-cloudinary';
import {Button} from "@/components/ui/button";
import {useState} from "react";

type Props = {
    searchParams: { publicId: string }
}
type Transformation = 'clear-all' | 'grayscale' | 'generative-fill' | 'blur'


export default function EditPage(props: Props) {
    const {searchParams: {publicId}} = props
    //const [transformation, setTransformation] = useState<undefined | 'grayscale' | 'generative-fill' | 'blur'>()
    const [transformation, setTransformation] = useState<Map<Transformation, boolean>>(new Map())
    const configurations: Record<Transformation, Object | null> = {
        'clear-all': null,
        blur: {
            blur: '1200'
        },
        grayscale: {
            grayscale: true
        },
        'generative-fill': {
            crop: 'pad',
            fillBackground: true
        }
    }

    const handleTransformation = (t: Transformation) => {
        if (t === 'clear-all') {
            setTransformation(new Map())
            return
        }
        const transformationState = transformation.get(t) ?? false
        const newMap = transformation.set(t, !transformationState)
        setTransformation(new Map(newMap))
    }

    let transforms = {}
    transformation.forEach((value, key) => {
        if (key !== 'clear-all' && value) {
            transforms = {...transforms, ...configurations[key]}
        }
    })

    return <section>
        <div className={'flex flex-col gap-8'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-4xl font-bold'}>EDIT {publicId}</h1>
            </div>
            <div className={'flex gap-4'}>
                <Button onClick={() => handleTransformation('clear-all')}>Clear All</Button>
                <Button onClick={() => handleTransformation('generative-fill')}>Apply Generative Fill</Button>
                <Button onClick={() => handleTransformation('blur')}>Apply Blur</Button>
                <Button onClick={() => handleTransformation('grayscale')}>Apply Gray Scale</Button>
            </div>

            <div className={'grid grid-cols-2 gap-12'}>
                <CldImage
                    src={publicId}
                    alt={'some alt'}
                    width={'400'}
                    height={'400'}
                />
                <CldImage
                    src={publicId}
                    alt={'some alt'}
                    width={'400'}
                    height={'400'}
                    {...transforms}
                />
                {/*
                    transformation === 'generative-fill' &&
                    <CldImage
                        src={publicId}
                        alt={'some alt'}
                        width={'400'}
                        height={'400'}
                        crop={'pad'}
                        fillBackground
                    />
                }
                {
                    transformation === 'blur' &&
                    <CldImage
                        src={publicId}
                        alt={'some alt'}
                        width={'400'}
                        height={'400'}
                        blur={'1200'}
                    />
                }   {
                    transformation === 'grayscale' &&
                    <CldImage
                        src={publicId}
                        alt={'some alt'}
                        width={'400'}
                        height={'400'}
                        grayscale
                    />
               */}
            </div>
        </div>
    </section>
}