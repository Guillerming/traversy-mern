import axios from 'axios'

const API_URL = 'http://localhost:5000/api/'

const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}goals/`, goalData, config)
    return response.data
}

const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}goals/`, config)

    return response.data
}

const update = async (goalData) => {
    const response = await axios.put(`${API_URL}goals/${goalData.id}`, goalData)
    if (response.data) {
        // Do something with it on Dashboard. Probably updating the state with Redux
    }

    return response.data
}

const deleteGoal = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}goals/${id}`, config)

    return response.data
}

const goalsService = {
    createGoal,
    getGoals,
    update,
    deleteGoal,
}

export default goalsService