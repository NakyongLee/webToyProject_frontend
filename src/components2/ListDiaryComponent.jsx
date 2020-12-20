import React, { Component } from 'react'
import DiaryService from '../services/DiaryService'

class ListDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diaries: []
        }
        this.addDiary = this.addDiary.bind(this);
        this.editDiary = this.editDiary.bind(this);
        this.deleteDiary = this.deleteDiary.bind(this);
    }

    addDiary(){
        this.props.history.push(`/add-diary/_add`);
    }

    editDiary(id){
        this.props.history.push(`/add-diary/${id}`);
    }

    deleteDiary(id){
        DiaryService.deleteDiary(id).then( res => {
            this.setState({diaries: this.state.diaries.filter(diary => diary.id !== id)});
        });
    }

    viewDiary(id){
        this.props.history.push(`/view-diary/${id}`);
    }

    componentDidMount(){
        DiaryService.getDiaries().then((res) => {
            this.setState({diaries: res.data});
        });
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Diary List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDiary}> Add Diary</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Diary Title</th>
                                    <th> Diary Date</th>
                                    <th> Diary Content</th>
                                    <th> Diary Emotion</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.diaries.map(
                                        diary => 
                                        <tr key = {diary.id}>
                                             <td> {diary.title} </td>   
                                             <td> {diary.date}</td>
                                             <td> {diary.content}</td>
                                             <td> {diary.emotion}</td>
                                             <td>
                                                 <button onClick={ () => this.editDiary(diary.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDiary(diary.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDiary(diary.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListDiaryComponent