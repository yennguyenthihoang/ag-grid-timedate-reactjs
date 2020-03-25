import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import CustomDateComponent from './customDateComponent.js';
import { AllCommunityModules } from 'ag-grid-community';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: AllCommunityModules,
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }, {
        headerName: "Create Date", field: "createDate", sortable: true, filter: 'agDateColumnFilter',
        filterParams:{

          // provide comparator function
          comparator: function (filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return 0;
  
              // In the example application, dates are stored as dd/mm/yyyy hh:mm:ss
              // We create a Date object for comparison against the filter date
              var dateParts = dateAsString.split("/");
              var day = Number(dateParts[0]);
              var month = Number(dateParts[1])-1;
              var year = Number(dateParts[2].split(" ")[0]);
              
              var timeParts = dateParts[2].split(" ")[1].split(":");
              var hh = timeParts[0];
              var mm = timeParts[1];
              var ss = timeParts[2];

              //new Date(year, month, day, hours, minutes, seconds, milliseconds)
              var cellDateTime = new Date(year, month, day, hh, mm, ss);
  
              // Now that both parameters are Date objects, we can compare
              if (cellDateTime < filterLocalDateAtMidnight) {
                  return -1;
              } else if (cellDateTime > filterLocalDateAtMidnight) {
                  return 1;
              } else {
                  return 0;
              }
          }
        }
      }],
      rowData: [{
        make: "Toyota", model: "Celica", price: 35000, createDate: "20/08/2020 06:50:06", time:"06:50:06"
      }, {
        make: "Ford", model: "Mondeo", price: 32000, createDate: "20/07/2020 08:50:06", time:"08:50:06"
      }, {
        make: "Porsche", model: "Boxter", price: 72000, createDate: "20/09/2020 09:50:06", time:"09:50:06"
      }],
      frameworkComponents: { agDateInput: CustomDateComponent },
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      }
    }
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%'}}
      >
        <h1>AG-Grid Examples: </h1>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          defaultColDef={this.state.defaultColDef}
          floatingFilter={true}
          rowData={this.state.rowData}
          frameworkComponents={this.state.frameworkComponents}>
        </AgGridReact>
      </div>
    );
  }
}
export default App;