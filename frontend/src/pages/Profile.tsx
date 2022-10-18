import axios from 'axios';
import {Header} from '../components/generic/Header'
import { ProfileContain } from '../components/profile/ProfileContain';
import { ProfileEdit } from '../components/profile/ProfileEdit';

export const Profile = () => {
    // axios.get('api/getinfo').then(data=>data.json() )
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}