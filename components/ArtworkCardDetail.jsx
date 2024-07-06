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
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;
  const {primaryImage, artistDisplayName, artistWikidata_URL,creditLine, dimensions ,title, objectDate, classification, medium} = data;

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
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
