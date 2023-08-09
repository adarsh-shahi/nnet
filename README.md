# Console Group Chatting Application (TCP-based)

Welcome to the Console Group Chatting Application! This repository contains a simple console-based group chatting application built upon TCP sockets. With this application, users can host a server and multiple clients can connect to the server to chat with each other in real-time.

## Features

- Real-time group chat functionality through console interaction.
- Multiple clients can connect to the server and chat simultaneously.
- Built upon TCP sockets for reliable communication.
- Easy-to-use interface for sending and receiving messages.

## Prerequisites

- Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Usage

### Setting Up the Server

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/yourusername/console-tcp-group-chat.git
   ```

## How It Works

The application uses Node.js and TCP sockets to establish communication between the server and clients. The server acts as a central hub for message distribution. Clients connect to the server over TCP, send and receive messages in real-time.

### Connecting Clients

  1. Open multiple terminal windows for each client you want to simulate.

  2. Navigate to the repository's directory in each terminal window.


  3. Run the client script:  
    ```node client.js```

  4. Follow the prompts to enter a username and start chatting.

### Contributing

Contributions are welcome! Feel free to open issues and pull requests to suggest improvements, report bugs, or add new features.
