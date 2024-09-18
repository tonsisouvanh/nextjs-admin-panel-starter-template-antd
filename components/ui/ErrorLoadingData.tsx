import { Button, Result } from "antd";

const ErrorLoadingData = ({
  message = "Error loading data, please try to refresh.",
}) => {
  return (
    <Result
      status="500"
      title="Error Loading Data"
      subTitle={message}
      extra={
        <Button onClick={() => window.location.reload()} type="primary">
          Refresh
        </Button>
      }
    />
  );
};

export default ErrorLoadingData;
