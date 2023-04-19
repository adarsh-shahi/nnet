import net from "net";

const server = net.createServer((socket) => {});
server.on("connection", (socket) => {
	console.log("client connected");

	socket.on("data", (data) => {
		console.log(data.toString("utf-8"));
	});
});

server.listen(3000, "127.0.0.1", () => {
	console.log("server is listening ", server.address());
});
