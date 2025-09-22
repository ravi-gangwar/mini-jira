import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";

let token = "";
let projectId = ""; 
let userId = "";
let registeredEmail = "";

/**
 * Register a new user
 */
const register = async () => {
    const name = "John Doe Testing";
    const email = `john.doe.${Date.now()}@example.com`;
    const password = "password";
    const gender = "male";

    const response = await axios.post(`${baseUrl}/auth/register`, {
        name,
        email,
        password,
        gender,
    });

    userId = response.data.user._id;
    registeredEmail = email;
    return response.data; // return full response
};

/**
 * Login with the registered user
 */
const login = async () => {
    const email = registeredEmail;
    const password = "password";

    const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
    });

    token = response.data.token;
    return response.data; // return full response
};

/**
 * Create a new project
 */
const createProject = async () => {
    const name = "Project Testing";
    const description = "Project Testing Description";

    const response = await axios.post(
        `${baseUrl}/project/create`,    
        { name, description },
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    projectId = response.data.project._id;
    return response.data; // return full response
};

/**
 * Create a new task for the project
 */
const createTask = async () => {
    const title = "Task Testing";
    const status = "pending";
    const priority = "low";
    const deadline = new Date();

    const response = await axios.post(
        `${baseUrl}/task/create`,
        { title, status, priority, deadline, projectId },
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data; // return full response
};

/**
 * Delete the user created during tests
 */
const deleteUser = async () => {
    const response = await axios.post(
        `${baseUrl}/user/delete`,
        { userId },
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data; // return full response
};

export { register, login, createProject, createTask, deleteUser };
