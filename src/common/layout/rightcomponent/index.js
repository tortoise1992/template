import React from 'react';
import {withRouter} from 'react-router-dom';
import PageRouters from '../../../router/pageRouter'
import './rightcomponent.css'
class RightComponent extends React.Component{
    render () {
        return (
            <div className='rightcomponent'>
                <div className='scrollcontainer'>
                    <PageRouters></PageRouters>
                </div>
            </div>
        )
    }
}
export default withRouter(RightComponent)