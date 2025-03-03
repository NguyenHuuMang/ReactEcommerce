import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { backend_url, server } from "../../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { GrImage } from "react-icons/gr";
import styles from "../../../styles/styles";
import socketIO from "socket.io-client";
// import { format } from "timeago.js";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";

const ENDPOINT = "http://localhost:4000/";

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const scrollRef = useRef(null);
  // eslint-disable-next-line
  const [images, setImages] = useState();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {});
    }
  }, [seller]);

  useEffect(() => {
    if (seller) {
      const userId = seller?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);



  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    //setActiveStatus(online ? true : false);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  // get all  message
  const getMessage = async () => {
    try {
      const response = await axios.get(
        `${server}/message/get-all-messages/${currentChat?._id}`
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            // setMessages([...message, res.data.messages]);
            // console.log(messages)
            getMessage();
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        //console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImages(file);
    imageSendingHandler(file);
  };

  const imageSendingHandler = async (e) => {
    const formData = new FormData();

    formData.append("images", e);
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async (data) => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "sent a image",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-[80%] bg-white m-5 h-[80vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            ALL MESSAGES
          </h1>
          <br />
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userData={userData}
          sellerId={seller._id}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
}) => {
  console.log(data);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  //console.log(data);

  return (
    user?.avatar && (
      <div
        className={`w-[98%] ml-5 flex p-3 px-3 ${
          active === index ? "hover:bg-slate-50" : "hover:bg-slate-50"
        } rounded-2xl cursor-pointer `}
        onClick={(e) =>
          setActive(index) ||
          handleClick(data._id) ||
          setCurrentChat(data) ||
          setUserData(user) ||
          setActiveStatus(online)
        }
      >
        <div className="relative min-h-full">
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[38px] right-[-1px]" />
          ) : (
            <div className="w-[12px] h-[12px] bg-[#cccccc09] rounded-full absolute top-[38px] right-[-1px]" />
          )}
        </div>
        <div className="pl-3">
          <h1 className="pl-3 text-[18px] cursor-pointer">{user?.name}</h1>
          <p className="text-[16px] text-[#c7b9b9] pl-3 cursor-pointer">
            {data?.lastMessageId !== user?._id
              ? "You:"
              : user?.name.split(" ")[0] + ": "}{" "}
            {data?.lastMessage}
          </p>
        </div>
      </div>
    )
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    userData?.avatar && (
      <div className="w-full min-h-full flex flex-col justify-between">
        {/* message header */}
        <div className="w-full flex p-3 items-center justify-between bg-slate-50">
          <div className="flex">
            <AiOutlineArrowLeft
              size={20}
              onClick={() => setOpen(false)}
              className="cursor-pointer mt-5 m-3"
            />
            <img
              src={`${backend_url}${userData?.avatar}`}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600] text-[green]">
                {userData?.name}
              </h1>
              <h1>{activeStatus ? "Active Now" : "Offline"}</h1>
            </div>
          </div>
        </div>

        {/* messages */}

        <div className="px-3 h-[65vh] py-2 overflow-y-scroll">
          {messages &&
            messages.map((item, index) => (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                key={index}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${backend_url}${userData?.avatar}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full mr-3"
                  />
                )}
                {item.images && (
                  <Tippy
                    delay={[500, 50]}
                    content={moment(item.createdAt).fromNow()}
                    placement="left"
                    theme="light-border"
                  >
                    <img
                      src={`${backend_url}${item.images}`}
                      className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                      alt="image_message"
                    />
                  </Tippy>
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`min-w-[1px] p-2 mr-3 rounded-full text-center ${
                        item.sender === sellerId
                          ? "bg-blue-500"
                          : "bg-[#3E4042]"
                      } text-[#fff] h-min`}
                    >
                      <Tippy
                        delay={[500, 50]}
                        content={moment(item.createdAt).fromNow()}
                        placement="left"
                        theme="light-border"
                      >
                        <p>
                          {item.text}
                        </p>
                      </Tippy>
                    </div>

                    {/* <p className="text-[12px] text-[#000000d3] pt-1">
                {moment(item.createdAt).fromNow()}
                </p> */}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* send message input */}
        <form
          required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px]">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <GrImage className="cursor-pointer " size={25} />
            </label>
          </div>
          <div className="w-[97%]">
            <input
              type="text"
              required
              placeholder="Aa"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={25}
                className="absolute right-4 top-4 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    )
  );
};
export default DashboardMessages;
