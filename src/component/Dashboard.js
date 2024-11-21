import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbShoppingCartCopy, TbShoppingCartX } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faBullseye, faUtensils,faBurger } from '@fortawesome/free-solid-svg-icons';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import Barchart from '../ReusableComponents/Barchart';
import ronald from '../Assets/ronald.jpg';
import kristinwtson from '../Assets/kristinwatson.jpg';
import janecooper from '../Assets/janecooper.jpg';
import guyhawkins from '../Assets/guyhawkins.jpg';
import codyfisher from '../Assets/codyfisher.jpg';
import warren from '../Assets/warren.jpg'





const Dashboard = () => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [popularDishesOpen, setPopularDishesOpen] = useState(false);
  const [menusOpen, setMenusOpen] = useState(false);
  const percentage = 70;

  


  return (
    <div className="p-1  ">
      <div className="text-2xl font-bold mb-4 ">Dashboard</div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-6">

        <div className="shadow-2xl border  container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-1">
          <div className='bg-blue-950 rounded-lg w-9 p-2 flex items-center justify-center'>
            <MdOutlineAddShoppingCart size='2xl' style={{ color: "#74C0FC", }} />
          </div>
          <div className="">Total Orders</div>
          <div className='flex justify-between items-center '>
            <div className="text-3xl font-bold ">75</div>
            <div className="text-green-400">▲ 3%</div>
          </div>
        </div>

        <div className="border shadow-2xl  container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <div className='bg-green-500 bg-opacity-25 rounded-lg w-9 p-2 flex items-center justify-center'>
            <TbShoppingCartCopy size='2xl' style={{ color: "#079167", }} />
          </div>
          <div className="">Total Delivered</div>
          <div className='flex justify-between items-center '>
            <div className="text-3xl font-bold ">70</div>
            <div className="text-red-400">▼ 3%</div>
          </div>
        </div>

        <div className=" border shadow-2xl  container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-1">
          <div className='bg-red-800 bg-opacity-50 rounded-lg w-9 p-2 flex items-center justify-center'>
            <TbShoppingCartX size='2xl' style={{ color: "#b82534", }} />
          </div>
          <div className=" ">Total Cancelled</div>
          <div className='flex justify-between items-center '>
            <div className="text-3xl font-bold ">5</div>
            <div className="text-green-400">▲ 3%</div>
          </div>
        </div>

        <div className="border shadow-2xl container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <div className='bg-pink-700 bg-opacity-30 rounded-lg w-9 p-2 flex items-center justify-center'>
            <FontAwesomeIcon icon={faHandHoldingDollar} style={{ color: "#e53ec6", }} />

          </div>
          <div className="">Total Revenue</div>
          <div className='flex justify-between items-center '>
            <div className="text-3xl font-bold ">$12k</div>
            <div className="text-red-400">▼ 3%</div>
          </div>
        </div>

        <div className="border   shadow-2xl container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-5 xl:col-span-2  ">
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
              <div className="">Net Profit</div>
              <div className="text-3xl font-bold ">$6759.25</div>
              <div className="text-green-400">▲ 3%</div>
            </div>
            <div className='flex flex-col  items-center '>
              <div style={{ width: 100, height: 100 }} >
                <CircularProgressbar value={percentage} text={`${percentage}%`} /> </div>
              <div className=' text-sm flex justify-end'>The value has been rounded off.</div>
            </div>
          </div>
        </div>


      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Activity Section */}
        <div className="shadow-2xl  border container shadow-gray-200  p-6 rounded-lg col-span-2 sm:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-center mb-0">
            <div className=" font-bold text-xl">Activity</div>
            <div className='flex gap-2 bg-slate-200  opacity-100 w-24 items-center justify-center rounded-xl'><div className="">Weekly</div>
              <div className="">▼</div></div>

          </div>
          <div className="shadow-md container border shadow-gray-300  rounded mt-3 h-40 w-full  flex justify-center items-center ">
            <Barchart />

          </div>
        </div>

        {/* Goals Section */}
        <div className="shadow-2xl border container shadow-gray-200 p-6 rounded-lg col-span-2 lg:col-span-1 sm:grid-cols-2">

          {/* Goal */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className='bg-red-400 bg-opacity-25 rounded-3xl w-12 p-2 flex items-center justify-center'>
                <FontAwesomeIcon icon={faBullseye} className="text-orange-400 text-3xl" />
              </div>
              <div className=" p-4 rounded flex-1">Goals</div>
              <button onClick={() => setGoalsOpen(!goalsOpen)} className="">
                {goalsOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>
            </div>

            {/* popular dishes */}
            <div className="flex items-center space-x-2">
              <div className='bg-blue-800 bg-opacity-25 rounded-3xl w-12 p-2 flex items-center justify-center'>
                <FontAwesomeIcon  icon={faBurger} style={{ color: "#1663e9", }} className='text-3xl' />
              </div>
              <div className=" p-4 rounded flex-1">Popular Dishes </div>
              <button onClick={() => setPopularDishesOpen(!popularDishesOpen)} className="">
                {popularDishesOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>
            </div>

            {/* menus */}
            <div className="flex items-center space-x-2">
              <div className='bg-green-500 bg-opacity-25 rounded-3xl w-12 p-2 flex items-center justify-center'>
                <FontAwesomeIcon icon={faUtensils} className="text-green-500  text-3xl" />
              </div>
              <div className=" p-4 rounded flex-1">Menus</div>
              <button onClick={() => setMenusOpen(!menusOpen)} className="">
                {menusOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>

            </div>

          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="shadow-2xl border container shadow-gray-200 p-6 rounded-lg col-span-1 sm:col-span-2 lg:col-span-2">
          <div className=" font-bold text-xl mb-4">Recent Orders</div>
          <div className="space-y-4">
            <div className="grid grid-cols-5  text-sm font-bold pb-2 border-b border-gray-700 mb-2">
              <div className='col-span-2'>Customer</div>
              <div>Order No</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {[
              { customer: 'Ronald Richards',image:ronald, orderNo: '154782456', amount: '$124.00', status: 'Delivered' },
              { customer: 'Cody Fisher',image:codyfisher, orderNo: '48965786', amount: '$365.02', status: 'Pending' },
              { customer: 'Bessie Cooper',image: warren, orderNo: '78958215', amount: '$45.88', status: 'Cancelled' },
              { customer: 'kristin watson',image:kristinwtson, orderNo: '20965732', amount: '$65.00', status: 'Delivered' },
              { customer: 'jane cooper ',image: janecooper, orderNo: '95715620', amount: '$545.00', status: 'Pending' },
              { customer: 'guy hawkins ',image:guyhawkins, orderNo: '78514568', amount: '$128.20', status: 'Cancelled' },
            ].map((order, index) => (
              <div key={index} className="grid grid-cols-5 items-center  pb-2 mb-2 border-b border-gray-700">
                <div className="flex items-center space-x-4 col-span-2">
                  <img src={order.image} alt={`${order.customer}'s avatar`} className="w-8 h-8 rounded-full" />
                  <div>{order.customer}</div>
                </div>
                <div>{order.orderNo}</div>
                <div>{order.amount}</div>
                <div className={`rounded text-xs w-16 text-center p-1 ${order.status === 'Delivered' ? 'bg-green-500 bg-opacity-25 text-green-500' : order.status === 'Pending' ? 'bg-red-400 bg-opacity-25 text-orange-400' : 'bg-red-400 opacity-50 text-black'}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer's Feedback Section */}
        <div className="shadow-2xl border container shadow-gray-200 p-6 rounded-lg col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="text-xl font-bold mb-4 ">Customer's Feedback</div>
          <div className="space-y-4 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
            {[
              {
                name: 'Jenny Wilson',
                feedback: 'The food was excellent and so was the service. I had the mushroom risotto with scallops which was awesome. I had a burger over greens (gluten-free) which was also very good. They were very conscientious about gluten allergies.',
                rating: '★★★★★',
                avatar: guyhawkins
              },
              {
                name: 'Dianne Russell',
                feedback: 'We enjoyed the Eggs Benedict served on homemade focaccia bread and hot coffee. Perfect service.',
                rating: '★★★★★',
                avatar: codyfisher
              },
              {
                name: 'Devon Lane',
                feedback: 'Normally wings are wings, but theirs are lean meaty and tender, and perfectly seasoned. We will return for sure!',
                rating: '★★★★★',
                avatar: warren
              }
            ].map((customer, index) => (
              <div key={index} className='border-b border-gray-700 pb-2 mb-2'>
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={customer.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="">{customer.name}</div>
                  <div className="text-yellow-400">{customer.rating}</div>
                </div>
                <div className="text-gray-400 text-sm">
                  {customer.feedback}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
