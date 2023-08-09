import net from "net";
import * as readline from "readline/promises";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const clearCurrentLine = () => {
	return new Promise((resolve, reject) => {
		process.stdout.clearLine(0, () => {
			resolve(0);
		});
	});
};

const moveCursor = (dx: number, dy: number) => {
	return new Promise((resolve, reject) => {
		process.stdout.moveCursor(dx, dy, () => {
			resolve(0);
		});
	});
};

const messageInput = async () => {
	return await rl.question("Enter a message: ");
};

let id = "";

const socket = net.createConnection(
	{
		host: "127.0.0.1",
		port: 8000,
	},
	async () => {
		console.log("Connected to server");
		const message = await messageInput();
		await moveCursor(0, -1);
		await clearCurrentLine();
		socket.write(`${id}-message-${message}`);
	}
);

socket.on("data", async (chunk) => {
	console.log();
	await moveCursor(0, -1);
	await clearCurrentLine();
	// getting id from server
	if (chunk.toString("utf-8").substring(0, 3) === "id-") {
		id = chunk.toString("utf-8").substring(3);
		console.log(`Your id is ${chunk.toString("utf-8")}`);
	} else {
		const data = chunk.toString("utf-8");
		console.log(data);
	}
	const message = await messageInput();
	await moveCursor(0, -1);
	await clearCurrentLine();
	socket.write(`${id}-message-${message}`);
});

socket.on("close", () => {
	console.log("CLOSE");
});

socket.on("end", () => {
	console.log("END");
});
