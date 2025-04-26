import React from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import Chart from 'react-apexcharts';
import { Avatar } from "@nextui-org/react";


const module1Data = [
    { name: 'Intro 1', value: 40 },
    { name: 'Intro 2', value: 22 },
    { name: 'Intro 3', value: 11 },
];

export default function userDhashbord() {
    let defaultDate = today(getLocalTimeZone());
    let [focusedDate, setFocusedDate] = React.useState(defaultDate);

    const module1Values = module1Data.map(data => data.value);
    const module1Labels = module1Data.map(data => data.name);
    return (
        <div className="w-full mt-20 flex flex-col lg:flex-row">
              <div className="w-[100vw] lg:w-[60px]  bg-[#accbff] h-[60px] lg:h-[96vh] rounded-md mt-4 "></div>
              
            <div className="flex flex-wrap w-[100%]">
                <div className="bg-[#9f9f9f] m-4 rounded-md">
                    {/* 1st card */}
                    <div className="p-6 bg-[#f1f1f1] w-[300px] rounded-lg m-4">
                        <div className="flex text-3xl font-bold ">
                            <div className="pr-2 ">Hi!</div> <div>John</div>
                        </div>
                        <div className="text-xl font-semibold text-[#767676] pb-6">How're you?</div>
                        <div className="text-[#767676]"> <div>We have new</div> <div>Workshops for you</div></div>
                    </div>
                    {/* 2nd card */}
                    <div className="bg-[#f1f1f1] m-4 w-[300px] rounded-lg">
                        {/*  */}
                        <div className="p-6">
                            <Avatar className="p-2" showFallback src='https://images.unsplash.com/broken' />
                            <div className="text-xl font-bold">Members Joined</div>
                            <div className="text-[#767676]">You have new friends in community, See who is there?</div>
                        </div>
                        {/*  */}
                        <div className="p-6">
                            <Avatar showFallback src='https://images.unsplash.com/broken' />
                            <div className="text-xl font-bold">Members Joined</div>
                            <div className="text-[#767676]"> You have new friends in community, See who is there?</div>
                        </div>

                    </div>
                </div>

                <div className=" flex flex-col lg:flex-row bg-[#9f9f9f] m-4 rounded-md ">
                    {/* 3rd card */}
                    <div className="bg-[#f1f1f1] m-4 rounded-lg p-4 w-[95%]">
                        <div className="text-3xl font-bold p-4">Growth</div>
                        <Chart
                            type="donut"
                            width={400}
                            height={400}
                            series={module1Values}

                            options={{
                                labels: module1Labels,
                                plotOptions: {
                                    pie: {
                                        donut: {
                                            labels: {
                                                show: true,
                                                total: {
                                                    show: true,
                                                    fontSize: '20px',
                                                    color: 'black',
                                                },
                                            },
                                        },
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                legend: {
                                    show: true,
                                    position: 'bottom',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    labels: {
                                        colors: ['#000'],
                                        useSeriesColors: false,
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    },
                                    markers: {
                                        width: 12,
                                        height: 12,
                                        radius: 0,
                                    },
                                    itemMargin: {
                                        vertical: 5,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="bg-[#f1f1f1] m-4 rounded-lg p-4  w-[95%]">
                        <div className="text-3xl font-bold pb-4">Calendar</div>
                        <Calendar
                            aria-label="Date (Controlled Focused Value)"
                            focusedValue={focusedDate}
                            value={defaultDate}
                            onFocusChange={setFocusedDate}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
