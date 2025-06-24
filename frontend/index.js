
function scrollToBottom() {
    const chatView = document.querySelector(".chat-text-view");
    chatView.scrollTop = chatView.scrollHeight;
}
const myPrompt = document.getElementById("my-prompt");
const username = document.getElementById("name");
const message = document.getElementById("text-message");
const sendMessage = document.getElementById("message-form");

// Display prompt on page load
document.addEventListener("DOMContentLoaded", () => {
    myPrompt.style.display = "flex";
});
let socket;

// Event: User submits prompt form to join
myPrompt.addEventListener("submit", (event) => {
    event.preventDefault();
    const welcome = document.getElementById("welcome-msg");
    welcome.innerHTML += "Welcome, " + username.value;
    myPrompt.style.display = "none";
    socket = io.connect('http://localhost:3000');
    socket.emit("join", username.value);




    // using is typing something 
    let typingTimeout;
    const userInput = document.getElementById("message-input");
    userInput.addEventListener("input", () => {
        const username = document.getElementById("name");
        socket.emit("typing", username.value);

        // cleartimeout will reset the time until  user is typing text
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit("stoptyping", username);
        }, 1000);
    });
    socket.on("user-typing", (name) => {
        const getElement = document.getElementById("typing-member");
        getElement.innerText = `${name} typing...`;
    })
    socket.on("stop-typing", () => {
        const getElement = document.getElementById("typing-member");
        getElement.innerText = "";
    })
    // for the new connection users
    socket.on("user-list", (allUsers) => {
        console.log(allUsers)
        const totalOnlineUsers = document.getElementById("online-user-count");
        totalOnlineUsers.innerText = allUsers.length;

        allUsers.forEach(user => {
            const addOnlineMember = document.querySelector(".online-member");
            const userDiv = document.createElement("div");
            const onlineDot = document.createElement("span");
            onlineDot.id = "green-dot";
            userDiv.innerText = user.name;
            userDiv.classList.add("user-connected");
            userDiv.dataset.socketid = user.socketId;
            userDiv.appendChild(onlineDot);
            addOnlineMember.appendChild(userDiv);
        });
    });


    // For the existing user taking the new user data  
    socket.on("new-user", (data) => {
        console.log(data);
        const totalOnlineUsers = document.getElementById("online-user-count");
        let count = data.allOnlineUsers;
        totalOnlineUsers.innerText = count;

        const addOnlineMember = document.querySelector(".online-member");
        const userElement = document.createElement("div");
        const onlineDot = document.createElement("span");
            onlineDot.id = "green-dot";
        userElement.classList.add("user-connected");
            userElement.appendChild(onlineDot);

        userElement.dataset.socketId = data.socketid;
        userElement.textContent = data.newuser;
        addOnlineMember.appendChild(userElement);
         scrollToBottom();

    });

    // fetching the old messages of the user and showing them
    socket.on("old-msg", (oldMsg) => {
        oldMsg.forEach((msg) => {
            if (msg.name === username.value) {

                const messageContainer = document.createElement("div");
                messageContainer.classList.add("chat-message");
                messageContainer.classList.add("receiver");

                // Profile image
                const profileSpan = document.createElement("span");
                profileSpan.classList.add("profile-icon");

                const profileImg = document.createElement("img");
                profileImg.src = "./images/reciever profile.jpg";
                profileImg.alt = "receiver";
                profileSpan.appendChild(profileImg);

                // Message bubble
                const messageBubble = document.createElement("div");
                messageBubble.classList.add("message-bubble");

                const nameSpan = document.createElement("span");
                nameSpan.classList.add("name");
                nameSpan.innerText = msg.name;

                const messageText = document.createElement("p");
                messageText.classList.add("message-text");
                messageText.innerText = msg.msg;

                const timeSpan = document.createElement("span");
                timeSpan.classList.add("timestamp");

                const date = new Date(msg.timestamp);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                timeSpan.innerText = `${hours}:${minutes}`;

                // Append children
                messageBubble.appendChild(nameSpan);
                messageBubble.appendChild(messageText);
                messageBubble.appendChild(timeSpan);

                messageContainer.appendChild(profileSpan);
                messageContainer.appendChild(messageBubble);

                document.querySelector(".chat-text-view").appendChild(messageContainer);
                 scrollToBottom();
            }
            else {
                const messageContainer = document.createElement("div");
                messageContainer.classList.add("chat-message");
                messageContainer.classList.add("sender");

                // Profile image
                const profileSpan = document.createElement("span");
                profileSpan.classList.add("profile-icon");

                const profileImg = document.createElement("img");
                profileImg.src = "./images/sender profile.jpg";
                profileImg.alt = "sender";
                profileSpan.appendChild(profileImg);

                // Message bubble
                const messageBubble = document.createElement("div");
                messageBubble.classList.add("message-bubble");

                const nameSpan = document.createElement("span");
                nameSpan.classList.add("name");
                nameSpan.innerText = msg.name;

                const messageText = document.createElement("p");
                messageText.classList.add("message-text");
                messageText.innerText = msg.msg;

                const timeSpan = document.createElement("span");
                timeSpan.classList.add("timestamp");

                const date = new Date(msg.timestamp);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                timeSpan.innerText = `${hours}:${minutes}`;

                // Append children
                messageBubble.appendChild(nameSpan);
                messageBubble.appendChild(messageText);
                messageBubble.appendChild(timeSpan);

                messageContainer.appendChild(profileSpan);
                messageContainer.appendChild(messageBubble);

                document.querySelector(".chat-text-view").appendChild(messageContainer);
                 scrollToBottom();
            }
        });

    });

    // add the msg to the user end and send to the other user as well 
    const getMessageForm = document.getElementById("message-form");
    socket.on("user-data", (userdata) => {
        getMessageForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const getMsg = document.getElementById("message-input");
            const chatTextView = document.querySelector(".chat-text-view");

            const chatMessage = document.createElement("div");
            chatMessage.classList.add("chat-message", "receiver");

            const profileSpan = document.createElement("span");
            profileSpan.classList.add("profile-icon");
            profileSpan.id = "reciever-profile";


            const img = document.createElement("img");
            img.src = "./images/reciever profile.jpg";
            img.alt = "receiver";

            profileSpan.appendChild(img);


            const messageBubble = document.createElement("div");
            messageBubble.classList.add("message-bubble");
            messageBubble.id = "reciever-data";

            // Sender name
            const senderName = document.createElement("span");
            senderName.classList.add("name");
            senderName.innerText = userdata.newuser;

            // Message text
            const messageText = document.createElement("p");
            messageText.classList.add("message-text");
            messageText.innerText = getMsg.value;

            // Timestamp
            const timestamp = document.createElement("span");
            timestamp.classList.add("timestamp");
            const now = new Date();
            console.log(now);
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const time = `${hours}:${minutes}`
            timestamp.innerText = time;

            // Append all to message bubble
            messageBubble.appendChild(senderName);
            messageBubble.appendChild(messageText);
            messageBubble.appendChild(timestamp);

            // Append both parts to chat message container
            chatMessage.appendChild(profileSpan);
            chatMessage.appendChild(messageBubble);

            // Append to chat-text-view
            chatTextView.appendChild(chatMessage);

            let userMsg = {
                name: userdata.newuser,
                msg: getMsg.value,
                time: time
            }
            socket.emit("msg", userMsg);
            getMsg.value = ""
             scrollToBottom();
        });
    });


    // taking the other user msg event
    socket.on("new-msg", (userMsg) => {
        const chatTextView = document.querySelector(".chat-text-view");

        const chatMessage = document.createElement("div");
        chatMessage.classList.add("chat-message", "sender");
        const profileSpan = document.createElement("span");
        profileSpan.classList.add("profile-icon");
        profileSpan.id = "sender-profile";


        const img = document.createElement("img");
        img.src = "./images/sender profile.jpg";
        img.alt = "sender";

        profileSpan.appendChild(img);


        const messageBubble = document.createElement("div");
        messageBubble.classList.add("message-bubble");
        messageBubble.id = "sender-data";

        // Sender name
        const senderName = document.createElement("span");
        senderName.classList.add("name");
        senderName.innerText = userMsg.name;

        // Message text
        const messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.innerText = userMsg.msg;

        // Timestamp
        const timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        // const time = new Date(userMsg.time);

        // const hours = time.getHours().toString().padStart(2, '0');
        // const minutes = time.getMinutes().toString().padStart(2, '0');
        // console.log(  `${hours}:${minutes}`);


        timestamp.innerText = userMsg.time;

        // Append all to message bubble
        messageBubble.appendChild(senderName);
        messageBubble.appendChild(messageText);
        messageBubble.appendChild(timestamp);

        // Append both parts to chat message container
        chatMessage.appendChild(profileSpan);
        chatMessage.appendChild(messageBubble);

        // Append to chat-text-view
        chatTextView.appendChild(chatMessage);
         scrollToBottom();
    });

    // remove offline user
    socket.on("remove-user", (data) => {
        console.log(data)
        const userElement = document.querySelector(`[data-socketid="${data.socketId}"]`);
        if (userElement) {
            console.log()
            userElement.remove();
            const totalOnlineUsers = document.getElementById("online-user-count");
            totalOnlineUsers.innerText = data.count;
        }
    });
    // when the user is disconnect 
    socket.on("user-left",(username)=>{
      const chatTextView = document.querySelector(".chat-text-view");
      const createElement = document.createElement("div");
      createElement.id = "user-left";
      createElement.innerText = `${username} is disconnected`
      chatTextView.appendChild(createElement);
    });
});







