import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JsonData } from '../../utils/types';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

export default function Profile() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [validId, setValidId] = useState(false);
  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch(
        'https://postboardapi.vasiltopalovic.com/user/' + id,
        {
          method: 'GET',
        }
      );

      const responseJSON: JsonData = await res.json();
      setName(responseJSON.data.username);

      if (responseJSON.success) {
        setValidId(true);
      }
    }

    getUserInfo();
  }, []);

  if (!validId) {
    return (
      <>
        <Navbar />
        <div id="profile-content">
          <p> This profile does not exist.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div id="profile-content">
        <h1> {name}'s profile</h1>
      </div>
    </>
  );
}
