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

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AdvancedSearch() {

    const router = useRouter();

    const submitForm = (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation && data.geoLocation !== "") {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium && data.medium !== "") {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    router.push(`/artwork?${queryString}`);
  };


    return (
        <Form onSubmit={submitForm}>
        <Row>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control type="text" placeholder="" name="q" />
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select name="searchBy" className="mb-3">
                <option value="title">Title</option>
                <option value="tags">Tags</option>
                <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
            </Col>
            <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Geo Location</Form.Label>
                <Form.Control type="text" placeholder="" name="geoLocation" />
                <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
            </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Medium</Form.Label>
                <Form.Control type="text" placeholder="" name="medium"/>
                <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form.Check
                type="checkbox"
                label="Highlighted"
                name="isHighlight"
            />
            <Form.Check
                type="checkbox"
                label="Currently on View"
                name="isOnView"
            />
            </Col>
        </Row>
        <Row>
            <Col>
            <br />
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Col>
        </Row>
        </Form>
    )
}