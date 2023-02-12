import useStore from "../store";

const ContentMobile = (props) => {
  const data = props.data;
  const { isClicked } = useStore();
  return (
    <div id="info-mobile">
      <span className="line"></span>
      <div className="text">
        <br />
        <br />
        {isClicked === 0 ? (
          <div id="title">
            <span>매장 정보는</span>
            <br />
            <span>마커를 클릭해주세요</span>
          </div>
        ) : (
          <a href={`${data[isClicked].link}`} target="_blank" rel="noreferrer">
            <div id="title">{data[isClicked].name ?? "이름 정보 없음"}</div>
          </a>
        )}
        <br />
        <div id="type">{data[isClicked].type ?? "분류 정보 없음"}</div>
        <br />
        <div id="address">{data[isClicked].address ?? "주소 정보 없음"}</div>
        <br />
        <a href={`tel:${data[isClicked].number}`}>
          <div id="number" className="number-mobile">
            {data[isClicked].number !== undefined &&
            data[isClicked].number !== null
              ? `☎ ${data[isClicked].number}`
              : " "}
          </div>
        </a>
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
          </div>
        ) : (
          " "
        )}
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ContentMobile;
