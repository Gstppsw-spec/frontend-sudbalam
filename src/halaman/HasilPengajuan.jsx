import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ResultCard from "../component/ResultCard";
import { useLocation } from "react-router-dom";
import NoData from ".././component/NoData";

const HasilPengajuan = (props) => {
  const [filterPengajuan, setFilterPengajuan] = useState([]);
  const location = useLocation();

  let words = location.state.word.keyword;
  let pencarians = location.state.word.pencarian;

  async function prepareFilterPengajuan(arrayToBeFiltered, wordparam, wordnik) {
    const filtered = await arrayToBeFiltered.filter((anObject) => {
      return (anObject.nik_alm.toLowerCase().indexOf(wordparam.toLowerCase()) > -1) && (anObject.nik_waris.toLowerCase().indexOf(wordnik.toLowerCase()) > -1 );
    });
    return filtered;
  }

  useEffect(() => {
    fetch("https://subdomain.sudbalam.com/api/dataumum")
      .then((res) => res.json())
      .then((result) => {
        prepareFilterPengajuan(result, words, pencarians).then((trip) => {
          setFilterPengajuan(trip);
        });
      }); 
  }, [words, pencarians]);

  if (Array.isArray(filterPengajuan) && filterPengajuan.length) {
    return (
      <div>
        {filterPengajuan.map((trip) => {
          if (trip.nik_alm === words && trip.nik_waris === pencarians) {
            return (
              <ResultCard
                nik={trip.nik_alm}
                nama={trip.nama_alm}
                stat={trip.status}
                kematian={trip.tgl_alm}
                nikWaris={trip.nik_waris}
                namaWaris={trip.nama_waris}
              />
            );
          } else {
            return <NoData />;
          }
        })}
      </div>
    );
  } else {
    return <NoData />;
  }
};

export default HasilPengajuan;

