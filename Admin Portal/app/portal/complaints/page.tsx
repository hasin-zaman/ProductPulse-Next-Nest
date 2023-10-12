'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIPagination from '@components/mui/muiPagination';
import { useRouter } from 'next/navigation';
import MUISelect from '@components/mui/muiSelect';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [value, setValue] = useState('');
  const [lastCall, setLastCall] = useState('');

  const router=useRouter();

  const items = ['all', 'type', 'status', 'state', 'complaintOffice', 'complaintAgainst'];
  const type = ['general', 'child_related'];
  const status = ['unread', 'in_process', 'resolved'];
  const state = ['new', 'pending', 'critical'];
  const complaintOffice = [
    "karachi_central",
    "karachi_east",
    "karachi_south",
    "thatta",
    "sukkur",
    "hyderabad",
    "badin",
    "naushahro_feroze",
    "larkana",
    "mirpurkhas",
    "mithi",
    "jacobabad",
    "dadu",
    "nawabshah",
    "khairpur",
    "ghotki"
  ];
  const complaintAgainst = [
    "accountant_general_sindh",
    "agriculture_supply_and_prices_department",
    "auqaf_religious_affairs_zakat_and_ushr_department",
    "benazir_bhutto_shaheed_human_resource_research_and_development_board",
    "cooperation_department",
    "culture_tourism_and_antiquities_department",
    "education_and_literacy_department_colleges_education",
    "education_and_literacy_department_schools_education",
    "energy_department",
    "enquiries_and_anti_corruption_establishment",
    "environment_climate_change_and_costal_development_department",
    "environmental_alternate_energy",
    "excise_taxation_and_narcotics_department",
    "finance_department",
    "forest_and_wildlife_department",
    "food_department",
    "health_department",
    "home_department",
    "human_rights_department",
    "industries_and_commerce_department",
    "information_and_archives_department",
    "information_science_and_technology_department",
    "irrigation_department",
    "karachi_municipal_corporation",
    "karachi_development_authority",
    "karachi_water_and_sewerage_board",
    "katchi_abadies_and_spatial_development",
    "labour_and_human_resources_department",
    "law_and_parliamentary_affairs_department",
    "livestock_and_fisheries_department",
    "local_government_and_housing_town_planning_department",
    "lyari_development_authority",
    "mali_development_authority",
    "mines_and_mineral_development_department",
    "minorities_affairs_department",
    "planning_and_development_department",
    "police_department",
    "population_and_welfare_department",
    "power_department",
    "public_health_engineering_and_rural_development_department",
    "revenue_department",
    "services_general_administration_and_coordination_department",
    "sindh_building_control_authority",
    "sindh_employee_social_security_institution",
    "sindh_higher_education_commission_karachi",
    "sindh_public_service_commission",
    "social_welfare_department",
    "special_education_department",
    "sport_and_youth_affairs_department",
    "transport_and_mass_transit_department",
    "women_development_department",
    "work_and_services_department"
  ];  

  const getComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:3001/complaints', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setComplaints(res.data.complaints);
      setPages(res.data.totalPages);
      setLastCall('getComplaints');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterComplaints = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/complaints/filter/${filter}/${value}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setComplaints(res.data.complaints);
      setLastCall('filterComplaints');
      setPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange=async (e: any) => {
    setFilter(e.target.value);
  }

  const handleValueChange=async (e: any) => {
    setValue(e.target.value);
  }

  const changePage=async (e: any, page: any) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);

  useEffect(() => {
    if(filter=='all') {
      setValue('');
      getComplaints();
    }
  }, [filter]);

  useEffect(() => {
    if(value!='') {
      filterComplaints();
    }
  }, [value]);

  useEffect(() => {
    if(lastCall=='getComplaints') {
      getComplaints();
    }
    else {
      filterComplaints();
    }
  }, [currentPage]);

  return (
    <>
    <table className='w-full h-full border-separate border-spacing-y-4'>
      <thead>
        <tr className='text-white text-center'>
          <th>Id</th>
          <th>Type</th>
          <th>Subject</th>
          <th>Complaint Office</th>
          <th>Complaint Against</th>
          <th>User</th>
          <th>Status</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
      {
        complaints.length>0 && complaints.map((complaint: any) => (
          <tr key={complaint.complaintId} className='bg-slate-50 text-center cursor-pointer hover:bg-green-200' onClick={()=>router.push(`/portal/complaints/${complaint.complaintId}`)}>
            <td className='py-3 px-4 text-gray-900 bg-gray-200'>{complaint.complaintId}</td>
            <td className='py-6 px-2 text-gray-900'>{complaint.type}</td>
            <td className='py-6 px-2 text-gray-900'>{complaint.subject}</td>
            <td className='py-6 px-2 text-gray-900'>{complaint.complaintOffice}</td>
            <td className='py-6 px-2 text-gray-900'>{complaint.complaintAgainst}</td>
            <td className='py-6 px-2 text-gray-900'>{complaint.user.cnic}</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${complaint.status=='unread' ? 'bg-yellow-600/50 text-yellow-900' : complaint.status=='in_process' ? 'bg-blue-600/50 text-blue-900' : 'bg-green-600/50 text-green-900'}`}>
                {complaint.status}
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${complaint.state=='new' ? 'bg-green-600/50 text-green-900' : complaint.state=='pending' ? 'bg-blue-600/50 text-blue-900' : 'bg-red-600/50 text-red-900'}`}>
                {complaint.state}
              </span>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
    <div className='flex justify-between'>
      <div className='flex gap-5'>
        <MUISelect items={items} label='Filter' value={filter} handleChange={handleFilterChange}/>
        <MUISelect label='Value' value={value} handleChange={handleValueChange} items={filter=='type' ? type : filter=='status' ? status : filter=='state' ? state : filter=='complaintOffice' ? complaintOffice : filter=='complaintAgainst' ? complaintAgainst : null} />
      </div>
      <MUIPagination count={pages} changePage={changePage} />
    </div>
    </>
  )
}

export default Complaints