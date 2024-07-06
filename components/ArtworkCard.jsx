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
  const {primaryImageSmall, title, objectDate, classification, medium} = data;

  return (
    <Card style={{ width: '18rem', height: '33rem'}}>
      <Card.Img style={{ width: '286px', height: '287px'}} variant="top" src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
            Date: {objectDate || 'N/A'} <br />
            Classification: {classification || 'N/A'} <br />
            Medium: {medium || 'N/A'}
        </Card.Text>
      </Card.Body>
        <div style={{marginBottom:'10px', marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="primary">View More</Button>
          </Link>
        </div>
    </Card>
  );
};

export default ArtworkCard;
