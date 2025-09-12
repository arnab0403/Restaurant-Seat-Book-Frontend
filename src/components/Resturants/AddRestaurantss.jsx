import React, { useState,useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import { Loader, LoaderCircle, Trash2 } from 'lucide-react';
import { addRestaurant } from '../../api/api';
import Message from '../Resturants/Message'
import axios from 'axios';
import Error from '../SignUp/Error';

function AddRestaurantss() {

    const resDetailsJson={
        name:"",
        description:"",
        state:"",
        city:"",
        address:"",
        city:"",
        coordinates:"",
        openTime:"",
        closeTime:"",
        menuItems:[{menu:"",price:""}],
        totalSeats:"",
        slotTime:[],
        image:[]
    }


    //menu
    const [resDetails,setResDetails]=useState(resDetailsJson);
    
    // for slot time input
    const [slotTimeInput,setSlotTimeInput]=useState("");

    // success message
    const [message,setMessage]=useState("");

    const [error,setError]=useState("");

    const [image,setImage]=useState("");

    const [imageLoading,setImageLoading]=useState(false);

    const [resUploadLoading,setResUploadLoading]=useState(false);

    const fileInputRef=useRef(null); 


    // adding the menu
    const handleAddMenu = () => {
    setResDetails({
        ...resDetails,
        menuItems: [...resDetails.menuItems, {menu: "", price: "" }]
    });
    };


    // deleting menu by passing the index
    const handleDeleteMenu = (index) => {
    const updatedMenu = [...resDetails.menuItems];  // copy to avoid direct mutation
    updatedMenu.splice(index, 1);   // remove 1 item at that index
    setResDetails({...resDetails,menuItems:updatedMenu});
    };


    // handle the time input field 
    const handleTimeInput=(e)=>{
        setSlotTimeInput(e.target.value);
        console.log(e.target.value);
    }

    // adding the time to the time slot array with proper time AM/PM
    const handleAddTime = () => {
        
        console.log("hello")
        let newTimeArray = [...resDetails.slotTime]; // copy the array

        let [hours, minutes] = slotTimeInput.split(":"); // "14:30" → ["14","30"]
        hours = Number(hours);
        minutes = Number(minutes);

        let period = hours >= 12 ? "PM" : "AM"; 
        hours = hours % 12 || 12; // 0 → 12, 13 → 1

        let time = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;

        newTimeArray.push({time:time,status:"available"});
        setResDetails({
            ...resDetails,
            slotTime: newTimeArray   // ✅ only the updated array
        });
    };

    // handle Menu Input 
    const handleMenuNameChange=(e,index)=>{
        let menuItems = resDetails.menuItems;
        menuItems[index].menu=e.target.value;
        setResDetails({...resDetails,menuItems:menuItems});
        console.log(resDetails);
    }

    //handle Price of the Menu
    const handlePriceChange=(e,index)=>{
        let menuItems = resDetails.menuItems;
        menuItems[index].price=e.target.value;
        setResDetails({...resDetails,menuItems:menuItems})
        console.log(resDetails);
    }

    //Handle Add Button
    const hanldeButton = async ()=>{
        if (resUploadLoading) {
            return;
        }
        setResUploadLoading(true);
        const result = await addRestaurant(resDetails);
        console.log(result);
        if (result.status==="success") {
            setMessage("Restaurants Details Uploaded Successfully");
            setResDetails(resDetailsJson);
            setTimeout(()=>{
                setMessage("");
            },3000)
        }else{
            alert("Error");
        }
        setResUploadLoading(false);
    }

    // handle the image input field
    const handleImageChange = async (e)=>{

        if (imageLoading) {
            return;
        }

        setImageLoading(true);

        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        console.log(selectedFile); 

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "restaurants"); 
        formData.append("folder", "images");             

        try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/djlwmlrnz/image/upload",
            formData
        );

        let imageArray=resDetails.image;
        imageArray.push(res.data.secure_url);
        setResDetails({...resDetails,image:imageArray});
        setImage(null);

        e.target.value="";

        setImageLoading(false)
        } catch (err) {
        console.error(err);
        alert("Upload failed");
        setImageLoading(false);
        }
    }

    const handleIamgeUploadButton=()=>{
         if (resDetails.image.length > 4) {
            setError("Maximum Images Uploaded");
            setTimeout(()=>{
                setError("");
            },3000)
            return;
        }
        fileInputRef.current.click();
    }

  return (
    <>
        <Navbar/>
        {message && (
             <Message text={message}/>
        )}
        {error && (
            <Error text={error}/>
        )}
       
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
                        value={resDetails.name}
                        onChange={(e)=>setResDetails({...resDetails,name:e.target.value})}
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Description</label>
                        <textarea
                        name="description"
                        value={resDetails.description}
                        onChange={(e)=>setResDetails({...resDetails,description:e.target.value})}
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
                        value={resDetails.state}
                        onChange={(e)=>setResDetails({...resDetails,state:e.target.value})}
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Address</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        value={resDetails.address}
                        onChange={(e)=>setResDetails({...resDetails,address:e.target.value})}
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>City</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        value={resDetails.city}
                        onChange={(e)=>setResDetails({...resDetails,city:e.target.value})}
                        required
                        />
                    </div>

                    <div className='flex flex-col gap-[5px] '>
                        <label className='font-semibold text-[16px] text-[#4a4a4a]'>Coordinates</label>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                        type="text"
                        name="name"
                        value={resDetails.cordinates}
                        onChange={(e)=>setResDetails({...resDetails,coordinates:e.target.value})}
                        required
                        />
                    </div>
                    
                    {/* open & close time */}
                    <div className='flex gap-3'>    
                        <div className='flex flex-col gap-[5px] w-[50%]'>
                            <label className='font-semibold text-[16px] text-[#4a4a4a]'>Open Time</label>
                            <input
                            className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                            type="time"
                            name="name"
                            value={resDetails.openTime}
                            onChange={(e)=>setResDetails({...resDetails,openTime:e.target.value})}
                            required
                            />
                        </div>

                        <div className='flex flex-col gap-[5px] w-[50%]'>
                            <label className='font-semibold text-[16px] text-[#4a4a4a]'>Close Time</label>
                            <input
                            className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px]'
                            type="time"
                            name="name"
                            value={resDetails.closeTime}
                            onChange={(e)=>setResDetails({...resDetails,closeTime:e.target.value})}
                            required
                            />
                        </div>
                    </div>

                    {/*start menu Item */}
                    <div className='flex gap-[5px] mb-[10px] w-[100%] flex-col'>
                        <h3 className='text-black font-semibold'>Menu Items</h3>
                        {resDetails.menuItems.map((item,index)=>(
                            <div className='w-[100%] flex gap-2' key={index}>
                                <input
                                type="text"
                                name="item"
                                placeholder="Item name"
                                value={resDetails.menuItems[index].menu}
                                onChange={(e)=>handleMenuNameChange(e,index)}
                                required
                                className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] text-black w-[60%]'
                                />

                                <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={item.price || ""}
                                onChange={(e)=>handlePriceChange(e,index)}
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
                        value={resDetails.totalSeats}
                        onChange={(e)=>setResDetails({...resDetails,totalSeats:e.target.value})}
                        required
                        />
                    </div>

                    {/*Start of Slot Timming  */}
                    <div className='flex flex-col gap-[5px]'>
                        <p className='font-semibold text-[16px] text-[#4a4a4a]'>Slot Timing</p>
                        <div className='px-[10px] py-[5px] rounded-[4px] border border-[#ddd] text-[16px] flex h-[50px]'>
                            {resDetails.slotTime.map((item,index)=>(
                                <div className='bg-[#ffffe0] p-[8px] border border-[#ddd] rounded-[3px]' key={index}>
                                    {item.time}
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
                        <div className='flex gap-1'>
                            {resDetails.image.map((imageUrl,index)=>{
                                return <img src={imageUrl} alt="Restaurant Image" key={index} className='max-w-[13%] h-auto object-contain'/>
                            })}
                        </div>
                        <input
                        className='p-[10px] rounded-[4px] border border-[#ddd] text-[16px] hidden'
                        type="file"
                        name="name"
                        accept='image/*'
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        required
                        />
                        <button onClick={handleIamgeUploadButton}  className='p-[10px] rounded-[4px] flex justify-center items-center border border-[#ddd]  text-[16px] bg-[black] text-white hover:opacity-70 cursor-pointer'>
                            {!imageLoading && <p>Upload Picture</p>}
                            
                            {imageLoading && (<LoaderCircle className=' animate-spin'/>)}
                        </button>
                        <small>Maximum 5 photos</small>
                    </div>


                    <button onClick={hanldeButton}
                    className='p-[10px] rounded-[4px] border border-[#ddd] flex justify-center items-center text-[16px] bg-[#F49B33] text-white hover:opacity-70 cursor-pointer'
                    >
                        {!resUploadLoading && <p>Add Restaurant</p>}
                        

                        {resUploadLoading && <LoaderCircle className=' animate-spin'/>}
                    </button>
                </div>
                

                
            </div>
        </div>
    </>
  )
}

export default AddRestaurantss