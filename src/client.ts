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
		socket.write(message);
	}
);

socket.on("data", async (chunk) => {
	console.log();
	await moveCursor(0, -1);
	await clearCurrentLine();
	const json = chunk.toString("utf-8");
	const obj = JSON.parse(json);
	console.log(`${obj.id}:  ${obj.message}`);
	const message = await messageInput();
	await moveCursor(0, -1);
	await clearCurrentLine();
	socket.write(message);
});

socket.on("close", () => {
	console.log("CLOSE");
});

socket.on("end", () => {
	console.log("END");
});
