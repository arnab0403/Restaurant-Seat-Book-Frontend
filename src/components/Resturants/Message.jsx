import { CheckCheck } from "lucide-react";
function Message({ text }) {
  return (
    <div className="toast toast-top toast-end mt-[120px] error z-50">
      <div className="alert alert-info bg-black border-none text-white font-semibold">
        <CheckCheck />
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Message;
