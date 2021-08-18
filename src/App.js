import React, {Component} from 'react';
import ExpandableCompanyInfo from "./ExpandableCompanyInfo";
import logo from "./user.jpg";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredList: [],
            isCollapsed: []
        }
        this.setIsCollapsed = this.setIsCollapsed.bind(this);
        this.capitalizeFullName = this.capitalizeFullName.bind(this);
        this.addTag = this.addTag.bind(this);
        this.filter = this.filter.bind(this);
        this.searchName = React.createRef();
        this.searchTag = React.createRef();
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                this.setState({users: data, filteredList: data, isCollapsed: Array(data.length).fill(true)});
            })
            .catch(console.log)
    }

    capitalizeFullName(name) {
        return name.toUpperCase();
    }

    setIsCollapsed(i) {
        let isCollapsedAltered = this.state.isCollapsed;
        isCollapsedAltered[i] = !isCollapsedAltered[i];
        this.setState({isCollapsed: isCollapsedAltered});
    }

    addTag(id, e) {
        if (e.key === 'Enter' && e.target.value !== "") {
            let newusers = this.state.users;
            let i = newusers.findIndex((obj => obj.id === id));
            if(newusers[i].tags) {
                newusers[i].tags.push(e.target.value);
            }else {
                newusers[i].tags = [e.target.value];
            }
            this.setState({users: newusers});
            this.setState({filteredList: newusers});
            this.filter();
            e.preventDefault();
            e.target.value = "";
        }
    }

    filter() {
        let searchName = this.searchName.current.value.toLowerCase();
        let searchTag = this.searchTag.current.value.toLowerCase();
        if(searchName === "" && searchTag === "") {
            this.setState({filteredList: this.state.users});
            return;
        }
        if(searchName === "") {
            let newusers = this.state.users;
            newusers = newusers.filter(user =>
                (user.tags && user.tags.filter(tag => tag.toLowerCase().includes(searchTag)).length > 0));

            this.setState({filteredList: newusers});
            return;
        }
        if(searchTag === "") {
            let newusers = this.state.users;
            newusers = newusers.filter(user => user.name.toLowerCase().includes(searchName));
            this.setState({filteredList: newusers});
            return;
        }
        let newusers = this.state.users;
        newusers = newusers.filter(user => ( user.name.toLowerCase().includes(searchName)
            && (user.tags && user.tags.filter(tag => tag.toLowerCase().includes(searchTag)).length > 0)));

        this.setState({filteredList: newusers});
        return;
    }

    render() {
        return (
            <div className="app-container">
                    <div><input ref={this.searchName} className="form-control"  id="searchName" type="text" placeholder="Search by name" onChange={this.filter} /></div>
                    <div><input ref={this.searchTag} className="form-control"  id="searchTag" type="text" placeholder="Search by tag" onChange={this.filter}  /></div>
                    <ul className="app-ul app-card-4">
                    {this.state.filteredList.map((user, i) => (
                        <li className="app-bar" key={user.id}>
                        <span className="app-bar-item app-button app-white app-xlarge app-right" onClick={(e) => this.setIsCollapsed(i)}> {this.state.isCollapsed[i] ? '+' : '-'}</span>
                        <img src={logo} className="app-bar-item app-circle circular-image" alt=""/>
                            <div className="app-bar-item" key={user.id}>
                                <div className="app-large">{this.capitalizeFullName(user.name)} </div>
                                <div className="text-muted">Email: {user.email}</div>
                                <div className="text-muted">Username: {user.username}</div>
                                <div className="text-muted">Phone: {user.phone}</div>
                                <div className="text-muted">Website: {user.website}</div>
                                <ExpandableCompanyInfo isCollapsed={this.state.isCollapsed[i]} company={user.company}/>
                                <div className="app-padding-small">
                                {user.tags && user.tags.map((tag) => (
                                    <span><span className="tag-button" key={tag}> {tag} </span>{' '}</span>
                                    ))}
                                </div>
                                <div>
                                    <input type="text" placeholder="Add a tag" onKeyDown={(e) => this.addTag(user.id, e)} />
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
            </div>
        );
    }
}

export default App;
