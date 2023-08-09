import net from "net";

const PORT = 8000;

const server = net.createServer();

// an array of client sockets
const clientSockets: { id: string; socket: net.Socket }[] = [];

server.on("connection", (socket) => {
	const clientId = clientSockets.length + 1;
	socket.write(`id-${clientId}`);

	//Broadcast to everyone that a new user joined
	clientSockets.map((client) => {
		client.socket.write(`User ${clientId} joined the chat`);
	});

	console.log(
		`\r\t************
    \r\tClient connected
    \r\tPORT: ${socket.remotePort}
    \r\tADDRESS: ${socket.remoteAddress}
    \r\t************`
	);

	socket.on("data", (chunk) => {
		const dataString = chunk.toString("utf-8");
		const id = dataString.substring(0, dataString.indexOf("-"));
		const message = dataString.substring(dataString.indexOf("-message-") + 9);
		clientSockets.map((cs) => {
			cs.socket.write(`> User ${id}: ${message}`);
		});

		// Broadcast everyone that a user left
		socket.on("end", () => {
			clientSockets.map((client) => {
				client.socket.write(`User ${clientId} left the chat`);
			});
		});
	});

	clientSockets.push({ id: (clientSockets.length + 1).toString(), socket });
});

server.on("error", (e) => {
	console.log(e);
});

server.listen(8000, "127.0.0.1", () => {
	console.log(server.address());
	console.log(`Listening on ${PORT}`);
});
