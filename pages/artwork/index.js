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

import { useState, useEffect } from "react";
import useSWR from 'swr';
import {useRouter} from 'next/router';
import ArtworkCard from '@/components/ArtworkCard';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import Error from "next/error"
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12;

export default function ArtworkExplorer({}) {
    const [artworkList, setArtworkList] = useState([]); //might not need
    const [page, setPage] = useState(1);          //might not need

    const router = useRouter();                   //might not need
    let finalQuery = router.asPath.split('?')[1]; //might not need

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    const previous = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    
    const next = () => {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
      };

    useEffect(() => {
        if (data && data.objectIDs) {
          let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
          let results = [];
          for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
            const chunk = filteredResults.slice(i, i + PER_PAGE);
            results.push(chunk);
        }        
          setArtworkList(results);
          setPage(1);
        }
    }, [data]);

    //TODO: check if the error can be returned with a condition before
    if (error) return <Error statusCode={404} />;

    console.log(artworkList);
    return (
        <>
          {artworkList ? (
            <Row className="gy-4">
              {artworkList.length > 0 ? (
                artworkList[page - 1]?.map((currentObjectID) => (
                  <Col lg={3} key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
                  </Col>
                ))
              ) : (
                <Card>
                  <h4>Nothing Here</h4>
                </Card>
              )}
            </Row>
          ) : null}
      
          {artworkList?.length > 0 && (
            <div style={{marginTop:'10px'}}>
            <Row>
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={previous} disabled={page === 1} />
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Next onClick={next} />
                </Pagination>
              </Col>
            </Row>
            </div>
          )}
        </>
      );
      

}