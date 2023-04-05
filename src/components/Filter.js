import React from 'react';
import {SelectInput} from "./index";
import productionYears from "../utils/productionYears";
import {useSelector, useDispatch} from "react-redux";
import {handleCarChange, filterCars} from "../features/car/carSlice";
import {BiSearch} from 'react-icons/bi';

const Filter = () => {
    const {from, to} = useSelector((state) => state.car);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleCarChange({name, value}));
        // dispatch(getCars({filter: value}));////////////
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(filterCars({from, to}));
    }

    return (
        <form className='form-filter' onSubmit={handleSubmit}>
            <SelectInput name='from' value={from} placeholder='From:' handleChange={handleChange}
                         options={productionYears}/>
            <SelectInput name='to' value={to} placeholder='To:' handleChange={handleChange}
                         options={productionYears}/>
            <button type='button' onClick={handleSubmit} className='btn-search'>
                <BiSearch className='btn-icon'/> Search
            </button>
        </form>
    );
};

export default Filter;