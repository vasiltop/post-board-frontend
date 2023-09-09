import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JsonData } from '../../utils/types';

export default function Profile() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [dateCreated, setDateCreated] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch('http://localhost:8000/api/user/info/' + id, {
        method: 'GET',
      });

      const responseJSON: JsonData = await res.json();
      setName(responseJSON.data.user.name);
      setDateCreated(responseJSON.data.user.date);
    }

    getUserInfo();
  }, []);
  return (
    <>
      <h1> {name} </h1>
      <h2> {dateCreated} </h2>
    </>
  );
}
