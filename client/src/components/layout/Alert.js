import { useSelector } from "react-redux";

function Alert() {
  const state = useSelector((state) => state.alert);

  return (
    state !== null &&
    state.length > 0 &&
    state.map((alert) => (
      <div key={alert.id} className={` alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
}

export default Alert;
