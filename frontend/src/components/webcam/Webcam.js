import React, { useEffect, useState, useContext } from "react";
import style from "./webcam.module.css";
import { LocationInfoContext } from "../../contexts/LocationContext";

const Webcam = () => {
  const APP_KEY = "DO9SePA2zKWhEzuZmbZqeIbh9d31mgkr";
  const [location, setLocation] = useContext(LocationInfoContext);
  const [webcamsLinks, setWebcamsLinks] = useState([]);
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(async () => {
    setWebcamsLinks([]);
    setFound(true);
    let [city, country] = location.split(", ");
    getWebcams(city, country);
  }, [location]);

  const getWebcams = async (city, country) => {
    setSearching(true);
    let webcams = [];
    let offset = 0;
    let limit = 50;
    let data;

    let response = await fetch(
      `https://api.windy.com/api/webcams/v2/list/limit=${limit},${offset}/country=${country}?category=city/orderby=popularity&key=${APP_KEY}`
    );
    data = await response.json();
    webcams = webcams.concat(data.result.webcams);
    offset += limit;

    const no_webcams = data.result.total;

    while (no_webcams > offset) {
      response = await fetch(
        `https://api.windy.com/api/webcams/v2/list/limit=${limit},${offset}/country=${country}?category=city/orderby=popularity&key=${APP_KEY}`
      );
      data = await response.json();
      webcams = webcams.concat(data.result.webcams);
      offset += limit;
    }

    let clean_city = city.normalize("NFKD").replace(/[^\w]/g, "");

    let result = [];
    let max_results = 5;
    for (let i = 0; i < webcams.length; i++) {
      if (
        String(webcams[i].title.normalize("NFKD").replace(/[^\w]/g, ""))
          .toLowerCase()
          .search(String(clean_city).toLowerCase()) > -1
      ) {
        result.push(webcams[i]);
        max_results--;
      }

      if (max_results == 0) {
        break;
      }
    }

    webcams = [];
    for (let i = 0; i < result.length; i++) {
      response = await fetch(
        `https://api.windy.com/api/webcams/v2/list/webcam=${result[i].id}?show=webcams:player&key=${APP_KEY}`
      );
      data = await response.json();
      webcams.push(data);
    }

    let links = [];
    for (let i = 0; i < webcams.length; i++) {
      if (webcams[i].result.webcams[0].player.day.available) {
        links.push({
          link: webcams[i].result.webcams[0].player.day.embed,
          title: result[i].title,
        });
      }
    }

    if (links.length == 0) {
      setFound(false);
    }

    setWebcamsLinks(links);
    setSearching(false);
  };

  return (
    <div className={style["webcam-container"]}>
      <h1>Webcams</h1>
      {searching ? (
        <h3 className={style.text}>Searching for webcams...</h3>
      ) : (
        ""
      )}
      {!found ? (
        <h3 className={style.text}>There are no available webcams.</h3>
      ) : (
        ""
      )}
      {webcamsLinks.map((webcamLink) => (
        <a
          href={webcamLink.link}
          className={style.link}
          key={webcamLink.title}
          target="_blank"
        >
          {webcamLink.title}
        </a>
      ))}
    </div>
  );
};

export default Webcam;
