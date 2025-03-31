import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';

const MyDataTable = () => {
  useEffect(() => {
    // Initialize DataTable
    $('#example').DataTable();
  }, []);

  return (
    <div className='container bg-light px-2 py-2 rounded'>
    <table id="example" className="display" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Faizal</td>
          <td>Unemployed</td>
          <td>IzausLab</td>
          <td>26</td>
          <td>18-08-1998</td>
          <td>1000 IDR</td>
        </tr>
        <tr>
          <td>Microsoft Freak</td>
          <td>Paranoia</td>
          <td>Clown Universe</td>
          <td>26</td>
          <td>06-06-1966</td>
          <td>1000 IDR</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </tfoot>
    </table>
    </div>
  );
};

export default MyDataTable;
