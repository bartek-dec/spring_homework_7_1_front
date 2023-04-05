import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {colors} from "../../utils/selectInputs";
import years from '../../utils/productionYears';

const url = 'http://localhost:8080/cars';

const initialState = {
    cars: [],
    msg: '',
    isLoading: false,
    isModalVisible: false,
    isEditing: false,
    carId: 0,
    brand: '',
    model: '',
    color: colors[0],
    productionYear: years[0],
    from: years[0],
    to: years[0]
}

export const getCars = createAsyncThunk('getCars', async (payload, thunkApi) => {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue('Not found.');
    }
});

export const filterCars = createAsyncThunk('filterCars', async (payload, thunkApi) => {
    try {
        const {from, to} = payload;
        const {data} = await axios.get(`${url}/filter?from=${from}&to=${to}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue('Not found.');
    }
})

export const createCar = createAsyncThunk('createCar', async (payload, thunkApi) => {
    try {
        await axios.post(url, payload);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Internal Server Error');
    }
});

export const deleteCar = createAsyncThunk('deleteCar', async (id, thunkApi) => {
    try {
        await axios.delete(`${url}/${id}`);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Not found');
    }
});

export const updateCar = createAsyncThunk('updateCar', async (payload, thunkApi) => {
    try {
        await axios.put(url, payload);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Not found');
    }
});

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        handleCarChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        openModal: (state) => {
            state.isModalVisible = true;
        },
        closeModal: (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.carId = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
        },
        editCar: (state, action) => {
            const {carId, brand, model, color, productionYear} = action.payload;
            state.isModalVisible = true;
            state.isEditing = true;
            state.carId = carId;
            state.brand = brand;
            state.model = model;
            state.color = color;
            state.productionYear = productionYear;
        }
    },
    extraReducers: builder => {
        builder.addCase(getCars.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(getCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cars = action.payload;
        }).addCase(getCars.rejected, (state, action) => {
            state.isLoading = false;
            state.cars = [];
            state.msg = action.payload;
        }).addCase(createCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(createCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
            state.from = years[0];
            state.to = years[0];
        }).addCase(createCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isModalVisible = false;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
            state.from = years[0];
            state.to = years[0];
            state.msg = action.payload;
        }).addCase(deleteCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(deleteCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.carId = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
            state.from = years[0];
            state.to = years[0];
        }).addCase(deleteCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isModalVisible = false;
            state.isEditing = false;
            state.carId = 0;
            state.brand = '';
            state.model = '';
            state.from = years[0];
            state.to = years[0];
            state.color = colors[0];
            state.productionYear = years[0];
            state.msg = action.payload;
        }).addCase(updateCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(updateCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.carId = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
            state.from = years[0];
            state.to = years[0];
        }).addCase(updateCar.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.isModalVisible = false;
            state.isEditing = false;
            state.carId = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.productionYear = years[0];
            state.from = years[0];
            state.to = years[0];
            state.msg = action.payload;
        }).addCase(filterCars.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(filterCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cars = action.payload;
            state.from = years[0];
            state.to = years[0];
        }).addCase(filterCars.rejected, (state, action) => {
            state.isLoading = false;
            state.cars = [];
            state.msg = action.payload;
        })
    }
});

export default carSlice.reducer;
export const {handleCarChange, closeModal, openModal, editCar} = carSlice.actions;