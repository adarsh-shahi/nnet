import net from "net";

const PORT = 8000;

const server = net.createServer();

// an array of client sockets
const clientSockets: { id: string; socket: net.Socket }[] = [];

server.on("connection", (socket) => {
	console.log(
		`\r\t************
    \r\tClient connected
    \r\tPORT: ${socket.remotePort}
    \r\tADDRESS: ${socket.remoteAddress}
    \r\t************`
	);
	socket.on("data", (chunk) => {
		clientSockets.map((cs) => {
			cs.socket.write(
				JSON.stringify({
					id: cs.id,
					message: chunk.toString("utf-8"),
				})
			);
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
