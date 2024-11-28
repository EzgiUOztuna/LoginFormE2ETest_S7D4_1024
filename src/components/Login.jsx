import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(errorMessages);
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;

    if (name === 'email') {
      if (validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: '' }));
      } else {
        setErrors((prev) => ({ ...prev, email: errorMessages.email }));
      }
    }

    if (name === 'password') {
      if (validatePassword(value)) {
        setErrors((prev) => ({ ...prev, password: '' }));
      } else {
        setErrors((prev) => ({ ...prev, password: errorMessages.password }));
      }
    }

    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 4;

  useEffect(() => {
    setIsValid(
      validateEmail(form.email) && validatePassword(form.password) && form.terms
    );
  }, [form.email, form.password, form.terms]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm);
            history.push('/main');
          } else {
            history.push('/error');
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          valid={errors.email.length === 0}
          invalid={errors.email.length > 0}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          valid={errors.password.length === 0}
          invalid={errors.password.length > 0}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!form.terms}
          valid={form.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
