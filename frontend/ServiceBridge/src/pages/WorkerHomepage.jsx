import React, { useState, useEffect } from 'react';
import JobCard from '../components/core/worker/JobsCards';
import { Spinner } from "@nextui-org/react";
import { Tabs } from "@nextui-org/tabs";
import { useQuery } from "@tanstack/react-query"; // Ensure this is used if needed

import imgagedummy from "../assets/signupImg.jpg"; // Assuming this is a placeholder image
import { getData } from '../components/core/apiHandler'; // Adjust path as needed
import { getCategoryAll } from '../services/api';

const dummyCategories = [
  { _id: '1', name: 'Category1' },
  { _id: '2', name: 'Category2' },
  { _id: '3', name: 'Category3' }
];

const dummyJobs = [
  {
    _id: '1',
    name: 'Job 1',
    description: 'Description for job 1',
    images: [imgagedummy],
    categoryId: '1',
    price: 100,
    minHour: 1,
    maxHour: 5
  },
  {
    _id: '2',
    name: 'Job 2',
    description: 'Description for job 2',
    images: [imgagedummy],
    categoryId: '2',
    price: 200,
    minHour: 2,
    maxHour: 6
  },
  {
    _id: '3',
    name: 'Job 3',
    description: 'Description for job 3',
    images: [imgagedummy],
    categoryId: '1',
    price: 150,
    minHour: 1,
    maxHour: 4
  },
  {
    _id: '4',
    name: 'Job 4',
    description: 'Description for job 3',
    images: [imgagedummy],
    categoryId: '1',
    price: 150,
    minHour: 1,
    maxHour: 4
  }
];

const WorkerHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { data: getCategory, isLoading: isLoadingGetCategory } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => {
      return getData(getCategoryAll, {});
    }
  })
  console.log(getCategory);
  useEffect(() => {
    // Simulating fetching jobs from an API
    const fetchJobs = async () => {
      try {
        // Replace with actual API call to fetch jobs
        // const response = await getData('/jobs');
        // setJobs(response.data);
        setJobs(dummyJobs); // Replace with actual fetched data
        setLoadingJobs(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoadingJobs(false);
      }
    };

    // Simulating fetching categories from an API
    const fetchCategories = async () => {
      try {
        // Replace with actual API call to fetch categories
        // const response = await getData('/categories');
        // setCategories(response.data);
        setCategories(dummyCategories); // Replace with actual fetched data
        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      }
    };

    fetchJobs();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter jobs based on selected category
    if (currentCategory === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.categoryId === currentCategory));
    }
  }, [currentCategory, jobs]);

  const handleCategoryChange = (key) => {
    setCurrentCategory(key);
  };

  if (loadingJobs || loadingCategories) {
    return (
      <div style={{ padding: '20px' }}>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-rows-auto gap-[1rem] items-center md:grid-rows-0 md:grid-cols-3 w-full'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p>No jobs available for this category.</p>
        )}
      </div>
    </>
  );
};

export default WorkerHomePage;
