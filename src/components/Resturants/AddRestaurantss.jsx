import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Trash2 } from 'lucide-react';

function AddRestaurantss() {
    const [menu, setMenu] = useState([{ menu: "", price: "" }]);

    const handleAddMenu = () => {
    setMenu([...menu, { menu: "", price: "" }]);
    };

    const handleDeleteMenu = (index) => {
    const updatedMenu = [...menu];  // copy to avoid direct mutation
    updatedMenu.splice(index, 1);   // remove 1 item at that index
    setMenu(updatedMenu);
    };

  return (
    <>
        <Navbar/>
        <div className='bg-[white] mt-[90px] flex justify-center items-center py-[50px]'>
            <div className='w-[800px] drop-shadow-2xl bg-[white] border border-[#a4a4a4] p-[20px] rounded-[6px] '>
                <h2 className='text-black text-center'>Add Restaurants</h2>
                <div className='flex flex-col gap-2.5'>
                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Restaurant Name</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Description</label>
                        <textarea
                        name="description"
                        required
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] min-h-[100px]'
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>State</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Address</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>City</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Cordinates</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>
                    
                    {/* open & close time */}
                    <div className='flex gap-3'>    
                        <div className='flex flex-col gap-[5px] w-[50%]'>
                            <label className='font-semibold text-[16px] text-[#4a4a4a]'>Open Time</label>
                            <input
                            className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                            type="text"
                            name="name"
                            required
                            />
                        </div>

                        <div className='flex flex-col gap-[5px] w-[50%]'>
                            <label className='font-semibold text-[16px] text-[#4a4a4a]'>Close Time</label>
                            <input
                            className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                            type="text"
                            name="name"
                            required
                            />
                        </div>
                    </div>

                    {/* menu Item */}
                    <div className='flex gap-[5px] mb-[10px] w-[100%] border flex-col'>
                        <h3 className='text-black font-semibold'>Menu Items</h3>
                        {menu.map((item,index)=>(
                            <div className='w-[100%] flex gap-2'>
                                <input
                                type="text"
                                name="item"
                                placeholder="Item name"
                                value={item.item}
                                required
                                className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] text-black w-[60%]'
                                />

                                <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={item.price || ""}
                                required
                                min="0"
                                step="0.01"
                                className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] text-black w-[30%]'
                                />
                                <button className='bg-[black] w-[10%] rounded-[4px] flex items-center justify-center hover:opacity-85 cursor-pointer' onClick={()=>{handleDeleteMenu(index)}}>
                                    <Trash2 />
                                </button>
                            </div>
                        ))}

                        <button className='bg-[#dddddd] text-[black] rounded-[4px] text-[16px] p-[10px] text-center hover:bg-[black] hover:text-white transition duration-500 cursor-pointer' onClick={handleAddMenu}>
                            Add Menu Item +
                        </button>
                    </div>

                </div>
                

                
            </div>
        </div>
    </>
  )
}

export default AddRestaurantss