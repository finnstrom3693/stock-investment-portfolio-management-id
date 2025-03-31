import React from "react";
import Navbar from "../components/Navbar/Navbar";
import StockInput from '../components/StockInput/StockInput';

class BackToTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 100) { // Change 100 to desired scroll position to show the button
      this.setState({ isShown: true });
    } else {
      this.setState({ isShown: false });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div style={{ display: this.state.isShown ? 'block' : 'none', position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
        <button className="btn btn-primary" onClick={this.scrollToTop}><i class="fa-solid fa-arrow-up"></i></button>
      </div>
    );
  }
}

class PGHome extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <br /><br />
                <StockInput/>
                <BackToTopButton />
            </div>
        );
    }
}

export default PGHome;
