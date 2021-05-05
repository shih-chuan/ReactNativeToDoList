import axios from './instance/axios';

const ToDoService =  {
    getToDoList: async() => {
        try{
            const response = await axios.get("/feed/posts");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteToDo: async(id) => {
        try{
            const response = await axios.delete(`/feed/posts/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    postToDo: async(data) => {
        try{
            const response = await axios.post("/feed/posts/", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    putToDo: async (id, data) => {
        try{
            const response = await axios.put(`/feed/posts/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ToDoService;