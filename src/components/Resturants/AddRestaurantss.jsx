import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Trash2 } from 'lucide-react';

function AddRestaurantss() {
    //menu
    const [menu, setMenu] = useState([{ menu: "", price: "" }]);

    // for slot time 
    const [slotTime,setSlotTime]=useState(["10:20PM"]);

    // for slot time input
    const [slotTimeInput,setSlotTimeInput]=useState("");

    // adding the menu
    const handleAddMenu = () => {
    setMenu([...menu, { menu: "", price: "" }]);
    };

    // deleting menu by passing the index
    const handleDeleteMenu = (index) => {
    const updatedMenu = [...menu];  // copy to avoid direct mutation
    updatedMenu.splice(index, 1);   // remove 1 item at that index
    setMenu(updatedMenu);
    };


    // handle the time input field 
    const handleTimeInput=(e)=>{
        setSlotTimeInput(e.target.value);
        console.log(e.target.value);
    }

    // adding the time to the time slot array with proper time AM/PM
    const handleAddTime = () => {
    
        let newTimeArray = [...slotTime]; // copy the array

        let [hours, minutes] = slotTimeInput.split(":"); // "14:30" → ["14","30"]
        hours = Number(hours);
        minutes = Number(minutes);

        let period = hours >= 12 ? "PM" : "AM"; 
        hours = hours % 12 || 12; // 0 → 12, 13 → 1

        let time = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;

        newTimeArray.push(time);
        setSlotTime(newTimeArray);
    };


  return (
    <>
        <Navbar/>
        <div className='bg-[white] mt-[90px] flex justify-center items-center py-[50px]'>
            <div className='w-[800px] drop-shadow-2xl bg-[white] border border-[#e2e2e2] p-[20px] rounded-[6px] text-[black] '>
                <h2 className='text-black text-center text-[25px]'>Add Restaurants</h2>
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

                    {/*start menu Item */}
                    <div className='flex gap-[5px] mb-[10px] w-[100%] flex-col'>
                        <h3 className='text-black font-semibold'>Menu Items</h3>
                        {menu.map((item,index)=>(
                            <div className='w-[100%] flex gap-2' key={index}>
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
                                    <Trash2 className='text-white'/>
                                </button>
                            </div>
                        ))}


                        <button className='bg-[#dddddd] text-[black] rounded-[4px] text-[16px] p-[10px] text-center hover:bg-[black] hover:text-white transition duration-500 cursor-pointer' onClick={handleAddMenu}>
                            Add Menu Item +
                        </button>
                    </div>
                    {/*end menu Item */}

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Total Seats</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        required
                        />
                    </div>

                    {/*Start of Slot Timming  */}
                    <div className='flex flex-col gap-[5px]'>
                        <p className='font-semibold text-[16px] text-[#4a4a4a]'>Slot Timing</p>
                        <div className='px-[10px] py-[5px] rounded-[4px] border border-[#ddd] text-[16px] flex'>
                            {slotTime.map((item,key)=>(
                                <div className='bg-[#ffffe0] p-[8px] border border-[#ddd] rounded-[3px]' key={key}>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-2'>
                            <input type="time" className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] w-[40%]' onChange={handleTimeInput} value={slotTimeInput}/>
                            <button
                            className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] bg-[black] text-white hover:opacity-70 cursor-pointer w-[60%]'
                            onClick={handleAddTime}
                            >
                                Add Time
                            </button>
                        </div>
                    </div>
                    {/*End of Slot Timming  */}

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Pictues</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="file"
                        name="name"
                        accept='image/*'
                        required
                        />
                        <small>Maximum 5 photos</small>
                    </div>


                    <button
                    className='p-[10px] rounded-[4px] border border-[#ddd]  text-[16px] bg-[#F49B33] text-white hover:opacity-70 cursor-pointer'
                    >Add Restaurant</button>
                </div>
                

                
            </div>
        </div>
    </>
  )
}

export default AddRestaurantss