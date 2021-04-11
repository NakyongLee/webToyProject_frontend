import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import DiaryService from '../services/DiaryService'
import './footer.css';

class DayEventComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      emotion: ''
    }
  }

  componentDidMount() {
    DiaryService.getDiaries().then((res) => {
      let diary = res.data
      let eventData = new Array(diary.length)
      for (let i = 0; i < diary.length; i++) {
        eventData[i] = {
          title: this.getEmotion(diary[i].emotion),
          date: diary[i].date,
          backgroundColor: this.getColor(diary[i].emotion),
          borderColor : 'white'
        }
      }
      this.setState({ events: eventData });
    });
    console.log(this.state.events[1]);
  }

  getColor(emotion) {
    if (emotion === '행복') {
      return 'rgb(255, 212, 0)'
    }
    else if (emotion === '보통') {
      return 'rgb(130, 182, 82)'
    }
    else if (emotion === '슬픔') {
      return 'rgb(83, 164, 219)'
    }
    else if (emotion === '화남') {
      return 'rgb(255, 34, 33)'
    }
    else if (emotion === '불안') {
      return 'rgb(176, 131, 214)'
    }
  }

  getEmotion(emotion) {
    if (emotion === '행복') {
      return '🥰'
    }
    else if (emotion === '보통') {
      return '🙂'
    }
    else if (emotion === '슬픔') {
      return '😢'
    }
    else if (emotion === '화남') {
      return '😡'
    }
    else if (emotion === '불안') {
      return '🥺'
    }
  }

  render() {
    let { events } = this.state;
    return (
      
      <div>
        <br></br>
        {events ?
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={this.state.events}
          /> :
          'loading'
        }
      </div>
    )
  }
}

export default DayEventComponent