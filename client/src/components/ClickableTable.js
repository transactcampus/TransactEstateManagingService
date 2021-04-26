import React, { useEffect, useState } from 'react';
import { Modal, Button, Tab } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from 'react-bootstrap/Tabs';
import paginationFactory from "react-bootstrap-table2-paginator";
import './ClickableTable.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Summary from './Summary';
import { Form } from 'react-bootstrap';

function ClickableTable(props) {

  const [deviceinfo, setDeviceinfo] = useState([]);
  const [q, setQ] = useState("");

  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState([false]);
  const [isMobile, setIsMobile] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResize = () => {
    if (window.innerWidth < 800 || window.innerWidth < 500) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(() => {
    setDeviceinfo(props.deviceInfo);
    window.addEventListener("resize", handleResize);
  })

  const columns = [
    {
      dataField: 'device_id',
      text: 'Device ID',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    },
    {
      dataField: 'university_id',
      text: 'University ID',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    },
    {
      dataField: 'category',
      text: 'Category',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    },
    {
      dataField: 'type',
      text: 'Type',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    },
    {
      dataField: 'status',
      text: 'Status',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    }
  ];

  const smallscreencolumns = [
    {
      dataField: 'device_id',
      text: 'Device ID',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
    },
    {
      dataField: 'status',
      text: 'Status',
      headerStyle: { textAlign: 'center' },
      sort: true,
      align: 'center'
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

  function search(rows) {

    return rows.filter(
      (row) =>
        row.device_id.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.university_id.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.category.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.type.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.status.toLowerCase().indexOf(q.toLowerCase()) > -1

    );

  }


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
        className="custom-modal "
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title
            className='text-center'

          > {isMobile ? <h5>{modalInfo.device_id}</h5> : <h4 >{modalInfo.device_id}</h4>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            fill
            variant="tabs"
            className="summaryTab"
            defaultActiveKey="summary"
            headerStyle={{ fontWeight: 'bold' }}
            activeHeaderStyle={{ color: 'white' }}
            id="uncontrolled-tab-example"
            animation="true"
          >
            <Tab tabClassName="bg-info text-light" eventKey="summary" title="Summary">
              <Summary {...modalInfo} />
            </Tab>
            <Tab tabClassName="bg-danger text-light" eventKey="error" title="Error encountered">
              <ListGroup>
                <ListGroup.Item>Error1 </ListGroup.Item>
                <ListGroup.Item> Error2 </ListGroup.Item>
              </ListGroup>
              {/* <Errors /> */}
            </Tab>
            <Tab tabClassName="bg-secondary text-light" eventKey="history" title="History">
              <ListGroup>
                <ListGroup.Item>History1 </ListGroup.Item>
                <ListGroup.Item> History2 </ListGroup.Item>
              </ListGroup>
              {/* <History /> */}
            </Tab>
          </Tabs>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>
    );

  };




  return (

    <div className="App">
      <div className='border border-light mb-5'>
        <input style={{ border: "none" }} size="sm" className="mb-3" type="text" placeholder=" Enter your search query..." className="form-control" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {isMobile ? <BootstrapTable
        striped
        bordered
        hover
        size="sm"
        ali
        keyField="id"
        data={search(datas)}
        columns={smallscreencolumns}
        rowEvents={rowEvents}
        pagination={paginationFactory()}
      /> :
        <BootstrapTable
          striped
          bordered
          hover
          size="sm"
          ali
          keyField="id"
          data={search(datas)}
          columns={columns}
          rowEvents={rowEvents}
          pagination={paginationFactory()}
        />}

      {show ? <ModalContent /> : null}
    </div>
  );

}
export default ClickableTable;
