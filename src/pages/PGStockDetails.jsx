import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams, Link } from 'react-router-dom';
import stockData from "../data/StockDetails.json";
import "../styles/StockDetails.css";
import { useMediaQuery } from 'react-responsive';

const BackToTopButton = () => {
    const [isShown, setIsShown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsShown(true);
        } else {
            setIsShown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div style={{ display: isShown ? 'block' : 'none', position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
            <button className="btn btn-primary" onClick={scrollToTop}><i className="fa-solid fa-arrow-up"></i></button>
        </div>
    );
};

const PGStockDetails = () => {
    const { stockIndex } = useParams();
    const stockDetail = stockData[stockIndex];
    // const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div>
            <Navbar />
            <Link to="/" className="btn btn-primary mx-2 my-2">
                Back to Home
            </Link>
            {stockDetail && (
                <div>
                    <h2 className="fw-bold text-uppercase text-center mt-2">Stock Details for {stockIndex}</h2>
                    <div id="stock-detail" className="container card-con-stock-detail my-3">
                        <center>
                            <img className="my-4 company-logo" src={stockDetail.Company.logo} alt="Company Logo" />
                        </center>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Last Data Scouted:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.lastDataScouted}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Name:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.name}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Sector:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.sector}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Main Company Business:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.business}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Business Diversification:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.businessDiversification}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Product:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.product}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Region Operate:</p>
                            </div>
                            <div class="col-md-8">
                                <p>{stockDetail.Company.regionOperate}</p>
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Financial General:</p>
                            </div>
                            <div class="col-md-8">
                                <a className="btn btn-success" href={stockDetail.Company.financialGeneral}>Google Finance</a>
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Financial Detailed:</p>
                            </div>
                            <div class="col-md-8">
                                <a className="btn btn-primary" href={stockDetail.Company.financialDetailed}>Lembarsaham.com</a>
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Financial Report:</p>
                            </div>
                            <div class="col-md-8">
                                <a className="btn btn-warning" href={stockDetail.Company.financialReport}>Official Website</a>
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col-md-4">
                                <p class="fw-bold">Company Financial Keystats:</p>
                            </div>
                            <div class="col-md-8">
                                <a className="btn btn-primary" href={stockDetail.Company.keystats}>Stockbit Keystats</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="fw-bold">Description:</p>
                            </div>
                            <div class="col-md-8">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div dangerouslySetInnerHTML={{ __html: stockDetail.Company.description }} />
                            </div>
                        </div>
                        <h3>Quarter Information</h3>
                        <hr />
                        {(!stockDetail.quarterInformation.positive &&
                            !stockDetail.quarterInformation.neutral &&
                            !stockDetail.quarterInformation.negative) ? (
                            <center>
                                <a className="btn btn-warning" href="mailto:asankaligar05@gmail.com">Analysis not yet Complete, Be our community volunteer financial analyst</a>
                            </center>
                        ) : (
                            <div>
                                <p className="mt-2">Positive :</p>
                                {stockDetail.quarterInformation.positive ? (
                                    stockDetail.quarterInformation.positive.split(",").map((info, index) => (
                                        <span key={index} className="btn btn-success mx-2 my-2">{info.trim()}</span>
                                    ))
                                ) : null}
                                <p className="mt-2">Neutral :</p>
                                {stockDetail.quarterInformation.neutral ? (
                                    stockDetail.quarterInformation.neutral.split(",").map((info, index) => (
                                        <span key={index} className="btn btn-secondary mx-2 my-2">{info.trim()}</span>
                                    ))
                                ) : null}
                                <p className="mt-2">Negative :</p>
                                {stockDetail.quarterInformation.negative ? (
                                    stockDetail.quarterInformation.negative.split(",").map((info, index) => (
                                        <span key={index} className="btn btn-danger mx-2 my-2">{info.trim()}</span>
                                    ))
                                ) : null}
                            </div>
                        )}
                        <br /><br />
                    </div>
                </div>
            )}
            {!stockDetail && (
                <div>
                    <h2 className="fw-bold text-uppercase text-center mt-2">Stock Details for {stockIndex}</h2>
                    <p className="text-center text-danger fw-bold">No data available for {stockIndex}</p>
                    <center>
                        <a className="btn btn-info text-light" href="mailto:asankaligar05@gmail.com">Request data details</a>
                    </center>
                </div>
            )}
            <BackToTopButton />
        </div>
    );
};

export default PGStockDetails;
