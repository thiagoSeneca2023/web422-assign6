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

import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import {useRouter} from 'next/router';
import { Row, Col } from 'react-bootstrap';

export default function artwork() {
    const router = useRouter();
    const {objectID} = router.query;

    return(
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>

    )
}