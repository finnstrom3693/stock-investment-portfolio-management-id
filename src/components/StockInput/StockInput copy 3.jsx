import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./StockInput.css"

const StockInput = () => {
  const [stocks, setStocks] = useState([]);
  const [stocks2, setStocks2] = useState([]);
  const [stockIndex, setStockIndex] = useState('');
  const [sector, setSector] = useState('');
  const [amountInvested, setAmountInvested] = useState('');
  const [amountShares, setAmountShares] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [totalStockCount, setTotalStockCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalShares, setTotalShares] = useState(0);



  // Load data from local storage when component mounts
  useEffect(() => {
    const savedStocks = localStorage.getItem('stocks');
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
      setStocks2(JSON.parse(savedStocks));
    }
  }, []);

  useEffect(() => {
    setTotalStockCount(stocks.length);
  }, [stocks]);

  useEffect(() => {
    // Calculate total investment and shares
    const totalInvestment = stocks.reduce((acc, stock) => acc + parseFloat(stock.amountInvested), 0);
    const totalShares = stocks.reduce((acc, stock) => acc + parseFloat(stock.amountShares), 0);
    setTotalInvestment(totalInvestment);
    setTotalShares(totalShares);
  }, [stocks]);

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
      const newStock = {
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

  const handleEditStock = (index) => {
    const stockToEdit = stocks[index];
    setStockIndex(stockToEdit.stockIndex);
    setSector(stockToEdit.sector);
    setAmountInvested(stockToEdit.amountInvested);
    setAmountShares(stockToEdit.amountShares);
    setEditIndex(index);
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredStocks = stocks2.filter((stock) => {
      return (
        stock.stockIndex.toLowerCase().includes(searchTerm) ||
        stock.sector.toLowerCase().includes(searchTerm) ||
        stock.amountInvested.toString().includes(searchTerm) ||
        stock.amountShares.toString().includes(searchTerm)
      );
    });
    setStocks(filteredStocks);
  };

  const handleSortAmountInvested = () => {
    const sortedStocks = [...stocks].sort((a, b) => {
      const multiplier = isAscending ? 1 : -1;
      // Convert "amountInvested" to numbers before comparison
      const numA = parseFloat(a.amountInvested);
      const numB = parseFloat(b.amountInvested);
      if (numA < numB) return multiplier * -1;
      if (numA > numB) return multiplier * 1;
      return 0;
    });
    setStocks(sortedStocks);
    setIsAscending(!isAscending);
  };

  const handleSortAmountShares = () => {
    const sortedStocks = [...stocks].sort((a, b) => {
      const multiplier = isAscending ? 1 : -1;
      // Convert "amountShares" to numbers before comparison
      const numA = parseFloat(a.amountShares);
      const numB = parseFloat(b.amountShares);
      if (numA < numB) return multiplier * -1;
      if (numA > numB) return multiplier * 1;
      return 0;
    });
    setStocks(sortedStocks);
    setIsAscending(!isAscending);
  };
  
  const handleSortStockIndex = () => {
    const sortedStocks = [...stocks].sort((a, b) => {
      const comparison = a.stockIndex.localeCompare(b.stockIndex);
      return isAscending ? comparison : -comparison;
    });
    setStocks(sortedStocks);
    setSortField('stockIndex');
    setIsAscending(!isAscending);
  };

  const handleSortSector = () => {
    const sortedStocks = [...stocks].sort((a, b) => {
      const comparison = a.sector.localeCompare(b.sector);
      return isAscending ? comparison : -comparison;
    });
    setStocks(sortedStocks);
    setSortField('sector');
    setIsAscending(!isAscending);
  };

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

      <div className='container'>
      
        <div className="d-flex justify-content-between align-items-center my-2">
          <div className="ms-3 text-uppercase fw-bold">My Portfolio</div>
          <span className='display-acc'>Total Stock : {totalStockCount}</span>
          <span className='display-acc'>Total Investment: Rp.{totalInvestment.toFixed(0)}</span>
          <span className='display-acc'>Total Shares: {totalShares.toFixed(0)}</span>
          <div className="text-end"><input type="text" onChange={handleSearch} /></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={handleSortStockIndex}>Stock Index {isAscending ? '▲' : '▼'}</th>
              <th onClick={handleSortSector}>Sector {isAscending ? '▲' : '▼'}</th>
              <th onClick={handleSortAmountInvested}>Amount Invested {isAscending ? '▲' : '▼'}</th>
              <th onClick={handleSortAmountShares}>Amount Shares {isAscending ? '▲' : '▼'}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stockIndex}</td>
                <td>{stock.sector}</td>
                <td>{stock.amountInvested}</td>
                <td>{stock.amountShares}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEditStock(index)}>Edit</button>
                  <button className="btn btn-danger me-2" onClick={() => handleDeleteStock(index)}>Delete</button>
                  <Link to={`/stock/${stock.stockIndex}`} className="btn btn-secondary">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
