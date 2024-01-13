import { useEffect, useState } from "react";
function CommentsList() {
  const [commentsData, setCommentsData] = useState([]);
  useEffect(() => {
    //시트 데이터 가져오기
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCommentsData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h2> 아아아ㅣ아잉</h2>
      <div>
        {commentsData.map((item) => (
          <div className="commentsBlock" key={item[0]}>
            <div>
              {" "}
              <span>{item[1]}</span>
              <span>{item[4]}</span>
            </div>
            <div>{item[3]}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentsList;
