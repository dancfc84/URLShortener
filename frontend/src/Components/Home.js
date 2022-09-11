import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config";
import LinkData from "./LinkData";
import styles from "./Home.module.css";

export default function Homepage() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState();
  const [newClick, setNewClick] = useState();
  const [deletedLink, setDeletedLink] = useState();
  const [editedLink, setEditedLink] = useState();

  const [formDataInput, setFormDataInput] = useState({
    full: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/links`);
        setLinks(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [newLink, newClick, deletedLink, editedLink]);


  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setFormDataInput({
      ...formDataInput,
      [name]: value,
    });
  };

  
  const shortenLink = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/links`, formDataInput);
      console.log(data);
      setNewLink(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {links ? (
        <section>
          <div className={styles.main_container}>
            <article className={styles.shorten_input_container}>
              <div className={styles.input_container}>
                <input
                  className={styles.shorten_input}
                  placeholder="URL goes here"
                  type="text"
                  name={"full"}
                  onChange={handleChangeEvent}
                  value={formDataInput.full}
                ></input>
                <button className={styles.shorten_button} onClick={shortenLink}>
                  Shorten
                </button>
              </div>
            </article>
            <article>
              <div>
                <table className={styles.table_style}>
                  <tr>
                    <th>URL</th>
                    <th>Shortened URL</th>
                    <th>Clicks</th>
                    <th></th>
                  </tr>
                  {links.map((link) => {
                    return (
                      <LinkData
                        key={link.short}
                        link={link}
                        setClick={setNewClick}
                        setDelete={setDeletedLink}
                        setEditedLink={setEditedLink}
                      />
                    );
                  })}
                </table>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <p>Loading Data</p>
      )}
    </>
  );
}
