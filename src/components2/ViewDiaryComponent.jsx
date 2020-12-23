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

    getEmotion() {
        if(this.state.diary.emotion === '행복'){
            return <div className="card-header">🥰</div>
        }
        else if(this.state.diary.emotion === '보통'){
            return <div className="card-header">🙂</div>
        }
        else if(this.state.diary.emotion === '슬픔'){
            return <div className="card-header">😢</div>
        }
        else if(this.state.diary.emotion === '화남'){
            return <div className="card-header">😡</div>
        }
        else if(this.state.diary.emotion === '걱정'){
            return <div className="card-header">🥺</div>
        }
    }

    render() {
        return (
            <div>
                <div className="card border-dark mb-3">
                    {this.getEmotion()}
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