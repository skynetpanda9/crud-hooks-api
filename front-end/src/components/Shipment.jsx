import React, { useState, useEffect } from "react";
import ShipmentDataService from "../fetch-api/ShipmentService";

const Shipment = (props) => {
  const initialShipmentState = {
    id: null,
    title: "",
    type: "",
    status: false,
  };
  const [currentShipment, setCurrentShipment] = useState(initialShipmentState);
  const [message, setMessage] = useState("");

  const getShipment = (id) => {
    ShipmentDataService.get(id)
      .then((response) => {
        setCurrentShipment(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getShipment(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { title, value } = event.target;
    setCurrentShipment({ ...currentShipment, [title]: value });
  };

  const updateStatus = (status) => {
    var data = {
      id: currentShipment.id,
      title: currentShipment.title,
      type: currentShipment.type,
      status: status,
    };

    ShipmentDataService.update(currentShipment.id, data)
      .then((response) => {
        setCurrentShipment({ ...currentShipment, status: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateShipment = () => {
    ShipmentDataService.update(currentShipment.id, currentShipment)
      .then((response) => {
        console.log(response.data);
        setMessage("The shipment was shipped successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteShipment = () => {
    ShipmentDataService.remove(currentShipment.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/shipments");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentShipment ? (
        <div className='edit-form'>
          <h4>Shipment</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Name</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentShipment.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='type'>Type</label>
              <input
                type='text'
                className='form-control'
                id='type'
                name='type'
                value={currentShipment.type}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentShipment.status ? "Shipped" : "Pending"}
            </div>
          </form>

          {currentShipment.status ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className='badge badge-danger mr-2' onClick={deleteShipment}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateShipment}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Shipment...</p>
        </div>
      )}
    </div>
  );
};

export default Shipment;
