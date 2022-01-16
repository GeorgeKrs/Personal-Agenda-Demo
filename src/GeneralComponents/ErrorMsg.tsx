interface Props {
  msg: string;
}

const ErrorMsg = (props: Props) => {
  return (
    <div>
      <h6 className="mt-1 text-danger">{props.msg}</h6>
    </div>
  );
};

export default ErrorMsg;
