import axios from 'axios';
import {Header} from '../components/Header'
import { ProfileContain } from '../components/OtherProfileContain';
import { ProfileEdit } from '../components/ProfileEdit';

export const OtherUserProfile = () => {
    // axios.get('api/getinfo').then(data=>data.json() )
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}