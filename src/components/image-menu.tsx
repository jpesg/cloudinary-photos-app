import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Button} from "@/components/ui/button";
import {Menu} from "@/components/icons/menu";
import {AddToAlbumDialog} from "@/components/add-to-album-dialog";
import {SearchResult} from "@/app/gallery/page";
import {useState} from "react";
import Link from "next/link";
import {Pencil} from "lucide-react";

export function ImageMenu({image}: { image: SearchResult }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={'absolute top-2 right-2'}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className={'w-8 h-8 p-0'}>
                        <Menu/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem asChild>
                        <AddToAlbumDialog
                            onClose={() => setOpen(false)}
                            image={image}
                        />
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button
                            className={'cursor-pointer flex justify-start pl-4'}
                            variant={'ghost'} asChild
                        >
                            <Link
                                href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}>
                                <Pencil className={'mr-2 w-4 h-4'}/>
                                Edit
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}