import axios from 'axios';
import {Header} from '../components/Header'
import { ProfileContain } from '../components/ProfileContain';
import { ProfileEdit } from '../components/ProfileEdit';

export const Profile = () => {
    // axios.get('api/getinfo').then(data=>data.json() )
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}