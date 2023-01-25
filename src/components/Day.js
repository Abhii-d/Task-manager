import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import DisplayTasks from "./DisplayTasks";


export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  //newly added
  // const [show ,setShow] = useState([]);
  // function set(){
  //   // const events = filteredEvents.filter(
  //   //   (evt) =>
  //   //     dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  //   // );
  //   // setShow(events);
  //   // console.log(show);
  //   setShowDisplayTasks(true);
  // }
  
  
//till
  const { 
    DaySelected,
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    setShowDisplayTasks//new
    
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);

    // console.log(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
   
  
  //newly created
  function today(){
    const tday= dayjs().format("DD")
    const curday=day.format("DD");
    // console.log(tday);
    const curY = day.format("YYYY");
    const todayY = dayjs().format("YYYY");
    const curM = day.format("MM");
    const todayM = dayjs().format("MM");
    if(curY > todayY){
      setShowEventModal(true);
    }
    else if(curM > todayM){
      setShowEventModal(true);
    }
    else if(curday >= tday){
      setShowEventModal(true);
    }
    else {
      alert("Can't perform actions on Past dates")
      setShowEventModal(false)}
  }
  function checkAlarm(evt){
    // const curday=day.format("DD-MM-YY");
    var today = new Date(),
 
    curTime = today.getHours() + ':' + today.getMinutes()
    const AlarmTime= evt.time;
    // console.log(AlarmTime);
    // console.log(curTime);
    if(curTime==AlarmTime && evt.flag== false){
      evt.flag= true;
      alert("You have a task : " + evt.title);
    }
      // if(AlarmTime.getHours()==curday.getHours()){
      //   if(AlarmTime.getMinutes()==curday.getMinutes()){
      //     if(AlarmTime.getSeconds()==curday.getSeconds()){
      //       alert("get done this task"+ evt.title);
      //     }
      //   }
      // }
    
    
  }
  // function Alarm(){
  //   const curday=day.format("DD");
  //   for(const [evt] of dayEvents.entries){
  //     if(evt.idx==curday){
  //       checkAlarm(evt);
  //     }
  //   }
  // }
  setInterval(()=>{
    const tday= dayjs().format("DD-MM-YY")
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === tday
    );
    // console.log(events);
    // checkAlarm(events)
    events.map((evt)=>(
      checkAlarm(evt)
    ))
    
  },1000)
  

  //new  line added
  // console.log(dayEvents);
  return (
    <div className="border border-gray-200 flex flex-col oneday">
      {/* <header className="flex flex-col items-center cursor-pointer"  onClick={() => {
        setShowDisplayTasks(true);
          // set();
          <DisplayTasks day={day} />
          // DisplayTasks(dayEvents);
          
        }}> */}
        <header className="flex flex-col items-center ">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 week">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          //setShowEventModal(true);
          today();
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt) }
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
