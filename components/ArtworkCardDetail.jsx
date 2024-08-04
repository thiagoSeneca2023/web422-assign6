/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Thiago Flores Student ID: 150237220 Date: 2024-07-05
*
********************************************************************************/ 

import React from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useAtom} from "jotai";
import { favoritesAtom} from "@/store";
import { useState, useEffect } from "react";
import { addToFavorites, removeFromFavorites } from '@/lib/userData';

const fetcher = url => fetch(url).then(res => res.json());

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);
  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom)
  const [showAdded, setShowAdded] = useState(false)

  useEffect(()=>{
    setShowAdded(favoritesList?.includes(objectID))
  }, [favoritesList])


  if (error) return <Error statusCode={404} />;
  if (!data) return null;
  const {primaryImage, artistDisplayName, artistWikidata_URL,creditLine, dimensions ,title, objectDate, classification, medium} = data;


  const favoritesClicked = async () => {
    console.log("FAVORITES CLICKED")
    if(showAdded) {
      console.log("Favorites REMOVED")
      setFavoritesList(await removeFromFavorites(objectID));
    } else {
      console.log("Favorite ADDED");
      setFavoritesList(await addToFavorites(objectID));
    }
    setShowAdded(!showAdded);
  }

  return (
    <Card>
        {primaryImage && <Card.Img variant="top" src= {primaryImage} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
            Date: {objectDate || 'N/A'} <br />
            Classification: {classification || 'N/A'} <br />
            Medium: {medium || 'N/A'} <br /><br />
            Artist Name: {artistDisplayName || 'N/A'} <a href={artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a><br />
            Credit Line: {creditLine || 'N/A'}<br />
            Dimensions: {dimensions || 'N/A'}<br />
        </Card.Text>
        <button variant = {showAdded ? "primary" : "outline-primary"} onClick={favoritesClicked}>
          {showAdded ? "+ Favorite (added)" : "+ Favorite"}
        </button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
