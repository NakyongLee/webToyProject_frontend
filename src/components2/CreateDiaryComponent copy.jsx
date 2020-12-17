import React, { Component } from 'react';
import DiaryService from '../services/DiaryService';

class CreateDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //step2
            id: this.props.match.params.id,
            title: '',
            date: '',
            content: '',
            emotion: '',
            image: undefined,
        }
        
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeEmotionHandler = this.changeEmotionHandler.bind(this);
        this.saveDiary = this.saveDiary.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
    
    }

    //step3
    componentDidMount(){

        //step4
        if(this.state.id === '_add'){
            return
        } else{
            DiaryService.getDiaryById(this.state.id).then((res) => {
                let diary = res.data;
                this.setState({title: diary.title,
                    date: diary.date,
                    content: diary.content,
                    emotion: diary.emotion,
                    image: diary.image,
                });
            });
        }
    }

    saveDiary = (e) => {
        e.preventDefault();
        let diary = {title: this.state.title, date: this.state.date, content: this.state.content, emotion: this.state.emotion};
        console.log('diary => ' + JSON.stringify(diary))
        
        const formData = new FormData();
        if(this.state.image === undefined){
            formData.append('image', undefined);
        }
        else{
            formData.append('image', this.state.image);
        }
        console.log(this.state.image);
        formData.append('title', this.state.title);
        formData.append('date', this.state.date);
        formData.append('content', this.state.content);
        formData.append('emotion', this.state.emotion);

        for (var value of formData.values()) {

            console.log(value);
          
        }
        //step5
        if(this.state.id === '_add'){
            if(this.state.image === undefined){
                DiaryService.createDiary(diary).then(res => {
                    this.props.history.push('/diaries');
                });
            }
            else {
                DiaryService.createDiary(formData).then(res =>{
                    this.props.history.push('/diaries');
                });
            }
            
        } else{  
            DiaryService.updateDiary(formData, this.state.id).then( res => {
                this.props.history.push('/diaries');
            }); 
        }
    
    }

    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    changeContentHandler= (event) => {
        this.setState({content: event.target.value});
    }

    changeEmotionHandler= (event) => {
        this.setState({emotion: event.target.value});
    }

    changeImageHandler = (event) => {
        this.setState({image: event.target.files[0]});
    }

    cancle(){
        this.props.history.push('/diaries');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return <h3 className = "text-center">Add Diary</h3>                        
        }
        else{
            return <h3 className = "text-center">Update Diary</h3>
                            
        }

    }
    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <lable> Title: </lable>
                                        <input placeholder="Title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <lable> Date: </lable>
                                        <input placeholder="Date" name="date" className="form-control"
                                            value={this.state.date} onChange={this.changeDateHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <lable> Content: </lable>
                                        <input placeholder="Content" name="content" className="form-control"
                                            value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <lable> Emotion: </lable>
                                        <input placeholder="Emotion" name="emotion" className="form-control"
                                            value={this.state.emotion} onChange={this.changeEmotionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <lable> Image: </lable>
                                        <input name="image" className="form-control" type = "file"
                                             onChange={this.changeImageHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveDiary}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancle.bind(this)} style={{marginLeft: "10px"}}>Cancle</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateDiaryComponent;