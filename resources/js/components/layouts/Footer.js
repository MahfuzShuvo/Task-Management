import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-copyright text-center py-3 mt-3">
    	Copyright © 2020 
    	<Link to="https://www.facebook.com/mahfuz.shuvo.7"> Mahfuz Shuvo </Link>
    	All Rights Reserved.
    </div>
  )
}

export default Footer;