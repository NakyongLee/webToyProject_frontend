import React, {Component} from 'react'
import EmotionService from '../services/EmotionService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

class DayEventComponent extends Component{
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentDidMount(){
    EmotionService.getEmotions().then((res) => {
      this.setState({ events: res.data});
    });
  }

  render() {
    let {events} = this.state;
    return (
      <div>
      {events ?
        <FullCalendar
        plugins={[ dayGridPlugin]}
        initialView="dayGridMonth"
        events={this.state.events}
        />:
        'loading'
      }
      </div>
      )
  }
}

export default DayEventComponent
