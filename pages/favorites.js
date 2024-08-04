import {useAtom} from "jotai"
import {favoritesAtom} from "@/store"
import {Row, Col} from "react-bootstrap"
import {Card} from "react-bootstrap"
import ArtworkCard from "@/components/ArtworkCard"

export default function Favorite() {
    const [favoriteList, setFavoritesList] = useAtom(favoritesAtom)

    if(!favoriteList) return null;

    return(
        <Card>
            <Row className="gy-4">
                {favoriteList.length > 0 ? (
                    favoriteList.map((objectID) => (
                        <Col lg={3} key={objectID}>
                            <ArtworkCard objectID={objectID}/>
                        </Col>
                    ))
                ) : (
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            <p>Try adding some new artwork to the list.</p>
                        </Card.Body>
                    </Card>
                )}
            </Row>
        </Card>
    )
}