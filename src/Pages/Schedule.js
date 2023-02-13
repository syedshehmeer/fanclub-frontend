import "./CSS/Schedule.css";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { storeValue } from '../reducer/actions'

const Meetings = React.memo((props) => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  // const [date, setDate] = useState("");
  // const [message, setMessage] = useState("");
  // const [total_members, setTotal_members] = useState("");
  // const [total_cost, setTotal_cost] = useState("");

  // useEffect(() => {
  //   const post = async () => {
  // const data = {
  //   id,
  //   date,
  //   message,
  //   total_cost,
  //   total_members,
  // };
  // try {
  //   // const response = await axios.get(`http://localhost:5000/api/celebs/${id}/meet/${data.id}`);
  //   const response = await axios.get('http://localhost:5000/api/celebs/');
  //   console.log(response);
  //   return setData(response.data.celebrities);
  // } catch (error) {
  //   console.log(error);
  // }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/celebs`)
      .then((response) => {
        setData(response.data.celebrities);
        console.log(response.data.celebrities.meeting);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = data.filter((celeb) => celeb);

  console.log(props.meetingList + " ye hai fan props");
  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Meetings
      </div>
      {/* {data.filter((celeb) => celeb).map((celeb) => { */}
      {filteredData.map((celeb) => {
        return (
          <>
            <Col style={{ paddingBottom: "10px" }}>
              <div className="bookedMeeting">
                <div className="bookedMeeting__title">
                  <strong>
                    Celebrity : {celeb._id}
                    <br />
                    {celeb.name}
                  </strong>
                </div>
                <div className="bookedMeeting__time">
                  <strong>{celeb.email}</strong>
                  <strong>{celeb.bio}</strong>
                  <strong>{celeb.message}</strong>
                  <strong>{celeb.date}</strong>
                </div>
                {/* <Link to="/Meet">
                  <button> Join Meeting</button>
                </Link> */}
                <a
                  href="https://video-call-fc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Join Meeting</button>
                </a>
              </div>
            </Col>
          </>
        );
      })}
      ;
    </>
  );
});
// function Payment() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get(`http://localhost:5000/payment`)
//       .then(response => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       .catch(error => {
//         console.log(error)
//       });
//   }, []);

//   const filteredData = data.filter(celeb => celeb)
//   return (
//     <>
//       <div className="section-header" style={{ marginTop: "50px" }}>
//         Meetings
//       </div>
//       {/* {data.filter((celeb) => celeb).map((celeb) => { */}
//       {filteredData.map((celeb) => {
//         return (
//           <>

//             <Col style={{ paddingBottom: "10px" }}>
//               <div className='bookedMeeting'>

//                 <div className='bookedMeeting__title'>
//                   <strong >
//                     {celeb.name}
//                   </strong>
//                 </div>
//                 <div className='bookedMeeting__time'>
//                   <strong>{celeb.email}</strong>
//                   <strong>{celeb.amount}</strong>
//                 </div>
//               </div>
//             </Col>
//           </>
//         );
//       })};

//     </>
//   )
// }
function Schedule(props) {
  const loggedIn = useSelector((state) => state.loggedIn);
  console.log(props.FanSlug + " fan slug");
  if (loggedIn == "fan") {
    return (
      <div className="schedule">
        <div className="schedule__row">
          {/* <Meetings message="Join Meeting"/> */}
          <Meetings meetingList={props.FanSlug} />
        </div>
      </div>
    );
  }
  return (
    <div className="schedule">
      <div className="schedule__row">
        {/* <Meetings message="Join Meeting"/> */}
        <h1>Celeb Schedule</h1>
      </div>
    </div>
  );
}

export default Schedule;
