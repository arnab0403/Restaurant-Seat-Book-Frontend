import { ShieldAlert } from "lucide-react";
function Error({ text }) {
  return (
    <div className="toast toast-top toast-end mt-[90px] error">
      <div className="alert alert-info bg-[red] border-red-300 text-white font-semibold">
        <ShieldAlert />
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Error;
