import { ShieldAlert } from "lucide-react";
function Message({ text }) {
  return (
    <div className="toast toast-top toast-end mt-[120px] error z-50">
      <div className="alert alert-info bg-[#15a5ff] border-white text-white font-semibold">
        <ShieldAlert />
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Message;
