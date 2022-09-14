import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import baseUrl from "../config";

export default function Homepage() {
  const { linkId } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/${linkId}`);
        window.location.href = data
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return <>
    <p></p>
  </>
}