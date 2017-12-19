import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

class Memo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = () => {
        const { title, description } = this.state
        if (!title.trim() || !description.trim()) {
            return false
        }
        axios.post('http://localhost:3000/api/memo/save', {
                title,
                description
            }).then((res) => {
                this.props.addMemo({ title, description })
                this.setState({
                    title: '',
                    description: ''
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Grid padded>
                <Grid.Row>
                    <h4>입력</h4>
                </Grid.Row>
                <div className="one row column"></div>
                <label>제목 : </label><input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                <div>
                    <label>본문</label>
                    <textarea rows="5" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                </div>
                <button onClick={this.handleClick}>저장</button>
            </Grid>
        );
    }
}

export default Memo;