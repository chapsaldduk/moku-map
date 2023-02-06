import { Map, MapMarker } from "react-kakao-maps-sdk";
import data from "./assets/markets.json";
import { useState } from "react";
import "./style/App.scss";

function App() {
  const [isClicked, setIsClicked] = useState(0);
  const markets = data;
  // console.log(isClicked);
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

  return (
    <Map
      center={{ lat: 37.5579, lng: 126.9244 }} // 홍대입구역
      style={{ width: "100%", height: "100vh", zIndex: "10" }} // 화면 전체
    >
      {getMarkers(markets)}
      <div id="info">
        <div className="text">
          <div id="title">{data[isClicked].name ?? "이름 정보 없음"}</div>
          <br />
          <div id="type">{data[isClicked].type ?? "분류 정보 없음"}</div>
          <br />
          <div id="address">{data[isClicked].address ?? "주소 정보 없음"}</div>
          <br />
          <div id="number">{data[isClicked].number ?? "전화번호 없음"}</div>
        </div>
      </div>
    </Map>
  );
}
export default App;
