import ListGroup from 'react-bootstrap/ListGroup'

function Summary(modalInfo) {
  return (
    <ListGroup>
      <ListGroup.Item>Device Status:  {modalInfo.status}</ListGroup.Item>
      <ListGroup.Item>Model:  {modalInfo.model}</ListGroup.Item>
      <ListGroup.Item>Serial Number:  {modalInfo.serial_number}</ListGroup.Item>
      <ListGroup.Item>Manufacturer:  {modalInfo.manufacturer}</ListGroup.Item>
      <ListGroup.Item>Application Version:  {modalInfo.app_Version}</ListGroup.Item>
      <ListGroup.Item>Firware Version:  {modalInfo.firware_Version}</ListGroup.Item>
      <ListGroup.Item>License Key:  {modalInfo.license_key}</ListGroup.Item>
      <ListGroup.Item>License Expiry Date:  {modalInfo.license_expiry}</ListGroup.Item>
      <ListGroup.Item>Error message:  {modalInfo.error}</ListGroup.Item>
      <ListGroup.Item>Last Status Time:  {modalInfo.status_date_time}</ListGroup.Item>

    </ListGroup>
  );

}
export default Summary;