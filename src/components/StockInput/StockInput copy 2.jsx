import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import DataTable from "react-data-table-component";

const StockInput = () => {
  const [stocks, setStocks] = useState([]);
  const [stocks2, setStocks2] = useState([]);
  const [stockIndex, setStockIndex] = useState('');
  const [sector, setSector] = useState('');
  const [amountInvested, setAmountInvested] = useState('');
  const [amountShares, setAmountShares] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Load data from local storage when component mounts
  useEffect(() => {
    const savedStocks = localStorage.getItem('stocks');
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
      setStocks2(JSON.parse(savedStocks));
    }
  }, []);

  const handleAddStock = () => {
    if (editIndex !== null) {
      const updatedStocks = [...stocks];
      updatedStocks[editIndex] = {
        stockIndex,
        sector,
        amountInvested,
        amountShares
      };
      setStocks(updatedStocks);
      setEditIndex(null);
    } else {
      const id = stocks.length > 0 ? stocks[stocks.length - 1].id + 1 : 1;
      const newStock = {
        id,
        stockIndex,
        sector,
        amountInvested,
        amountShares
      };
      setStocks([...stocks, newStock]);
    }
    setStockIndex('');
    setSector('');
    setAmountInvested('');
    setAmountShares('');
  };

  const handleSaveLocalStorage = () => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
    alert("data saved to local storage")
  };

  const handleDeleteLocalStorage = () => {
    if (stocks.length === 0) {
      setShowUploadModal(true);
    } else {
      localStorage.removeItem('stocks');
      setStocks([]);
      alert("data local storage deleted")
    }
  };

  const handleEditStock = (id) => {
    const index = stocks.findIndex(stock => stock.id === id);
    if (index !== -1) {
      const stockToEdit = stocks[index];
      setStockIndex(stockToEdit.stockIndex);
      setSector(stockToEdit.sector);
      setAmountInvested(stockToEdit.amountInvested);
      setAmountShares(stockToEdit.amountShares);
      setEditIndex(index);
    }
  };

  const handleDeleteStock = (index) => {
    const updatedStocks = [...stocks];
    updatedStocks.splice(index, 1);
    setStocks(updatedStocks);
  };

  const handleDownloadJSON = () => {
    const filename = 'stocks.json';
    const json = JSON.stringify(stocks);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadJSON = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      setStocks(jsonData);
      setShowUploadModal(false);
      alert('JSON uploaded successfully!');
    };
    reader.readAsText(file);
  };

  const columns = [
    {
      name: 'Stock Index',
      selector: row => row.stockIndex,
      sortable: true
    },
    {
      name: 'Sector',
      selector: row => row.sector,
      sortable: true
    },
    {
      name: 'Amount Invested',
      selector: row => parseInt(row.amountInvested), 
      sortable: true,
    },
    {
      name: 'Amount Shares',
      selector: row => parseInt(row.amountShares),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <button className="btn btn-primary my-2 mx-2" onClick={() => handleEditStock(row.id)}>Edit</button>
          <button className="btn btn-danger my-2 mx-2" onClick={() => handleDeleteStock(row.id)}>Delete</button>
          <Link to={`/stock/${row.stockIndex}`} className="btn btn-secondary my-2 mx-2">View Details</Link>
        </div>
      )
    }
  ];

  function handleFilter(event){
    const newData = stocks2.filter(row =>{
      return row.stockIndex.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setStocks(newData)
  }

  return (
    <div>
      <div className="container">
        <div className="row mb-3">
            <div className="col">
            <input
                type="text"
                className="form-control"
                placeholder="Stock Index"
                value={stockIndex}
                onChange={(e) => setStockIndex(e.target.value)}
            />
            </div>
            <div className="col">
            <input
                type="text"
                className="form-control"
                placeholder="Sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
            />
            </div>
            <div className="col">
            <input
                type="text"
                className="form-control"
                placeholder="Amount Invested"
                value={amountInvested}
                onChange={(e) => setAmountInvested(e.target.value)}
            />
            </div>
            <div className="col">
            <input
                type="text"
                className="form-control"
                placeholder="Amount Shares"
                value={amountShares}
                onChange={(e) => setAmountShares(e.target.value)}
            />
            </div>
            <div className="col-auto">
            <button className="btn btn-primary" onClick={handleAddStock}>
                {editIndex !== null ? 'Edit' : 'Add'}
            </button>
            </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-3">
            <div className="col-auto">
            <button className="btn btn-success" onClick={handleSaveLocalStorage}>
                Save to Local Storage
            </button>
            </div>
            <div className="col-auto">
            <button className="btn btn-danger" onClick={handleDeleteLocalStorage}>
                Delete Local Storage Data
            </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={handleDownloadJSON}>
                Download JSON
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
                Upload JSON
              </button>
            </div>
            <div className="col-auto">
              <Link to="/piechart" className="btn btn-info text-light">
                Stock Piechart
              </Link>
            </div>
        </div>
      </div>

      <div className="container mt-5 bg-light py-2 px-2 rounded">
        <div className="d-flex justify-content-between align-items-center my-2">
          <div className="ms-3 text-uppercase fw-bold">My Portofolio</div>
          <div className="text-end"><input type="text" onChange={handleFilter} /></div>
        </div>
        <DataTable
          columns={columns}
          data={stocks}
          fixedHeader
          pagination
        ></DataTable>
      </div>

      

      {/* Upload JSON Modal */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showUploadModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload JSON Data</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUploadModal(false)}></button>
            </div>
            <div className="modal-body">
              <input type="file" accept=".json" onChange={handleUploadJSON} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowUploadModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInput;
