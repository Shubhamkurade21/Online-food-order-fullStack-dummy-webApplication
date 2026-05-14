import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getFoodMenu } from '../services/Food'
import { toast } from 'react-toastify'
import { config } from './../services/config';
import FoodCard from '../components/FoodCard';

function Food() {

    const [foodItems, setFoodItems] = useState([])

    const getAllFoodItems = async () => {
        const response = await getFoodMenu()
        if (response.status == 'success') {
            setFoodItems(response.data)
        }
        else
            toast.error(response.error)
    }

    useEffect(() => {
        getAllFoodItems()
    }, [])


    return (
        <div className='container'>
            <div className='row'>
                {
                    foodItems.map(f => <FoodCard food={f} />)
                }
            </div>
        </div >
    )
}

export default Food
