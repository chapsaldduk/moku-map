import { Map, MapMarker } from "react-kakao-maps-sdk";
import data from "./assets/markets.json";
import { useState } from "react";
import "./style/App.scss";

function App() {
  const [isClicked, setIsClicked] = useState(0);
  const [isLat, setIsLat] = useState();
  const [isLon, setIsLon] = useState();
  const markets = data;

  setInterval(() => getLocate(), 1000);

  const getLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setIsLat(position.coords.latitude);
        setIsLon(position.coords.longitude);
      });
    }
  };
  const getMyMarkers = () => {
    console.log("Me!");
    return (
      <MapMarker
        key={"myLocation"}
        position={{ lat: isLat, lng: isLon }}
        clickable={true}
      />
    );
  };

  const getMarkers = (data) => {
    const result = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      result.push(
        <MapMarker
          key={i}
          position={{ lat: data[i].latitude, lng: data[i].longitude }}
          clickable={true}
          onClick={() => setIsClicked(i)}
        ></MapMarker>
      );
    }
    return result;
  };

  const getOpenTime = () => {
    if (isClicked !== 0) {
      return (
        <div id="opentime">
          <span className="title">영업시간</span>
          <br />
          <br />
          <span>{`월: ${data[isClicked].mon}` ?? " "}</span>
          <br />
          <span>화: {data[isClicked].tue ?? " "}</span>
          <br />
          <span>수: {data[isClicked].wed ?? " "}</span>
          <br />
          <span>목: {data[isClicked].thu ?? " "}</span>
          <br />
          <span>금: {data[isClicked].fri ?? " "}</span>
          <br />
          <span>토: {data[isClicked].sat ?? " "}</span>
          <br />
          <span>일: {data[isClicked].sun ?? " "}</span>
        </div>
      );
    }
    return " ";
  };

  return (
    <Map
      center={{
        lat: isLat ?? 37.5579,
        lng: isLon ?? 126.9244,
      }} // 현재 위치 시작, default 홍대입구역
      id="Map"
    >
      {getMarkers(markets)}
      {getMyMarkers()}
      <div id="info">
        <img src="./assets/logo/모쿠.png" alt="" />
        <span className="line"></span>
        <div className="text">
          <div id="title">{data[isClicked].name ?? "이름 정보 없음"}</div>
          <br />
          <div id="type">{data[isClicked].type ?? "분류 정보 없음"}</div>
          <br />
          <div id="address">{data[isClicked].address ?? "주소 정보 없음"}</div>
          <br />
          <div id="number">{data[isClicked].number ?? "전화번호 없음"}</div>
          <br />

          {/* 영업시간 */}
          {getOpenTime()}
        </div>
      </div>
    </Map>
  );
}
export default App;
