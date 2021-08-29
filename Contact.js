import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiMessageRoundedCheck } from "react-icons/bi";
import image from "../Utils/Images/image4.jpg";
import TopBanner from "../Components/TopBanner";

const Contact = () => {
  const [dropdown, setDropdown] = useState("Mobile App Development");
  const [notify, setNotify] = useState(false);
  const [inV, setInv] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setInv({
      ...inV,
      [name]: value,
    });
  };
  const sendData = { ...inV, dropdown };
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const sendToGmail = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://sheltered-meadow-11943.herokuapp.com/send",
        sendData,
        axiosConfig
      )
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 3000);
    setTimeout(() => {
      setInv(
        {
          name: "",
          email: "",
          phone: "",
          message: "",
        },
        6000
      );
    });
  };

  useEffect(() => {
    axios
      .get("https://sheltered-meadow-11943.herokuapp.com/msg")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }, [inV.email]);
  // LISTS
  const lists = [
    "mobile app development",
    "web app development",
    "custom app development",
    "web & mobile app development",
  ];
  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  return (
    <React.Fragment>
      <TopBanner pageName="Contact" image={image} />
      <div className="skbaskj">
        <h1>Get In Touch</h1>
        <div className="contactPage">
          <form onSubmit={sendToGmail}>
            <label>Name</label>
            <br></br>
            <input
              type="text"
              name="name"
              value={inV.name}
              onChange={handleSubmit}
              autoCorrect="off"
              autoCapitalize="none"
              autoComplete="off"
            ></input>
            <br></br>
            <label>Email</label>
            <br></br>
            <input
              type="email"
              name="email"
              value={inV.email}
              onChange={handleSubmit}
              autoCorrect="off"
              autoCapitalize="none"
              autoComplete="off"
            ></input>
            <br></br>
            <label>Phone</label>
            <br></br>
            <input
              type="text"
              name="phone"
              value={inV.phone}
              onChange={handleSubmit}
              autoCorrect="off"
              autoCapitalize="none"
              autoComplete="off"
            ></input>
            <br></br>
            <label>Type of services you are looking for</label>
            <select
              defaultValue={"DEFAULT"}
              onChange={(e) => {
                setDropdown(e.target.value);
              }}
            >
              <option value="DEFAULT" disabled hidden>
                Mobile App Development
              </option>{" "}
              {lists &&
                lists.map((x, i) => {
                  return (
                    <option value={x} key={i}>
                      {x}
                    </option>
                  );
                })}
            </select>
            <br></br>
            <label>Message</label>
            <br></br>
            <textarea
              type="text"
              name="message"
              value={inV.message}
              onChange={handleSubmit}
            ></textarea>
            <br></br>
            <button
              disabled={
                !inV.message
                  ? true
                  : !inV.email
                  ? true
                  : !inV.name
                  ? true
                  : !dropdown
                  ? true
                  : false
              }
              className="sdcjeeo"
            >
              {notify ? "Message Sent" : "Send Us"}
            </button>
          </form>
          <Mailto email="eazmltd@gmail.com" subject="" body="">
            <div className="hashbbjask">
              <BiMessageRoundedCheck className="BiMessageRoundedCheck" />
              <h2 className="mailto">Send Us A Message​​</h2>
              <p>eazmltd@gmail.com</p>
            </div>
          </Mailto>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
