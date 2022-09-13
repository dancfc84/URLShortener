import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../config";
import styles from "./LinkData.module.css";

export default function LinkData(props) {

  const [showEditInput, setShowEditInput] = useState(false);
  const link = props.link;

  const [editFormInput, setEditFormInput] = useState({
    full: link.full,
  });

  const copyLink = async () => {
    navigator.clipboard.writeText(`localhost:3000/${link.short}`);
    try {
      const { data } = await axios.put(
        `${baseUrl}/clicks/${link.short}`,
        editFormInput
      );
      props.setClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectLink = async () => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/clicks/${link.short}`,
        editFormInput
      );
      props.setClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editLink = () => {
    setShowEditInput(true);
  };

  const discardEditLink = () => {
    setShowEditInput(false);
  };

  const editLinkSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/${link.short}`,
        editFormInput
      );
      props.setEditedLink(data);
      setShowEditInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLink = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/${link.short}`, editFormInput);
      console.log(data);
      props.setDelete(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setEditFormInput({
      ...editFormInput,
      [name]: value,
    });
  };


  return (
    <>
      <tr className={styles.link_row} key={link.short}>
        {showEditInput ? (
          <td className={styles.edit_link_container}>
            <div className={styles.input_container}>
              <input
                className={styles.edit_input}
                type="text"
                name={"full"}
                onChange={handleChangeEvent}
                value={editFormInput.full}
              ></input>
            </div>
            <div className={styles.button_container}>
              <button className={styles.cancel_button} onClick={discardEditLink}>Cancel</button>
              <button className={styles.save_button} onClick={editLinkSubmit}>Save</button>
            </div>
          </td>
        ) : (
          <td>{link.full.length > 50 ? link.full.slice(0, 50) + '...' : link.full}</td>
        )}

        <td
          onClick={selectLink}
        >
          <a
            href={`https://t1ny-url.netlify.app/${link.short}`} target="_blank" rel="noopener noreferrer"
          >{`https://t1ny-url.netlify.app/${link.short}`}</a>
        </td>
        <td>{link.clicks}</td>
        <td id={styles.button_td}>
          <button
            className={styles.copy_button}
            onClick={copyLink}
          >
            Copyy
          </button>
        </td>
        <td id={styles.button_td}>
          <button
            className={styles.edit_button}
            onClick={editLink}
          >
            Edit
          </button>
        </td>
        <td id={styles.button_td}>
          <svg
            onClick={deleteLink}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </td>
      </tr>
    </>
  );
}
