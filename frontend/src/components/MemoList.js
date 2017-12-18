import React, { Component } from 'react';

class MemoList extends Component {
    render() {
        const listStr = this.props.list.map((data, index) => {
            return (
                <div key={index}>
                    <strong>제목 : {data.title}</strong>
                    <p>{data.description}</p>
                </div>
            )
        })
        return (
            <div>
                <h4>목록</h4>
                {listStr}
            </div>
        );
    }
}

export default MemoList;