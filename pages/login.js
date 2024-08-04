import { Card, Form, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { searchHistoryAtom, favoritesAtom } from '@/store';
import { getFavorites, getHistory } from '../lib/userData';
import { authenticateUser } from "@/lib/authenticate";

export default function Login(props){

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [warning, setWarning] = useState('');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const router = useRouter();

  async function updateAtoms(){
    setFavorites(await getFavorites()); 
    setSearchHistory(await getHistory()); 
  }

  async function onSubmit(data) {
    console.log("Submitted data:", data);
    const { userName, password } = data;
    try {
        await authenticateUser(userName, password);
        await updateAtoms();
        router.push('/favorites');
    } catch (err) {
        setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control 
            type="text" 
            id="userName" 
            {...register('userName', { required: true })} 
          />
          {errors.userName && <span className="text-danger">This field is required</span>}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            id="password" 
            {...register('password', { required: true })} 
          />
          {errors.password && <span className="text-danger">This field is required</span>}
        </Form.Group>
        <br />
        {warning && <p className="text-danger">{warning}</p>}
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}
