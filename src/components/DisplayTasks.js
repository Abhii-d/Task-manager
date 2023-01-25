import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";


export default function DisplayTasks({day}) {
  const [dayEvents, setDayEvents] = useState([]);
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
  


    console.log(dayEvents)
    
  return (

    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <button className="flex flex-col items-center cursor-pointer"  onClick={() => {
        setShowDisplayTasks(false);
          // set();
          // DisplayTasks({dayEvents});
          
        }}>close</button>
        <div>
        
       </div>
       <h1>hello world ! ...</h1> 
      
       {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            // onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
    </div>
  )

}