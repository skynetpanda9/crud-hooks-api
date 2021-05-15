import React, { useState } from "react";
import ShipmentDataService from "../fetch-api/ShipmentService";

const AddShipment = () => {
  const initialShipmentState = {
    id: null,
    title: "",
    type: "",
    status: false,
  };
  const [shipment, setShipment] = useState(initialShipmentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { title, value } = event.target;
    setShipment({ ...shipment, [title]: value });
  };

  const saveShipment = () => {
    var data = {
      id: shipment.id,
      title: shipment.title,
      type: shipment.type,
    };

    ShipmentDataService.create(data)
      .then((response) => {
        setShipment({
          id: response.data.id,
          title: response.data.title,
          type: response.data.type,
          status: response.data.shipped,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newShipment = () => {
    setShipment(initialShipmentState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You've submitted successfully!</h4>
          <button className='btn btn-success' onClick={newShipment}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={shipment.title}
              onChange={handleInputChange}
              name='title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='type'>Type</label>
            <input
              type='text'
              className='form-control'
              id='type'
              required
              value={shipment.type}
              onChange={handleInputChange}
              name='type'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='id'>ID</label>
            <input
              type='text'
              className='form-control'
              id='id'
              required
              value={shipment.id}
              onChange={handleInputChange}
              name='id'
            />
          </div>

          <button onClick={saveShipment} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddShipment;
