import React from "react";
import AnimalsContainer from "./AnimalsContainer";
import HelloWorld from "./start";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            cuteness: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios.get("/get-animal").then(resp => {
            this.setState({
                name: resp.data.name,
                cuteness: resp.data.cuteness
            });
            console.log("this.state: ", this.state);
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleClick(e) {
        e.preventDefault();
        console.log("this.state", this.state);
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.name}s are {this.state.cuteness}
                </h1>
                <AnimalsContainer
                    name={this.state.name}
                    cuteness={this.state.cuteness}
                />
                <HelloWorld />
                <form>
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="cuteness"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleclick}>submit</button>
                </form>
            </div>
        );
    }
}
