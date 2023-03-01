import loading from "../../src/img/loading.gif";

function Loading() {
  return (
    <>
      <img
        src={loading}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-50px",
          width: "100px",
          height: "100px",
        }}
        alt="loading"
      />
    </>
  );
}

export default Loading;
