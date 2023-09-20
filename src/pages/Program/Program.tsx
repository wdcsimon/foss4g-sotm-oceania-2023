import DayView from "../../components/DayView";
import DayViewSmall from "../../components/DayViewSmall";
import { Day } from "../../components/DayView";

import { useEffect, useState } from "react";

// Define a function to get special events based on the date
const getDayConfig = (day: Day) => {
  switch (day.date) {
    case "2023-10-16":
      return {
        periods: [{ startTime: 7, endTime: 18, timeSlotInterval: 30 }],
        specialEvents: [
          { id: -1, start: "12:00", duration: "01:00", title: "Lunch" },
          {
            id: -2,
            start: "10:00",
            duration: "00:15",
            title: "Morning Tea",
          },
          {
            id: -3,
            start: "15:00",
            duration: "00:15",
            title: "Afternoon Tea",
          },
        ],
      };
    case "2023-10-17":
      return {
        periods: [
          { startTime: 8.5, endTime: 11, timeSlotInterval: 15 },
          { startTime: 11, endTime: 12, timeSlotInterval: 5 },
          { startTime: 12, endTime: 16.5, timeSlotInterval: 5 },
          { startTime: 16.5, endTime: 17.35, timeSlotInterval: 1 },
        ],
        specialEvents: [
          { id: -1, start: "12:15", duration: "01:00", title: "Lunch" },
          {
            id: -2,
            start: "10:30",
            duration: "00:30",
            title: "Morning Tea",
          },
          {
            id: -3,
            start: "15:00",
            duration: "00:30",
            title: "Afternoon Tea",
          },
        ],
      };
    case "2023-10-18":
      return {
        periods: [
          { startTime: 10, endTime: 16.75, timeSlotInterval: 5 },
          { startTime: 16.75, endTime: 17.35, timeSlotInterval: 1 },
        ],
        specialEvents: [
          { id: -1, start: "12:50", duration: "01:00", title: "Lunch" },
          {
            id: -2,
            start: "10:40",
            duration: "00:30",
            title: "Morning Tea",
          },
          {
            id: -3,
            start: "15:05",
            duration: "00:30",
            title: "Afternoon Tea",
          },
        ],
      };
    case "2023-10-19":
      return {
        periods: [{ startTime: 11.75, endTime: 18, timeSlotInterval: 5 }],
        specialEvents: [
          { id: -1, start: "12:35", duration: "01:00", title: "Lunch" },
          {
            id: -2,
            start: "10:50",
            duration: "00:30",
            title: "Morning Tea",
          },
          {
            id: -3,
            start: "14:25",
            duration: "00:30",
            title: "Afternoon Tea",
          },
        ],
      };
    default:
      return {
        periods: [{ startTime: 8, endTime: 14, timeSlotInterval: 60 }],
        specialEvents: [],
      };
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProgramPage = () => {
  const [allDaysData, setAllDaysData] = useState([]);
  const [days, setDays] = useState([]);
  const [activeDay, setActiveDay] = useState(0);
  useEffect(() => {
    // Fetch the data only when the component mounts
    fetch(
      "https://talks.osgeo.org/foss4g-sotm-oceania-2023/schedule/export/schedule.json"
    )
      .then(async (response) => await response.json())
      .then((data) => {
        setAllDaysData(data.schedule.conference.days);
        setDays(
          data.schedule.conference.days.map((day: any) => formatDate(day.date))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <section
        style={{
          backgroundImage: "url('/imgs/auck_build_3D.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 0px",
        }}
        className="relative flex items-center justify-center h-64 bg-gray-100 bg-no-repeat bg-cover bg-center"
      ></section>
      <section className="container px-6 py-8 mx-auto lg:py-16">
        <div className="grid grid-cols-4 sm:overflow-x-auto sm:overflow-y-hidden border-b border-gray-200 whitespace-nowrap sm:flex">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
                activeDay === index
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>
      <div className="hidden lg:block">
        {allDaysData[activeDay] && (
          <DayView
            day={allDaysData[activeDay]}
            dayConfig={getDayConfig(allDaysData[activeDay])}
          />
        )}
      </div>
      <div className="block lg:hidden">
        {allDaysData[activeDay] && (
          <DayViewSmall day={allDaysData[activeDay]} />
        )}
      </div>
    </>
  );
};

export default ProgramPage;
