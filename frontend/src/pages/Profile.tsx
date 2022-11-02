import {Header} from '../components/generic/Header'
import { ProfileContain } from '../components/profile/ProfileContain';

export const Profile = () => {
    console.log("Profile.tsx")
    // axios.get('api/getinfo').then(data=>data.json() )
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}