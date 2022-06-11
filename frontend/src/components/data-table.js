import React, { useState, useEffect } from "react";
import testData from "../data/data.json";
import Popup from "./modal";
import { Button, Checkbox, Icon, Table, Message } from "semantic-ui-react";
import { Form } from "react-bootstrap";
import * as xlsx from "xlsx";

const DataTable = props => {
  const [headers, setHeaders] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [fileName, setFileName] = useState("Registration table");
  const [data, setData] = useState(testData);
  const scrollStyle = { width: "90%", height: "80%", overflowX: "scroll" };
  const noScrollStyle = { width: "100%", height: "100%" };
  const [tableStyle, setTableStyle] = useState(noScrollStyle);

  useEffect(
    () => {
      getHeaders();
    },
    [data]
  );

  const getHeaders = () => {
    if (data.length !== 0) {
      var headerList = Object.keys(data[0]);
      setHeaders(headerList);
      if (headerList.length > 8) {
        setTableStyle(scrollStyle);
      }
    } else {
      setHeaders([]);
      console.log("empty data");
    }
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleupload = event => {
    console.log("call handleupload");
    // event.stopPropagation();
    // event.preventDefault();
    processFile(event);
  };

  const onSelect = event => {
    setDeleted(current => [...current, parseInt(event.target.id)]);
  };

  const add = event => {
    console.log(event.target);
    let newElement = addNewElement();
    setData(existing => [...existing, newElement]);
  };

  const addNew = newElement => {
    setData(existing => [...existing, newElement]);
  };

  const addNewElement = () => {
    var newElement = {};
    headers.map((header, index) => {
      newElement[header] = "test";
    });
    return newElement;
  };

  const remove = event => {
    let updatedData = data.filter((item, index) => !deleted.includes(index));
    setData(updatedData);
  };
  const removeAll = event => {
    setData([]);
  };

  const processFile = event => {
    console.log("call processFile");
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = event => {
        const data = event.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData(json);
        getHeaders();
        setFileName(fileName);
      };
      reader.readAsArrayBuffer(event.target.files[0]);
      const fileName = event.target.files[0].name;
    }
  };

  return (
    <div style={tableStyle}>
      <h1>
        <strong>{fileName}</strong>
      </h1>
      {data.length !== 0 ? (
        <div>
          <Button onClick={add} icon labelPosition="right" size="small">
            Add <Icon name="add" />
          </Button>
          <Button onClick={remove} icon labelPosition="right" size="small">
            Remove <Icon name="remove" />
          </Button>
          <Button onClick={removeAll} icon labelPosition="right" size="small">
            Remove all<Icon name="remove" />
          </Button>
          <Popup headers={headers} addNew={addNew} />
          <Table celled compact padded striped definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                {headers.map((header, index) => {
                  return (
                    <Table.HeaderCell key={index}>
                      {capitalizeFirstLetter(header)}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell collapsing>
                      <Checkbox onClick={onSelect} id={index} />
                    </Table.Cell>
                    {Object.values(item).map((value, index) => {
                      return <Table.Cell key={index}>{value}</Table.Cell>;
                    })}
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="3">
                  <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Upload any excel file</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      onChange={handleupload}
                    />
                  </Form.Group>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      ) : (
        <div>
          <Message attached="bottom" warning>
            No data to display!!&nbsp;
          </Message>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Icon name="upload" />
            <Form.Label>Upload any excel file</Form.Label>
            <Form.Control type="file" size="sm" onChange={handleupload} />
          </Form.Group>
        </div>
      )}
    </div>
  );
};

export default DataTable;
