import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDevice} from '../actions';
import TableInfo from './TableInfo';

class DeviceInfo extends Component {
     componentDidMount(){
         this.props.fetchDevice();
     }

     render(){
         console.log(this.props)
         return (
             <div>
                <TableInfo {...this.props}/>
             </div>
         );
     }
    // renderDeviceInfo(){
    //     return this.props.deviceInfo.map(deviceinfo => {
    //         return(
    //             <tr>
    //                 <td>{deviceinfo.device_id}</td>
    //                 <td>{deviceinfo.institution_id}</td>
    //                 <td>{deviceinfo.category}</td>
    //                 <td>{deviceinfo.type}</td>
    //             </tr>
                
    //         );
    //     })
    // }
    // render(){
    //     return(
    //         <div>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th> device_id</th>
    //                     <th> institution_id</th>
    //                     <th> category </th>
    //                     <th> type </th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {this.renderDeviceInfo()}
    //             </tbody>
    //         </table>
               
    //         </div>
    //     );
    // }
}

function mapStateToProps(state){
    return { deviceInfo: state.deviceInfo}
}
export default connect(mapStateToProps, {fetchDevice})(DeviceInfo);