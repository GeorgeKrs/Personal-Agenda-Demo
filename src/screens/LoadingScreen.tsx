const LoadingScreen = () => {
  return (
    <div
      className="bg-light d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <span className="my-auto spinner-border spinner-border-sm" />
      <h6 className="px-1 my-auto">Initializing app, Please wait..</h6>
    </div>
  );
};

export default LoadingScreen;
