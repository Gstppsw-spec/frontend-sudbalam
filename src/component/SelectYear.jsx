import React, { useEffect, useState } from "react";
import { useYearQuery } from "../api/data-selesai/useYearQuery";

export const SelectYear = ({
  selectedOption,
  changeTextColor,
  isOptionSelected,
  setSelectedOption,
}) => {
  const { data: dataYear } = useYearQuery();
  const [year, setYear] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://subdomain.sudbalam.com/api/tahun", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setYear(result);
          
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [setYear]);

  return (
    <div>
      <div className="">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`py-2 select-limit ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" className="text-tahun">
            Pilih tahun
          </option>
          {year?.map((year) => (
            <option value={year.value} className="text-body dark:text-bodydark">
              {year.year}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};
