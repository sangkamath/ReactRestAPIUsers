import React, {Component} from 'react';

class ExpandableCompanyInfo extends Component {
    render() {
        return (
            <span>
                <span className={`collapse-content ${this.props.isCollapsed ? 'collapsed' : 'expanded'}`} aria-expanded={this.props.isCollapsed}>
                     <div className="text-muted">Company Name: {this.props.company.name}</div>
                     <div className="text-muted">Company Catchphrase: {this.props.company.catchPhrase}</div>
                     <div className="text-muted">Company Info: {this.props.company.bs}</div>
                </span>
           </span>
        );
    }
}

export default ExpandableCompanyInfo;
