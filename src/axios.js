import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-dbfc5.cloudfunctions.net/api'
    //'http://localhost:5001/clone-dbfc5/us-central1/api' 
    // THE API URL
});


export default instance;
 