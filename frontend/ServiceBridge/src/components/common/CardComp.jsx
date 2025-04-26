import React from "react";
import { Card, CardFooter, Image, Button, Skeleton } from "@nextui-org/react";

export const CardComp = ({ image, title, buttonText }) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
      width="400px" // Increased width
      height="400px" // Increased height
    >
      <Skeleton className="rounded-lg"></Skeleton>
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={400} // Increased height
        src={image}
        width={300} // Increased width
      />
      <Skeleton />

      <CardFooter className="font-qs justify-between bg-white/70 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-2xl ml-1 z-10">
        <p className=" text-black font-qs text-md font-semibold">{title}</p>
        <Button
          className="text-tiny text-white bg-caribbeangreen-500"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
