import { Map, MapMarker } from "react-kakao-maps-sdk";
import data from "./assets/markets.json";
import ContentPC from "./components/ContentPC";
import ContentMobile from "./components/ContentMobile";
import useStore from "./store";
import { useEffect, useMemo } from "react";
import "./style/App.scss";

function App() {
  const { isClicked, setIsClicked, centerLocate, locate, setLocate, isPanto } =
    useStore();
  useEffect(() => {
    const getLocate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          setLocate(position.coords.latitude, position.coords.longitude);
        });
      }
    };
    getLocate();
  }, []);

  /** user's location */
  const getMyMarker = () => {
    return (
      <MapMarker
        key={"myLocation"}
        position={{ lat: locate.lat, lng: locate.lon }}
        clickable={false}
        image={{
          src: "./assets/marker/marker.png",
          size: {
            width: 30,
            height: 30,
          },
        }}
      />
    );
  };

  // Markers
  const getMarkers = useMemo(() => {
    const result = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      console.log("Render");
      result.push(
        <MapMarker
          key={i}
          position={{ lat: data[i].latitude, lng: data[i].longitude }}
          clickable={true}
          onClick={() => {
            setIsClicked(i);
          }}
          image={{
            src:
              isClicked === i
                ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
                : "https://t1.daumcdn.net/mapjsapi/images/marker.png",
            size: {
              width: 24,
              height: 35,
            },
          }}
        />
      );
    }
    return result;
  }, [data, isClicked, setIsClicked]);

  //홍대입구역: {lat: 37.5579, lng: 126.9244}
  return (
    <div id="App">
      <Map
        center={{
          lat: centerLocate.lat ?? 37.5579,
          lng: centerLocate.lon ?? 126.9244,
        }} // 현재 위치 시작, default 홍대입구역
        id="Map"
        isPanto={isPanto}
        level={9} // project: 9
      >
        {getMarkers}
        {getMyMarker()}
        <ContentPC data={data} />
        <a href="https://bit.ly/3Y3HeJX" target="_blank" rel="noreferrer">
          <div className="opinion-button">
            <span>의견 남기기</span>
          </div>
        </a>
      </Map>
      <img id="logo-mobile" src="./assets/logo/모쿠.png" alt="" />
      <ContentMobile data={data} />
    </div>
  );
}
export default App;
