import { useState } from "react";
import Modal from "react-modal";
import BaseTable, { Column } from "react-base-table";
import useWindowDimensions from "../hooks/useWindowsDimensions";

export default function MoreInfoButton(props) {
  const { userInfo } = props;
  const newUserInfo = Object.keys(userInfo)?.map((item, id) => {
    return { id: id, key: item, value: userInfo[item] };
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  const setModal = () => setIsOpen(!modalIsOpen);

  return (
    <>
      <button
        className='p-2 bg-sky-200 shadow-sm rounded-lg'
        onClick={setModal}>
        {" "}
        Más Información{" "}
      </button>
      <Modal
        isOpen={modalIsOpen}
        className='border border-slate-500 bg-white m-5 p-5 rounded-xl'
        ariaHideApp={false}>
        <button
          className='fixed right-2 top-2 rounded-full bg-slate-300 px-3 py-1 place-items-center'
          onClick={setModal}>
          X
        </button>
        <div className='h-auto w-full flex flex-row justify-items-stretch'>
          <BaseTable
            data={newUserInfo}
            width={width - 100}
            height={height - 100}
            rowHeight={height / 6}>
            <Column key='key' dataKey='key' width={width / 2} />;
            <Column key='value' dataKey='value' width={width / 2} />;
          </BaseTable>
        </div>
      </Modal>
    </>
  );
}
