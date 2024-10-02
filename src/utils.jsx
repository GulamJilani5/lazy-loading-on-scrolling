import axios from "axios";

const itemsFetch = axios.create({ baseURL: "https://dummyjson.com/products" });

export default itemsFetch;
