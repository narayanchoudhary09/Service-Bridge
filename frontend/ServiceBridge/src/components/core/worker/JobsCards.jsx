import React from 'react';
import { Card, Image, CardBody } from "@nextui-org/react";

const JobCard = ({ job }) => {
  if (!job) return null;
  console.log(job);
  return (
    <Card shadow='xl' className='w-[100%] h-fit  font-qs lg:w-[70%]'>
      <CardBody className='flex gap-4 flex-col h-full'>
        <Image src={job.images[0]} className='h-1/2' alt='job image' />
        <div className='flex flex-col gap-3 w-full justify-start'>
          <h3 className='text-xl lg:text-2xl font-bold'>{job.name}</h3>
          <div className='flex flex-row justify-between w-full'>
            <h3 className='text-lg font-semibold'>Rs {job.price}</h3>
            <h3 className='text-lg font-bold'>{job.minHour} hr - {job.maxHour} hr</h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
