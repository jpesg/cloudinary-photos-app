import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FolderPlus} from "lucide-react";
import {useState} from "react";
import {SearchResult} from "@/app/gallery/page";
import {addImageToAlbum} from "@/components/actions";

export function AddToAlbumDialog({image, onClose}: { image: SearchResult, onClose: () => void }) {
    const [albumName, setAlbumName] = useState('')
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={(newOpenState) => {
            if(!newOpenState){
                onClose()
            }
            setOpen(newOpenState)

        }}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <FolderPlus className="mr-2 h-4 w-4"/>
                    <span>Add to Album</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add to Album</DialogTitle>
                    <DialogDescription>
                        Type an album you want to move this image into
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="album-name" className="text-right">
                            Album
                        </Label>
                        <Input
                            id="album-name"
                            value={albumName}
                            className="col-span-3"
                            onChange={e => setAlbumName(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={async () => {
                            onClose()
                            setOpen(false)
                            await addImageToAlbum(albumName, image)
                        }}
                    >Add to Album
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
