import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Tab } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from 'react-bootstrap/Tabs';
import paginationFactory from "react-bootstrap-table2-paginator";
import './ClickableTable.css';
import { fetchDevice } from '../actions';
import ListGroup from 'react-bootstrap/ListGroup'

import Summary from './Summary';


function ClickableTable(props) {

  const [deviceinfo, setDeviceinfo] = useState([]);

  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState([false]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    // logic for bringing in data object
    setDeviceinfo(props.deviceInfo)
  })

  const columns = [
    {
      dataField: 'device_id',
      text: 'Device ID',
      headerStyle: { textAlign: 'center' }
    },
    {
      dataField: 'university_id',
      text: 'University ID',
      headerStyle: { textAlign: 'center' }
    },
    {
      dataField: 'category',
      text: 'Category',
      headerStyle: { textAlign: 'center' }
    },
    {
      dataField: 'type',
      text: 'Type',
      headerStyle: { textAlign: 'center' }
    }
  ];

  const datas = deviceinfo.map(infos => (
    {
      device_id: infos.device_id,
      university_id: infos.institution_id,
      category: infos.category,
      type: infos.type,
      error: infos.errorText,
      model: infos.model,
      app_Version: infos.applicationVersion,
      firware_Version: infos.firmwareVersion,
      license_expiry: infos.licenseExpiry,
      license_key: infos.licenseKey,
      manufacturer: infos.manufacturer,
      serial_number: infos.serialNumber,
      status: infos.status,
      status_date_time: infos.statusDateTime,
      id: infos._id

    }
  ));




  const rowEvents = {
    onClick: (e, row) => {
      //console.log(row)
      setModalInfo(row)
      toggleTrueFalse()
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };
  const ModalContent = () => {
    return (
      <Modal {...props}
        className="custom-modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title
            centered > {modalInfo.device_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs fill variant="tabs" className="summaryTab" defaultActiveKey="summary" headerStyle={{ fontWeight: 'bold' }} activeHeaderStyle={{ color: 'white' }} id="uncontrolled-tab-example"  >
            <Tab eventKey="summary" title="Summary">

              <Summary {...modalInfo} />
            </Tab>
            <Tab eventKey="error" title="Error encountered">
              <ListGroup>
                <ListGroup.Item>Error1 </ListGroup.Item>
                <ListGroup.Item> Error2 </ListGroup.Item>
              </ListGroup>
              {/* <Errors /> */}
            </Tab>
            <Tab eventKey="history" title="History">
              <ListGroup>
                <ListGroup.Item>History1 </ListGroup.Item>
                <ListGroup.Item> History2 </ListGroup.Item>
              </ListGroup>
              {/* <History /> */}
            </Tab>
          </Tabs>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>
    );

  };




  return (
    console.log(props),
    <div className="App">
      <BootstrapTable
        striped bordered hover size="sm" ali
        keyField="id"
        data={datas}
        columns={columns}
        rowEvents={rowEvents}
        pagination={paginationFactory()}
      />
      {show ? <ModalContent /> : null}
    </div>
  );

}
export default ClickableTable;
