import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlayCircleIcon } from "lucide-react";

export default function DemoButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          variant={"outline"}
          className="flex h-12 w-full items-center text-center text-primary max-md:max-w-96 md:max-xl:h-16 xl:max-w-fit"
        >
          <PlayCircleIcon className="mr-3 h-5 w-5" /> Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="aspect-video w-full border-none bg-transparent shadow-none md:min-w-[250px] lg:min-w-[700px] xl:min-w-[950px] 2xl:min-w-[1280px]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/toD6r-vIa5I"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
