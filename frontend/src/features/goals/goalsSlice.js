import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalsService from './goalsService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error
        return thunkAPI.rejectWithValue(message)
    }
})

export const update = createAsyncThunk('goals/update', async (goal, thunkAPI) => {
    try {
        return await goalsService.update(goal)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalsSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // GetAll
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // Update
            .addCase(update.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.goals = []
            })
            // Delete
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalsSlice.actions
export default goalsSlice.reducer