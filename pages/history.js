import { useRouter } from 'next/router';
import {useAtom} from "jotai";
import { removeFromHistory } from '@/lib/userData';
import { searchHistoryAtom } from "@/store";
import { ListGroup, Card, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';

export default function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if(!searchHistory) return null;

    let parsedHistory = [];

    console.log(`THIS IS THE HISTORY FOUND ${searchHistory}`)
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <div>
            <h1>Search History</h1>
            {parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item key={index} style={{ cursor: 'pointer' }} onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
                            {Object.keys(historyItem).map(key => (
                                <span key={key}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button onClick={(e) => historyClicked(e, index)}>View</Button>
                            <Button className="float-end" variant="danger" size="sm" 
                            onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    )
}