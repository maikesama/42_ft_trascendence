import {Header} from '../components/generic/Header';
import { OtherProfileContain } from '../components/otherprofile/OtherProfileContain';

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