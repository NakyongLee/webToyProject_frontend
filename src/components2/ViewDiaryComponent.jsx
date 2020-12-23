import React, { Component } from 'react';
import DiaryService from '../services/DiaryService';

class ViewDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            diary: []
        }
    }
    
    componentDidMount() {
        DiaryService.getDiaryById(this.state.id).then( res => {
            this.setState({diary: res.data});
        })
    }

    getImage() {
        if(this.state.diary.img_name === null){
            return                       
        }
        else{
            return <img className="card-img-botton" src={'http://localhost:8080/api/v1/diaries/image/' + this.state.id} alt = "img"/>
                            
        }

    }

    render() {
        return (
            <div>
                {/* <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Diary Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Title: </label>
                            <div> { this.state.diary.title }</div>
                        </div>
                        <div className = "row">
                            <label> Date: </label>
                            <div> { this.state.diary.date }</div>
                        </div>
                        <div className = "row">
                            <label> Content: </label>
                            <div> { this.state.diary.content }</div>
                        </div>
                        <div className = "row">
                            <label> Emotion: </label>
                            <div> { this.state.diary.emotion }</div>
                        </div>
                        <div className = "row">
                            {
                                this.getImage()
                            }
                        </div>
                    </div>
                </div> */}
                <div className="card border-dark mb-3">
                    <div className="card-header">{this.state.diary.emotion}</div>
                    <div className="card-body">
                        <h5 className="card-title">{ this.state.diary.title }</h5>
                        <p className="card-text">{this.state.diary.content}</p>
                        <p className="card-text"><small className="text-muted">{this.state.diary.date}</small></p>
                    </div>
                    {this.getImage()}
                </div>
            </div>
        );
    }
}

export default ViewDiaryComponent;