import axios from 'axios';
import {Header} from '../components/generic/Header'
import { ProfileContain } from '../components/otherprofile/OtherProfileContain';
import { ProfileEdit } from '../components/profile/ProfileEdit';

export const OtherUserProfile = () => {
    // axios.get('api/getinfo').then(data=>data.json() )
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}