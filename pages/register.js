import { Card, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { registerUser } from "@/lib/authenticate";
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";


export default function Register(props){

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function onSubmit(data) {
    console.log("handle submit running");
    const { userName, password, password2 } = data;
    try {
      await registerUser(userName, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Register for an account:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control 
            type="text" 
            id="userName" 
            name="userName" 
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
            name="password" 
            {...register('password', { required: true })} 
          />
          {errors.password && <span className="text-danger">This field is required</span>}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            type="password" 
            id="password2" 
            name="password2" 
            {...register('password2', { required: true })} 
          />
          {errors.password2 && <span className="text-danger">This field is required</span>}
        </Form.Group>
        <br />
        {warning && <p className="text-danger">{warning}</p>}
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
}