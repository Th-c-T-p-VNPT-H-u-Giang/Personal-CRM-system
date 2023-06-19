import { io } from "socket.io-client";

const urlConnect = "http://localhost:3000";
const socket = io(urlConnect);

export default socket;
