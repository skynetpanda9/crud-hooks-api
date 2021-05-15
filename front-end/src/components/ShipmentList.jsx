import React, { useState, useEffect } from "react";
import ShipmentDataService from "../fetch-api/ShipmentService";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [currentShipment, setCurrentShipment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [10, 50, 100];

  const onChangeSearchName = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveShipments = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    ShipmentDataService.getAll(params)
      .then((response) => {
        const { shipments, totalPages } = response.data;
        setShipments(shipments);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveShipments, [page, pageSize, searchTitle]);

  const refreshList = () => {
    retrieveShipments();
    setCurrentShipment(null);
    setCurrentIndex(-1);
  };

  const setActiveShipment = (shipment, index) => {
    setCurrentShipment(shipment);
    setCurrentIndex(index);
  };

  const removeAllShipments = () => {
    ShipmentDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by Name'
            value={searchTitle}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={retrieveShipments}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Shipments List</h4>

        <div className='mt-3'>
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className='my-3'
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant='outlined'
            shape='rounded'
            onChange={handlePageChange}
          />
        </div>

        <ul className='list-group'>
          {shipments &&
            shipments.map((shipment, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveShipment(shipment, index)}
                key={index}
              >
                {shipment.name}
              </li>
            ))}
        </ul>

        <button
          className='m-3 btn btn-sm btn-danger'
          onClick={removeAllShipments}
        >
          Remove All
        </button>
      </div>
      <div className='col-md-6'>
        {currentShipment ? (
          <div>
            <h4>Shipment</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentShipment.name}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentShipment.type}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentShipment.status ? "Shipped" : "Pending"}
            </div>

            <Link
              to={"/shipments/" + currentShipment.id}
              className='badge badge-warning'
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Shipment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentList;
