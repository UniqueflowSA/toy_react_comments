import { useEffect, useReducer, useRef } from "react";
//댓글 작성폼, 데이터 스프레드시트로 보내기

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ONCHANGE_FORM":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "ONSUBMIT_FORM":
      const getCommentsId = Math.floor(Math.random() * 10000000000000);
      const getCommentsDate = new Date().toLocaleString();

      return {
        ...state,
        commentsId: getCommentsId,
        date: getCommentsDate,
      };
    case "ONRESET_FORM":
      return {
        commentsId: 0,
        nickname: "",
        password: "",
        content: "",
        date: "",
      };
  }
}

function CreateComments() {
  const submitBtnRef = useRef<any>(null);
  const formRef = useRef<any>(null);

  const [formState, dispatch] = useReducer(reducer, {
    commentsId: 0,
    nickname: "",
    password: "",
    content: "",
    date: "",
  });

  let { commentsId, nickname, password, content } = formState;

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "ONCHANGE_FORM",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState);
    if (
      nickname === "" &&
      formState.password === "" &&
      formState.content === ""
    ) {
      return alert("작성되지않은 빈칸이 존재합니다.");
    }

    dispatch({ type: "ONSUBMIT_FORM" });
    console.log(formState);
    submitBtnRef.current.disabled = true;
  };
  useEffect(() => {
    // dispatch commentsId부여 후 fetchDB 통신
    console.log(formState);
    if (commentsId !== 0) {
      fetch(
        "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
        {
          method: "POST",
          body: JSON.stringify(formState),
        }
      )
        .then((res) => {
          formRef.current.reset();
          alert("입력 완료.");
          console.log(res);
          dispatch({ type: "ONRESET_FORM" });
        })
        .catch((error) => {
          console.log(error);
          alert("에러");
        })
        .finally(() => {
          submitBtnRef.current.disabled = false;
        });
    }
  }, [commentsId]);

  return (
    <form ref={formRef} onSubmit={handleOnSubmit}>
      <div>
        {" "}
        <input
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleChangeForm}
          maxLength={20}
        />
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={handleChangeForm}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={content}
          onChange={handleChangeForm}
        ></textarea>
        <button ref={submitBtnRef} name="submit_btn">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreateComments;
