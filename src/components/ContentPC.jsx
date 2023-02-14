import useStore from "../store";

const ContentPC = (props) => {
  const data = props.data;
  const { isClicked, setCenter, locate, setIsPanto, isPanto } = useStore();

  return (
    <div id="info">
      <img src="./assets/logo/모쿠.png" alt="" />
      <span className="line"></span>
      <div className="text">
        {isClicked === 0 ? (
          <div id="title">
            <span>매장 정보는</span>
            <br />
            <span>마커를 클릭해주세요</span>
          </div>
        ) : data[isClicked].link !== null &&
          data[isClicked].link !== undefined ? (
          <a href={`${data[isClicked].link}`} target="_blank" rel="noreferrer">
            <div id="title">{data[isClicked].name ?? "이름 정보 없음"}</div>
          </a>
        ) : (
          <div id="title">{data[isClicked].name ?? "이름 정보 없음"}</div>
        )}
        <div id="type">{data[isClicked].type ?? "분류 정보 없음"}</div>
        <br />
        <div id="address">{data[isClicked].address ?? "주소 정보 없음"}</div>
        <br />
        <div id="number">
          {data[isClicked].number !== undefined &&
          data[isClicked].number !== null
            ? `☎ ${data[isClicked].number}`
            : " "}
        </div>
        <br />
        {isClicked !== 0 ? (
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
            {/* <button
              onClick={() => {
                setCenter(locate.lat, locate.lon);
                setIsPanto(isPanto === false ? true : false); // zustand에서 state로 접근이 안되서 만든 임시방편
                console.log(locate);
                console.log(isPanto);
              }}
            >
              현재위치로 이동
            </button> */}
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default ContentPC;
