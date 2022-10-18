import axios from 'axios';
import {Header} from '../components/generic/Header'
import {Route, Routes} from 'react-router-dom';
import { OtherProfileContain } from '../components/otherprofile/OtherProfileContain';
import { ProfileEdit } from '../components/profile/ProfileEdit';

export const OtherUserProfile = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    return (
        <>
       
        <Header/>
        <OtherProfileContain/>
        
        </>
    );
}