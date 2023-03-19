import { useDispatch } from "react-redux";

import { setPage } from "@/store/slices";

interface ConfirmModalProps {
  setIsModalOpen: (value: boolean) => void;
}
export const ConfirmModal = ({ setIsModalOpen }: ConfirmModalProps) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-700 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
      <div className="bg-dark1 px-16 py-14 rounded-md text-center mx-10">
        <h1 className="text-xl mb-4 font-bold text-white">
          Do you want end the Tournament to see results?
        </h1>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gradient-to-r from-red-600 to-orange-400 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => dispatch(setPage("Results"))}
          className="bg-gradient-to-r from-sky-600 to-teal-300 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
};
