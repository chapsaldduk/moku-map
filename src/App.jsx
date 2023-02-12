import { Map, MapMarker } from "react-kakao-maps-sdk";
import data from "./assets/markets.json";
import ContentPC from "./components/ContentPC";
import ContentMobile from "./components/ContentMobile";
import useStore from "./store";
import "./style/App.scss";

function App() {
  const {
    isClicked,
    setIsClicked,
    centerLocate,
    setCenter,
    locate,
    setLocate,
    isPanto,
    setIsPanto,
  } = useStore();

  const markets = data;

  /** 현재 위치 정보 -> state isLat, isLon에 저장 */
  const getLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLocate(position.coords.latitude, position.coords.longitude);
      });
    }
  };
  getLocate();

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

  /** markers */
  const getMarkers = (data) => {
    const result = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
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
  };

  /** open time and find road */
  const getContent = () => {
    if (isClicked !== 0) {
      return (
        <div id="opentime">
          <span className="title">영업시간</span>
          <br />
          <span>월: {data[isClicked].mon ?? "정보 없음"}</span>
          <br />
          <span>화: {data[isClicked].tue ?? "정보 없음"}</span>
          <br />
          <span>수: {data[isClicked].wed ?? "정보 없음"}</span>
          <br />
          <span>목: {data[isClicked].thu ?? "정보 없음"}</span>
          <br />
          <span>금: {data[isClicked].fri ?? "정보 없음"}</span>
          <br />
          <span>토: {data[isClicked].sat ?? "정보 없음"}</span>
          <br />
          <span>일: {data[isClicked].sun ?? "정보 없음"}</span>
          <br />
          <br />
          <span className="gil">
            <a
              href={`https://map.kakao.com/link/to/${data[isClicked].name},${data[isClicked].latitude},${data[isClicked].longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              카카오맵 길찾기
            </a>
          </span>
          <br />
          <br />
          <button
            onClick={() => {
              setCenter(locate.lat, locate.lon);
              setIsPanto();
            }}
          >
            현재위치로 이동
          </button>
        </div>
      );
    }
    return " ";
  };

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
        {getMarkers(markets)}
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
