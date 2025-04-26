import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getData } from "../components/core/apiHandler";
import { Link } from "react-router-dom";
import { CardComp } from "../components/common/CardComp";

import connectImg from "../assets/connet.png";
import workerImg from "../assets/worker.png";
import locationImg from "../assets/location.png";

import { Card, Image } from "@nextui-org/react";

const cards = [1, 2, 3, 4];

const cardData = [
  {
    image:
      "https://images.stockcake.com/public/3/3/7/3378395b-b8d8-41c8-9f15-a8b7a749f7e8_large/laborer-carrying-bricks-stockcake.jpg",
    title: "Labour Near you ",
    buttonText: "Search",
  },
  {
    image:
      "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/06/13/692705-manhole-sanitation-worker-061318.jpg",
    title: "sewage Cleaner Near you",
    buttonText: "Search",
  },
  {
    image:
      "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/7/2016/07/23072016-Mydidi.jpg?w=1200&h=628&fill=blur&fit=fill",
    title: "Maid Near you ",
    buttonText: "Search",
  },
  {
    image:
      "https://5.imimg.com/data5/CK/UH/MY-18670250/wall-painting-service.jpg",
    title: "Wall Painter Near you",
    buttonText: "Search",
  },
];

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //   const first = useQuery({
  //     queryKey:["get request"],
  //     queryFn:async()=>{
  //       return await getData("http://example.com/articles",{},{});
  //     }
  //   })
  // console.log(first.data.data);
  return (
    <>
      <div className=" min-h-screen flex items-center justify-center">
        <div className="text-center px-10 space-y-8">
          <h1 className="font-qs text-3xl md:text-6xl font-semibold my-auto ">
            Connecting Local Service <br></br> Providers with the Community
          </h1>
          <p className=" text-xl md:text-2xl text-richblack-400  mx-auto">
            Your Go-To Platform for Reliable and Skilled Service Providers in
            Your Area
          </p>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 justify-center  items-center">
            <Link to="/register">
              <Button className="bg-richblack-800 text-white rounded-xl p-6 text-xl">
                Find a Service Provider
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-richblack-800 text-white rounded-xl p-6 text-xl">
                Become a Service Provider
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="font-qs flex flex-col items-center mx-auto w-full text-center bg-white  ">
        <h1 className="text-5xl font-bold p-6">How it works</h1>

        <div className="flex flex-col md:flex-row   w-full  justify-around p-6">
          <div className="flex flex-col items-center p-4 md:p-6 ">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none shadow-lg "
            >
              <Image
                alt="Woman listening to music"
                className="object-cover rounded-t-lg "
                height={200}
                src={locationImg}
                width={200}
              />
            </Card>
            <h2 className="mt-4 text-xl font-semibold">
              Step 1 :Enter your Location
            </h2>
          </div>

          <div className="flex flex-col items-center p-4 md:p-6">
            <Card isFooterBlurred radius="lg" className="border-none shadow-lg">
              <Image
                alt="Service Selection"
                className="object-cover rounded-t-lg"
                height={200}
                src={workerImg}
                width={200}
              />
            </Card>
            <h2 className="mt-4 text-xl font-semibold">
              Step 2 :Choose a Service
            </h2>
          </div>

          <div className="flex flex-col items-center p-4 md:p-6">
            <Card isFooterBlurred radius="lg" className="border-none shadow-lg">
              <Image
                alt="Service Provider"
                className="object-cover rounded-t-lg"
                height={200}
                src={connectImg}
                width={200}
              />
            </Card>
            <h2 className="mt-4 text-xl font-semibold">
              Step 2 :Connect with a Provider
            </h2>
          </div>
        </div>
      </div>

      {/* section 1 
        <div className="flex flex-col items-center mt-10 ">
          <h1 className="text-5xl font-semibold p-4">
            Connecting Local Service Providers with the Community
          </h1>
          <p className="w-[60%] text-center text-richblack-400">
            Your one-stop platform for reliable services
          </p>
          <Link to="/login">
            <Button className="bg-richblack-800 m-4 text-white rounded-[30px]">
              Find a Service Provider
            </Button>
          </Link>
        </div>
        */}

      <div className="font-qs flex flex-col gap-4 py-4">
        <h1 className=" text-5xl font-bold p-6">Top Services</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mx-auto">
          {cardData.map((card, index) => (
            <CardComp
              key={index}
              image={card.image}
              title={card.title}
              buttonText={card.buttonText}
            />
          ))}
        </div>
        <div className="mx-auto">
          <button className="py-4 text-white bg-black p-6 shadow-lg font-semibold rounded-lg">
            View all categories &rarr;
          </button>
        </div>
      </div>
    </>
  );
}
